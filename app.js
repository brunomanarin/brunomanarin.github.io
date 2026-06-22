// Reads from data.json — no login required. Visitors see Bruno's stats.

let genreChart  = null;
let audioChart  = null;
let currentData = null;

const rangeBtns = document.querySelectorAll('.range-btn');

function msToMinSec(ms) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = (total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

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

function renderGenreChart(artists) {
  const counts = {};
  artists?.forEach(a => {
    a.genres?.forEach(g => { counts[g] = (counts[g] ?? 0) + 1; });
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const colors = ['#9d4edd','#00d4ff','#1db954','#ff6b9d','#ffd700',
                  '#7b2fff','#00b4cc','#15a348','#d94080','#ccaa00'];

  if (genreChart) genreChart.destroy();
  const ctx = document.getElementById('genre-chart').getContext('2d');

  if (!sorted.length) {
    ctx.canvas.parentElement.innerHTML = '<p class="empty" style="text-align:center;padding:40px">Genre data unavailable</p>';
    return;
  }

  genreChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(([g]) => g),
      datasets: [{
        data:            sorted.map(([, c]) => c),
        backgroundColor: colors.map(c => c + 'bb'),
        borderColor:     colors,
        borderWidth:     1.5,
        borderRadius:    6,
      }],
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8892b0', maxTicksLimit: 5 }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#e8eaf6', font: { size: 11 } }, grid: { display: false } },
      },
    },
  });
}

function renderDecadeChart(tracks) {
  const buckets = {};
  tracks?.forEach(t => {
    const year = parseInt(t.album?.release_date?.slice(0, 4));
    if (!year) return;
    const decade = `${Math.floor(year / 10) * 10}s`;
    buckets[decade] = (buckets[decade] ?? 0) + 1;
  });

  const sorted = Object.entries(buckets).sort((a, b) => a[0].localeCompare(b[0]));
  const colors = ['#9d4edd','#00d4ff','#1db954','#ff6b9d','#ffd700','#7b2fff','#00b4cc'];

  if (audioChart) audioChart.destroy();
  const ctx = document.getElementById('audio-chart').getContext('2d');

  audioChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sorted.map(([d]) => d),
      datasets: [{
        data:            sorted.map(([, c]) => c),
        backgroundColor: colors.slice(0, sorted.length),
        borderColor:     'rgba(0,0,0,0)',
        hoverOffset:     8,
      }],
    },
    options: {
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8892b0', font: { size: 11 }, padding: 12 } },
        tooltip: { callbacks: { label: c => ` ${c.label}: ${c.parsed} tracks` } },
      },
    },
  });
}

function renderRange(range) {
  const d = currentData.topData?.[range];
  renderArtists(d?.artists);
  renderTracks(d?.tracks, 'tracks-list');
  renderGenreChart(d?.artists);
  renderDecadeChart(d?.tracks);
}

async function init() {
  try {
    const res  = await fetch('data.json');
    if (!res.ok) throw new Error('data.json not found');
    currentData = await res.json();

    // Profile
    const p = currentData.profile;
    document.getElementById('hero-name').textContent      = p.name;
    document.getElementById('hero-avatar').src            = p.image;
    document.getElementById('stat-followers').textContent = p.followers?.toLocaleString() ?? '—';
    document.getElementById('nav-spotify-link').href      = p.url;

    // Last updated
    if (currentData.generatedAt) {
      const d = new Date(currentData.generatedAt);
      document.getElementById('stat-updated').textContent =
        d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    // Recently played (not range-dependent)
    renderTracks(currentData.recentTracks, 'recent-list', false);

    // Range buttons
    rangeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        rangeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderRange(btn.dataset.range);
      });
    });

    renderRange('short_term');

  } catch (err) {
    console.error(err);
    document.getElementById('hero-name').textContent = 'Bruno Manarin';
    document.querySelectorAll('.artists-grid, .tracks-list').forEach(el => {
      el.innerHTML = '<p class="empty">Run the GitHub Action to generate data.json first.</p>';
    });
  } finally {
    document.getElementById('loading').classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', init);
