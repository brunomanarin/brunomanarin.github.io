/**
 * Fetches recently played Steam games and merges into data.json.
 * Run manually via GitHub Actions only — set Steam game details to Public first.
 *
 * Required env vars:
 *   STEAM_API_KEY
 *   STEAM_ID
 */

const fs = require('fs');

const STEAM_KEY = process.env.STEAM_API_KEY;
const STEAM_ID  = process.env.STEAM_ID;

if (!STEAM_KEY || !STEAM_ID) {
  console.error('Missing STEAM_API_KEY or STEAM_ID env vars');
  process.exit(1);
}

async function main() {
  const res  = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_KEY}&steamid=${STEAM_ID}&count=10&format=json`
  );
  const data = await res.json();
  const games = data?.response?.games;

  if (!games?.length) {
    console.warn('No games returned — profile may be private or no recent activity.');
    process.exit(0);
  }

  const recentGames = games.map(g => ({
    appid:            g.appid,
    name:             g.name,
    playtime_2weeks:  Math.round(g.playtime_2weeks  / 60 * 10) / 10,
    playtime_forever: Math.round(g.playtime_forever / 60),
    icon_url:         g.img_icon_url
      ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`
      : null,
  }));

  // Merge into existing data.json
  let existing = {};
  if (fs.existsSync('data.json')) {
    try { existing = JSON.parse(fs.readFileSync('data.json', 'utf8')); } catch {}
  }

  existing.recentGames = recentGames;
  fs.writeFileSync('data.json', JSON.stringify(existing, null, 2));
  console.log(`Steam: saved ${recentGames.length} games to data.json.`);
}

main().catch(err => { console.error(err); process.exit(1); });
