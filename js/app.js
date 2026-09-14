/**
 * Yan Wu - Personal Website Main Script
 * Minimalist, zero-dependency tab switching, tag filtering, dedicated blog reader, and theme management.
 */

let previousTabBeforePost = 'about';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  renderPreviews();
  renderFullContent();
  setupMiscTagFilters();
  initJourneyMap();
});

/* ==========================================================================
   Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  const label = document.getElementById('themeLabel');
  if (label) {
    label.textContent = `Theme: ${theme}`;
  }
}

/* ==========================================================================
   Tab Navigation & Post Routing
   ========================================================================== */
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Handle URL hash on initial load
  handleHash(window.location.hash);

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    handleHash(window.location.hash);
  });
}

function handleHash(hash) {
  const cleanHash = (hash || '').replace('#', '');
  if (cleanHash.startsWith('post/')) {
    const postId = cleanHash.replace('post/', '');
    openBlogPost(postId, 'writing', false);
  } else if (['about', 'experience', 'writing', 'misc'].includes(cleanHash)) {
    switchTab(cleanHash, false);
  } else {
    switchTab('about', false);
  }
}

function switchTab(tabId, updateHistory = true) {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.tab-panel');

  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  panels.forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  if (tabId !== 'post') {
    previousTabBeforePost = tabId;
  }

  if (updateHistory) {
    history.pushState(null, '', `#${tabId}`);
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ==========================================================================
   Dedicated Blog Post Reader View
   ========================================================================== */
function openBlogPost(postId, fromTab = 'writing', updateHistory = true) {
  const blog = SITE_DATA.blogs.find(b => b.id === postId);
  if (!blog) {
    switchTab('writing');
    return;
  }

  previousTabBeforePost = fromTab || 'writing';

  const container = document.getElementById('singlePostContainer');
  const backBtn = document.getElementById('postBackBtn');

  if (backBtn) {
    const fromLabel = previousTabBeforePost === 'about' ? 'About' : 'Writing';
    backBtn.innerHTML = `&larr; Back to ${fromLabel}`;
  }

  if (container) {
    container.innerHTML = `
      <h1 class="single-post-title">${blog.title}</h1>
      <div class="single-post-meta">${blog.date} &middot; ${blog.readTime} read &middot; ${blog.topic}</div>
      
      <div class="single-post-summary-box">
        <div class="single-post-summary-title">Summary</div>
        <p class="single-post-summary-text">${blog.summary}</p>
      </div>

      <div class="single-post-body">
        ${formatSimpleMarkdown(blog.content)}
      </div>
    `;
  }

  // Switch to dedicated post tab
  switchTab('post', false);

  if (updateHistory) {
    history.pushState(null, '', `#post/${postId}`);
  }
}

function goBackFromPost() {
  switchTab(previousTabBeforePost || 'writing');
}

/* ==========================================================================
   Interactive World Map & Journey Controller
   ========================================================================== */
let journeyTimer = null;
let currentJourneyStep = 0;
let isJourneyPlaying = false;

function initJourneyMap() {
  const arcsLayer = document.getElementById('journeyArcsLayer');
  const citiesLayer = document.getElementById('cityMarkersLayer');
  const stepperContainer = document.getElementById('journeyStepper');
  const playBtn = document.getElementById('journeyPlayBtn');
  const resetBtn = document.getElementById('journeyResetBtn');

  if (!arcsLayer || !citiesLayer || !SITE_DATA.journey) return;

  const { cities, steps } = SITE_DATA.journey;

  // 1. Render Arcs into SVG
  arcsLayer.innerHTML = steps.map((s, idx) => {
    if (!s.arc) return '';
    return `<path id="journeyArc-${idx}" class="journey-arc-path" d="${s.arc}" style="display: none;" />`;
  }).join('');

  // 2. Render City Markers into SVG
  const labelOffsets = {
    jiamusi: { dx: 8, dy: -2, anchor: 'start' },
    tianjin: { dx: -8, dy: 3, anchor: 'end' },
    sparta: { dx: -8, dy: 13, anchor: 'end' },
    boston: { dx: 8, dy: -3, anchor: 'start' },
    southbay: { dx: -8, dy: 3, anchor: 'end' }
  };

  citiesLayer.innerHTML = Object.entries(cities).map(([key, c]) => {
    const offset = labelOffsets[key] || { dx: 8, dy: 3, anchor: 'start' };
    return `
      <g class="city-marker-group" data-city="${key}" onclick="jumpToCity('${key}')">
        <circle id="pulse-${key}" class="city-pulse-ring" cx="${c.x}" cy="${c.y}" r="6" />
        <circle id="dot-${key}" class="city-point" cx="${c.x}" cy="${c.y}" r="3.5" />
        <text id="label-${key}" class="city-name-text" x="${c.x + offset.dx}" y="${c.y + offset.dy}" text-anchor="${offset.anchor}">${c.label}</text>
      </g>
    `;
  }).join('');

  // 3. Render Stepper Buttons
  if (stepperContainer) {
    stepperContainer.innerHTML = steps.map((s, idx) => `
      <button class="step-btn ${idx === 0 ? 'active' : ''}" data-step="${idx}" onclick="setJourneyStep(${idx})">
        ${idx}. ${cities[s.cityKey].label} (${s.age})
      </button>
    `).join('');
  }

  // 4. Play / Reset Controls
  if (playBtn) {
    playBtn.addEventListener('click', toggleJourneyPlay);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      stopJourneyPlay();
      setJourneyStep(0);
    });
  }

  setJourneyStep(0);
}

