/**
 * Fetches Spotify data.
 * Run by GitHub Actions on a schedule.
 *
 * Required env vars:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_REFRESH_TOKEN
 */

const fs = require('fs');

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

if (!CLIENT_ID || !REFRESH_TOKEN) {
  console.error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_REFRESH_TOKEN env vars');
  process.exit(1);
}

async function getAccessToken() {
  const body = new URLSearchParams({
    grant_type:    'refresh_token',
    refresh_token: REFRESH_TOKEN,
    client_id:     CLIENT_ID,
  });
  const res  = await fetch('https://accounts.spotify.com/api/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Failed to refresh token: ' + JSON.stringify(data));
  console.log('Got access token.');
  return data.access_token;
}

async function spotifyFetch(token, endpoint) {
  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) { console.warn(`Warning: ${endpoint} returned ${res.status}`); return null; }
  return res.json();
}

async function fetchFullArtists(token, ids) {
  if (!ids.length) return [];
  const data = await spotifyFetch(token, `/artists?ids=${ids.slice(0, 50).join(',')}`);
  return data?.artists?.filter(Boolean) ?? [];
}

async function main() {
  const token = await getAccessToken();

  const ranges = ['short_term', 'medium_term', 'long_term'];

  const [profile, recent, ...rangeData] = await Promise.all([
    spotifyFetch(token, '/me'),
    spotifyFetch(token, '/me/player/recently-played?limit=50'),
    ...ranges.flatMap(r => [
      spotifyFetch(token, `/me/top/artists?limit=20&time_range=${r}`),
      spotifyFetch(token, `/me/top/tracks?limit=20&time_range=${r}`),
    ]),
  ]);

  // Build top data per range
  const topData = {};
  for (let i = 0; i < ranges.length; i++) {
    const artists = rangeData[i * 2];
    const tracks  = rangeData[i * 2 + 1];
    let fullArtists = [];
    if (artists?.items?.length) {
      fullArtists = await fetchFullArtists(token, artists.items.map(a => a.id));
    }
    topData[ranges[i]] = {
      artists: (fullArtists.length ? fullArtists : artists?.items) ?? [],
      tracks:  tracks?.items ?? [],
    };
  }

  // ── Write main data file ─────────────────────────────────────────────────
  const output = {
    generatedAt: new Date().toISOString(),
    profile: {
      name:      profile?.display_name ?? '',
      image:     profile?.images?.[0]?.url ?? '',
      followers: profile?.followers?.total ?? 0,
      product:   profile?.product ?? '',
      url:       profile?.external_urls?.spotify ?? '',
    },
    topData,
    recentTracks: recent?.items?.map(i => i.track) ?? [],
  };

  fs.writeFileSync('data.json', JSON.stringify(output, null, 2));
  console.log('data.json written successfully.');
}

main().catch(err => { console.error(err); process.exit(1); });
