// Reads from data.json — no login required. Visitors see Bruno's stats.

let currentData = null;

const rangeBtns = document.querySelectorAll('.range-btn');

// ── Helpers ──────────────────────────────────────────────────────────────────
function msToMinSec(ms) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = (total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ── Render: Artist grid ───────────────────────────────────────────────────────
function renderArtists(artists) {
  const grid = document.getElementById('artists-grid');
  if (!artists?.length) { grid.innerHTML = '<p class="empty">No data yet.</p>'; return; }
  grid.innerHTML = artists.map((a, i) => `
    <div class="artist-card">
      <span class="artist-rank">#${i + 1}</span>
      <img class="artist-img" src="${a.images?.[0]?.url ?? ''}" alt="${a.name}" loading="lazy" />
      <div class="artist-name">${a.name}</div>
      <div class="artist-genre">${a.genres?.[0] ?? ''}</div>
    </div>
  `).join('');
}

// ── Render: Track list ────────────────────────────────────────────────────────
function renderTracks(tracks, containerId, showRank = true) {
  const list = document.getElementById(containerId);
  if (!tracks?.length) { list.innerHTML = '<p class="empty">No data yet.</p>'; return; }
  list.innerHTML = tracks.map((t, i) => `
    <div class="track-item">
      <span class="track-rank">${showRank ? `#${i + 1}` : ''}</span>
      <img class="track-img" src="${t.album?.images?.[1]?.url ?? t.album?.images?.[0]?.url ?? ''}" alt="${t.name}" loading="lazy" />
      <div class="track-info">
        <div class="track-name">${t.name}</div>
        <div class="track-artist">${t.artists?.map(a => a.name).join(', ') ?? ''}</div>
      </div>
      <span class="track-duration">${msToMinSec(t.duration_ms)}</span>
    </div>
  `).join('');
}



// ── Render: Recently played games ────────────────────────────────────────────
function renderGames(games) {
  const list    = document.getElementById('games-list');
  const section = document.getElementById('games-section');
  if (!games?.length) { section?.classList.add('hidden'); return; }

  list.innerHTML = games.map(g => `
    <div class="game-item">
      ${g.icon_url
        ? `<img class="game-icon" src="${g.icon_url}" alt="${g.name}" loading="lazy" />`
        : `<div class="game-icon game-icon-placeholder"></div>`}
      <div class="game-info">
        <div class="game-name">${g.name}</div>
      </div>
    </div>
  `).join('');
}

// ── Range render ─────────────────────────────────────────────────────────────
function renderRange(range) {
  const d = currentData.topData?.[range];
  renderArtists(d?.artists);
  renderTracks(d?.tracks?.slice(0, 5), 'tracks-list');

}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('data.json not found');
    currentData = await res.json();

    const p = currentData.profile;

    renderGames(currentData.recentGames);

    rangeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        rangeBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        renderRange(btn.dataset.range);
      });
    });

    renderRange('short_term');

  } catch (err) {
    console.error(err);
    document.getElementById('hero-name').textContent = 'Bruno Manarin';
    document.querySelectorAll('.artists-grid, .tracks-list').forEach(el => {
      el.innerHTML = '<p class="empty">Run the data fetch script to generate data.json first.</p>';
    });
  } finally {
    document.getElementById('loading').classList.add('hidden');
  }
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
let lightboxTrigger = null;

function openLight(el) {
  lightboxTrigger = el;
  const src = el.querySelector('img').src;
  const alt = el.querySelector('img').alt;
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  img.src = src;
  img.alt = alt;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Move focus to close button
  lightbox.querySelector('.lightbox-close').focus();
}

function closeLight() {
  document.getElementById('lightbox').classList.add('hidden');
  document.body.style.overflow = '';
  // Return focus to the photo that opened the lightbox
  if (lightboxTrigger) { lightboxTrigger.focus(); lightboxTrigger = null; }
}

// Trap focus inside lightbox while open
document.addEventListener('keydown', e => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === 'Escape') { closeLight(); return; }
  if (e.key === 'Tab') {
    // Only the close button is focusable inside — keep focus on it
    e.preventDefault();
    lightbox.querySelector('.lightbox-close').focus();
  }
});

document.addEventListener('DOMContentLoaded', init);