function setJourneyStep(stepIndex) {
  const { steps, cities } = SITE_DATA.journey;
  if (stepIndex < 0 || stepIndex >= steps.length) return;
  currentJourneyStep = stepIndex;

  const current = steps[stepIndex];

  // Update Stepper buttons
  const stepBtns = document.querySelectorAll('.step-btn');
  stepBtns.forEach((btn, idx) => {
    if (idx === stepIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Story Box
  const storyBox = document.getElementById('journeyStory');
  if (storyBox) {
    storyBox.innerHTML = `
      <div class="story-meta-row">
        <span class="story-age-badge">${current.age} &middot; ${current.tag}</span>
        <span class="story-route-pill">${current.routeLabel}</span>
      </div>
      <div class="story-title">${current.title}</div>
      <p class="story-desc">${current.desc}</p>
    `;
  }

  // Update SVG Arcs
  steps.forEach((s, idx) => {
    if (!s.arc) return;
    const arcEl = document.getElementById(`journeyArc-${idx}`);
    if (!arcEl) return;

    if (idx < stepIndex) {
      arcEl.style.display = 'block';
      arcEl.className.baseVal = 'journey-arc-path completed';
    } else if (idx === stepIndex) {
      arcEl.style.display = 'block';
      arcEl.className.baseVal = 'journey-arc-path active';
    } else {
      arcEl.style.display = 'none';
      arcEl.className.baseVal = 'journey-arc-path';
    }
  });

  // Update City Markers
  const visitedCities = new Set(steps.slice(0, stepIndex + 1).map(s => s.cityKey));
  const activeCity = current.cityKey;

  Object.keys(cities).forEach(key => {
    const dot = document.getElementById(`dot-${key}`);
    const pulse = document.getElementById(`pulse-${key}`);
    const label = document.getElementById(`label-${key}`);

    if (dot) {
      dot.className.baseVal = 'city-point';
      if (visitedCities.has(key)) dot.classList.add('visited');
      if (key === activeCity) dot.classList.add('active');
    }

    if (pulse) {
      pulse.className.baseVal = key === activeCity ? 'city-pulse-ring active' : 'city-pulse-ring';
    }

    if (label) {
      label.className.baseVal = key === activeCity ? 'city-name-text active' : 'city-name-text';
    }
  });
}

function toggleJourneyPlay() {
  if (isJourneyPlaying) {
    stopJourneyPlay();
  } else {
    startJourneyPlay();
  }
}

function startJourneyPlay() {
  const playBtn = document.getElementById('journeyPlayBtn');
  isJourneyPlaying = true;
  if (playBtn) playBtn.innerHTML = 'Pause &parallel;';

  if (currentJourneyStep >= SITE_DATA.journey.steps.length - 1) {
    setJourneyStep(0);
  }

  journeyTimer = setInterval(() => {
    if (currentJourneyStep < SITE_DATA.journey.steps.length - 1) {
      setJourneyStep(currentJourneyStep + 1);
    } else {
      stopJourneyPlay();
    }
  }, 2200);
}

function stopJourneyPlay() {
  const playBtn = document.getElementById('journeyPlayBtn');
  isJourneyPlaying = false;
  if (playBtn) playBtn.innerHTML = 'Play &blacktriangleright;';
  if (journeyTimer) {
    clearInterval(journeyTimer);
    journeyTimer = null;
  }
}

function jumpToCity(cityKey) {
  const stepIdx = SITE_DATA.journey.steps.findIndex(s => s.cityKey === cityKey);
  if (stepIdx !== -1) {
    stopJourneyPlay();
    setJourneyStep(stepIdx);
  }
}

/* ==========================================================================
   Render Main Page Previews
   ========================================================================== */
function renderPreviews() {
  // 1. Experience Preview (Most Recent Only!)
  const expContainer = document.getElementById('previewExperience');
  if (expContainer) {
    const previewItems = SITE_DATA.experience.slice(0, 1);
    expContainer.innerHTML = previewItems.map(item => `
      <div class="experience-entry">
        <div class="entry-header">
          <span class="entry-title">${item.role} &middot; <span style="font-weight: normal; color: var(--text-muted);">${item.company}</span></span>
          <span class="entry-period">${item.period}</span>
        </div>
      </div>
    `).join('');
  }

  // 2. Writing Preview (Shows read time & opens dedicated post page)
  const writingContainer = document.getElementById('previewWriting');
  if (writingContainer) {
    writingContainer.innerHTML = SITE_DATA.blogs.map(blog => `
      <div class="writing-entry" onclick="openBlogPost('${blog.id}', 'about')">
        <div class="writing-entry-header">
          <span class="writing-title">${blog.title}</span>
          <span class="writing-meta">${blog.date} &middot; ${blog.readTime} read &middot; ${blog.topic}</span>
        </div>
        <p class="writing-summary">${blog.summary}</p>
      </div>
    `).join('');
  }

  // 3. Misc Preview (Top 3 with tags)
  const miscContainer = document.getElementById('previewMisc');
  if (miscContainer) {
    const previewMisc = SITE_DATA.misc.slice(0, 3);
    miscContainer.innerHTML = previewMisc.map(item => {
      const tagHtml = (item.tags || []).map(t => `<span class="misc-tag">#${t}</span>`).join('');
      return `
        <div class="misc-entry" onclick="switchTab('misc')" style="cursor: pointer;">
          <div class="misc-header">
            <span class="misc-title">${item.title}</span>
            <span class="misc-location">${item.date}</span>
          </div>
          <div class="misc-highlight">${item.highlight}</div>
          <div class="misc-tag-list">${tagHtml}</div>
        </div>
      `;
    }).join('');
  }
}

/* ==========================================================================
   Render Full Tabs Content
   ========================================================================== */
function renderFullContent() {
  // Full Experience
  const fullExp = document.getElementById('fullExperience');
  if (fullExp) {
    fullExp.innerHTML = SITE_DATA.experience.map(item => `
      <div class="experience-entry">
        <div class="entry-header">
          <span class="entry-title">${item.role}</span>
          <span class="entry-period">${item.period}</span>
        </div>
        <div class="entry-company">${item.company} &middot; ${item.team} (${item.location})</div>
        <p class="entry-desc">${item.description}</p>
      </div>
    `).join('');
  }

  // Full Writing (Shows read time & opens dedicated post page)
  const fullWriting = document.getElementById('fullWriting');
  if (fullWriting) {
    fullWriting.innerHTML = SITE_DATA.blogs.map(blog => `
      <div class="writing-entry" onclick="openBlogPost('${blog.id}', 'writing')">
        <div class="writing-entry-header">
          <span class="writing-title">${blog.title}</span>
          <span class="writing-meta">${blog.date} &middot; ${blog.readTime} read &middot; ${blog.topic}</span>
        </div>
        <p class="writing-summary">${blog.summary}</p>
      </div>
    `).join('');
  }

  // Full Misc
  renderMiscEntries('all');
}

/* ==========================================================================
   Render Tagged Misc Entries
   ========================================================================== */
function renderMiscEntries(filterTag = 'all') {
  const fullMisc = document.getElementById('fullMisc');
  if (!fullMisc) return;

  const filtered = filterTag === 'all'
    ? SITE_DATA.misc
    : SITE_DATA.misc.filter(item => (item.tags || []).includes(filterTag));

  if (filtered.length === 0) {
    fullMisc.innerHTML = `<p style="color: var(--text-dim); font-size: 0.88rem;">No entries found for tag #${filterTag}.</p>`;
    return;
  }

  fullMisc.innerHTML = filtered.map(item => {
    const tagHtml = (item.tags || []).map(t => `<span class="misc-tag">#${t}</span>`).join('');
    return `
      <div class="misc-entry">
        <div class="misc-header">
          <span class="misc-title">${item.title}</span>
          <span class="misc-location">${item.date}</span>
        </div>
        <div class="misc-highlight">${item.highlight}</div>
        <p class="misc-note">${item.note}</p>
        <div class="misc-tag-list">${tagHtml}</div>
      </div>
    `;
  }).join('');
}

function setupMiscTagFilters() {
  const filterBtns = document.querySelectorAll('#miscTagFilters .tag-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.getAttribute('data-tag');
      renderMiscEntries(tag);
    });
  });
}

function formatSimpleMarkdown(text) {
  if (!text) return '';
  let lines = text.trim().split('\n');
  let result = [];
  let inList = false;

  for (let line of lines) {
    let trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3>${formatInlineStyles(trimmed.substring(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2>${formatInlineStyles(trimmed.substring(3))}</h2>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { result.push('<ul>'); inList = true; }
      result.push(`<li>${formatInlineStyles(trimmed.substring(2))}</li>`);
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList) { result.push('<ol>'); inList = true; }
      result.push(`<li>${formatInlineStyles(trimmed.replace(/^\d+\.\s+/, ''))}</li>`);
    } else if (trimmed === '') {
      if (inList) { result.push('</ul>'); inList = false; }
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<p>${formatInlineStyles(trimmed)}</p>`);
    }
  }

  if (inList) result.push('</ul>');
  return result.join('\n');
}

function formatInlineStyles(str) {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: var(--bg-hover); padding: 0.1rem 0.35rem; font-family: var(--font-mono); font-size: 0.88em; border-radius: 3px;">$1</code>');
}
