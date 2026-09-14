/**
 * Yan Wu - Personal Website Main Script
 * Minimalist, zero-dependency tab switching, tag filtering, dedicated blog & misc readers, interactive journey map, and bilingual EN/ZH support.
 * Light mode only.
 */

// Global state variables
var currentJourneyStep = 0;
var journeyTimer = null;
var isJourneyPlaying = false;
var previousTabBeforePost = 'about';
var previousTabBeforeMisc = 'misc';
var currentActivePostId = null;
var currentActiveMiscId = null;
var activeWritingTag = 'all';
var activeMiscTag = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTabs();
  renderBio();
  renderPreviews();
  renderFullContent();
  setupWritingTagFilters();
  setupMiscTagFilters();
  initJourneyMap();
});

/* ==========================================================================
   Bilingual Language Switcher
   ========================================================================== */
function initLanguage() {
  const lang = getLang();
  applyLanguage(lang, false);
}

function switchLanguage(lang) {
  if (!['en', 'zh'].includes(lang)) return;
  applyLanguage(lang, true);
}

function applyLanguage(lang, saveToStorage = true) {
  window.CURRENT_LANG = lang;
  if (saveToStorage) {
    try {
      localStorage.setItem('site_lang', lang);
    } catch (e) {}
  }

  // 1. Update language switcher buttons
  const enBtn = document.getElementById('langEnBtn');
  const zhBtn = document.getElementById('langZhBtn');
  if (enBtn && zhBtn) {
    enBtn.classList.toggle('active', lang === 'en');
    zhBtn.classList.toggle('active', lang === 'zh');
  }

  // 2. Update HTML lang attribute
  document.documentElement.lang = lang;

  // 3. Update all static text with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.innerHTML = t(key);
    }
  });

  // 4. Update Play/Pause button text if map is initialized
  const playBtn = document.getElementById('journeyPlayBtn');
  if (playBtn) {
    playBtn.innerHTML = isJourneyPlaying ? t('journey_pause') : t('journey_play');
  }

  // 5. Update AI translation notice visibility
  const noticeEl = document.getElementById('aiTranslationNotice');
  if (noticeEl) {
    noticeEl.style.display = lang === 'zh' ? 'block' : 'none';
  }

  // 6. Re-render dynamic sections
  renderBio();
  updateJourneyLanguage();
  renderPreviews();
  renderFullContent();
  setupWritingTagFilters();
  setupMiscTagFilters();

  // 6. Refresh active post view if open
  if (currentActivePostId) {
    openBlogPost(currentActivePostId, previousTabBeforePost, false);
  }
  if (currentActiveMiscId) {
    openMiscPost(currentActiveMiscId, previousTabBeforeMisc, false);
  }
}

/* ==========================================================================
   Bio Rendering
   ========================================================================== */
function renderBio() {
  const bioContainer = document.getElementById('bioSection');
  const lang = getLang();
  if (bioContainer && SITE_DATA.profile && SITE_DATA.profile[lang]) {
    bioContainer.innerHTML = SITE_DATA.profile[lang].bio.map(p => `<p>${p}</p>`).join('');
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
  } else if (cleanHash.startsWith('misc/')) {
    const miscId = cleanHash.replace('misc/', '');
    openMiscPost(miscId, 'misc', false);
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
    currentActivePostId = null;
  }
  if (tabId !== 'misc-detail') {
    previousTabBeforeMisc = tabId;
    currentActiveMiscId = null;
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

  currentActivePostId = postId;
  previousTabBeforePost = fromTab || 'writing';

  const container = document.getElementById('singlePostContainer');
  const backBtn = document.getElementById('postBackBtn');
  const lang = getLang();

  const postData = blog[lang] || blog.en;
  const readTimeStr = (blog.readTime && blog.readTime[lang]) || (blog.readTime && blog.readTime.en) || '';
  const tagsHtml = (blog.tags || []).map(tKey => {
    const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
    return `<span class="misc-tag">#${t(i18nKey) || tKey}</span>`;
  }).join(' ');

  if (backBtn) {
    const backKey = previousTabBeforePost === 'about' ? 'back_to_about' : 'back_to_writing';
    backBtn.innerHTML = t(backKey);
  }

  if (container) {
    container.innerHTML = `
      <h1 class="single-post-title">${postData.title}</h1>
      <div class="single-post-meta">
        <span>${blog.date}</span>
        ${readTimeStr ? ` &middot; <span>${readTimeStr}</span>` : ''}
        ${blog.topic ? ` &middot; <span>${blog.topic}</span>` : ''}
        ${tagsHtml ? ` &middot; ${tagsHtml}` : ''}
        ${lang === 'zh' ? ` &middot; <span class="ai-trans-badge">${t('ai_trans_badge')}</span>` : ''}
      </div>
      
      <div class="single-post-summary-box">
        <div class="single-post-summary-title">${t('summary_heading')}</div>
        <p class="single-post-summary-text">${postData.summary}</p>
      </div>

      <div class="single-post-body">
        ${formatSimpleMarkdown(postData.content)}
      </div>
    `;
  }

  switchTab('post', false);

  if (updateHistory) {
    history.pushState(null, '', `#post/${postId}`);
  }
}

function goBackFromPost() {
  switchTab(previousTabBeforePost || 'writing');
}

/* ==========================================================================
   Dedicated Misc Post Reader View
   ========================================================================== */
function openMiscPost(miscId, fromTab = 'misc', updateHistory = true) {
  const item = SITE_DATA.misc.find(m => m.id === miscId);
  if (!item) {
    switchTab('misc');
    return;
  }

  currentActiveMiscId = miscId;
  previousTabBeforeMisc = fromTab || 'misc';

  const container = document.getElementById('singleMiscContainer');
  const backBtn = document.getElementById('miscBackBtn');
  const lang = getLang();

  const miscData = item[lang] || item.en;
  const readTimeStr = (item.readTime && item.readTime[lang]) || (item.readTime && item.readTime.en) || '';
  const tagsHtml = (item.tags || []).map(tKey => {
    const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
    return `<span class="misc-tag">#${t(i18nKey) || tKey}</span>`;
  }).join(' ');
  const imgHtml = item.image ? `<img src="${item.image}" alt="${miscData.title}" class="single-post-image" />` : '';

  if (backBtn) {
    const backKey = previousTabBeforeMisc === 'about' ? 'back_to_about' : 'back_to_misc';
    backBtn.innerHTML = t(backKey);
  }

  if (container) {
    container.innerHTML = `
      <h1 class="single-post-title">${miscData.title}</h1>
      <div class="single-post-meta">
        <span>${item.date}</span>
        ${readTimeStr ? ` &middot; <span>${readTimeStr}</span>` : ''}
        ${tagsHtml ? ` &middot; ${tagsHtml}` : ''}
        ${lang === 'zh' ? ` &middot; <span class="ai-trans-badge">${t('ai_trans_badge')}</span>` : ''}
      </div>
      
      ${miscData.summary ? `
      <div class="single-post-summary-box">
        <div class="single-post-summary-title">${t('summary_heading')}</div>
        <p class="single-post-summary-text">${miscData.summary}</p>
      </div>` : ''}

      ${imgHtml}

      <div class="single-post-body">
        ${formatSimpleMarkdown(miscData.content || miscData.note)}
      </div>
    `;
  }

  switchTab('misc-detail', false);

  if (updateHistory) {
    history.pushState(null, '', `#misc/${miscId}`);
  }
}

function goBackFromMisc() {
  switchTab(previousTabBeforeMisc || 'misc');
}

/* ==========================================================================
   Interactive World Map & Journey Controller
   ========================================================================== */
function initJourneyMap() {
  const playBtn = document.getElementById('journeyPlayBtn');
  const resetBtn = document.getElementById('journeyResetBtn');

  if (!SITE_DATA.journey) return;

  // Play / Reset Controls
  if (playBtn) {
    playBtn.addEventListener('click', toggleJourneyPlay);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      stopJourneyPlay();
      setJourneyStep(0);
    });
  }

  // Set initial step to Birthplace (Jiamusi 2001)
  setJourneyStep(0);
}

function updateJourneyLanguage() {
  if (!SITE_DATA || !SITE_DATA.journey) return;
  const lang = getLang();
  const { steps, cities } = SITE_DATA.journey;

  // 1. Update breadcrumbs text
  const crumbBtns = document.querySelectorAll('#journeyCrumbs .crumb-btn');
  crumbBtns.forEach((btn, idx) => {
    if (steps[idx]) {
      const stepData = steps[idx][lang] || steps[idx].en;
      btn.textContent = stepData.crumb;
    }
  });

  // 2. Update map city labels
  Object.keys(cities).forEach(key => {
    const label = document.getElementById(`label-${key}`);
    if (label && cities[key]) {
      label.textContent = cities[key][lang] || cities[key].en;
    }
  });

  // 3. Update active story step text
  setJourneyStep(currentJourneyStep, false);
}

function setJourneyStep(stepIndex, stopAuto = true) {
  if (!SITE_DATA || !SITE_DATA.journey) return;
  const { steps, cities } = SITE_DATA.journey;
  if (stepIndex < 0 || stepIndex >= steps.length) return;

  if (stopAuto && isJourneyPlaying) {
    stopJourneyPlay();
  }

  currentJourneyStep = stepIndex;
  const lang = getLang();
  const step = steps[stepIndex];
  const stepData = step[lang] || step.en;

  // 1. Update Top Breadcrumb Buttons
  const crumbBtns = document.querySelectorAll('#journeyCrumbs .crumb-btn');
  crumbBtns.forEach((btn, idx) => {
    btn.classList.remove('active');
    btn.classList.remove('completed');
    if (idx === stepIndex) {
      btn.classList.add('active');
    } else if (idx < stepIndex) {
      btn.classList.add('completed');
    }
  });

  // 2. Update Story Box
  const storyBox = document.getElementById('journeyStory');
  if (storyBox) {
    storyBox.innerHTML = `
      <div class="story-meta-row">
        <span class="story-age-badge">${step.year} &middot; ${stepData.tag}</span>
        <span class="story-route-pill">${stepData.routeLabel}</span>
      </div>
      <div class="story-title">${stepData.title}</div>
      <p class="story-desc">${stepData.desc}</p>
    `;
  }

  // 3. Update SVG Arcs (Trajectories)
  steps.forEach((s, idx) => {
    if (idx === 0) return; // Step 0 has no arc
    const arcEl = document.getElementById(`journeyArc-${idx}`);
    if (!arcEl) return;

    if (idx < stepIndex) {
      arcEl.setAttribute('class', 'journey-arc-path completed');
    } else if (idx === stepIndex) {
      arcEl.setAttribute('class', 'journey-arc-path active');
    } else {
      arcEl.setAttribute('class', 'journey-arc-path');
    }
  });

  // 4. Update City Markers & Pulse Rings
  const visitedCities = new Set(steps.slice(0, stepIndex + 1).map(s => s.cityKey));
  const activeCity = step.cityKey;

  Object.keys(cities).forEach(key => {
    const dot = document.getElementById(`dot-${key}`);
    const pulse = document.getElementById(`pulse-${key}`);
    const label = document.getElementById(`label-${key}`);

    if (dot) {
      dot.setAttribute('class', 'city-point');
      if (visitedCities.has(key)) dot.classList.add('visited');
      if (key === activeCity) dot.classList.add('active');
    }

    if (pulse) {
      pulse.setAttribute('class', key === activeCity ? 'city-pulse-ring active' : 'city-pulse-ring');
    }

    if (label) {
      label.setAttribute('class', key === activeCity ? 'city-name-text active' : 'city-name-text');
      label.textContent = cities[key][lang] || cities[key].en;
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
  if (playBtn) playBtn.innerHTML = t('journey_pause');

  // If at the end, restart from 0
  if (currentJourneyStep >= SITE_DATA.journey.steps.length - 1) {
    setJourneyStep(0, false);
  }

  if (journeyTimer) clearInterval(journeyTimer);

  journeyTimer = setInterval(() => {
    if (currentJourneyStep < SITE_DATA.journey.steps.length - 1) {
      setJourneyStep(currentJourneyStep + 1, false);
    } else {
      stopJourneyPlay();
    }
  }, 2100);
}

function stopJourneyPlay() {
  const playBtn = document.getElementById('journeyPlayBtn');
  isJourneyPlaying = false;
  if (playBtn) playBtn.innerHTML = t('journey_play');
  if (journeyTimer) {
    clearInterval(journeyTimer);
    journeyTimer = null;
  }
}

/* ==========================================================================
   Render Main Page Previews
   ========================================================================== */
function renderPreviews() {
  const lang = getLang();

  // 1. Experience Preview (Full experience list)
  const expContainer = document.getElementById('previewExperience');
  if (expContainer) {
    expContainer.innerHTML = SITE_DATA.experience.map(item => {
      const expData = item[lang] || item.en;
      return `
        <div class="experience-entry">
          <div class="entry-header">
            <span class="entry-title">${expData.role} &middot; <span style="font-weight: 500; color: var(--text-muted);">${item.company}</span></span>
            <span class="entry-period">${expData.period}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Writing Preview (Shows read time, summary & tags; opens dedicated post)
  const writingContainer = document.getElementById('previewWriting');
  if (writingContainer) {
    writingContainer.innerHTML = SITE_DATA.blogs.map(blog => {
      const postData = blog[lang] || blog.en;
      const readTimeStr = (blog.readTime && blog.readTime[lang]) || (blog.readTime && blog.readTime.en) || '';
      const tagsHtml = (blog.tags || []).map(tKey => {
        const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
        return `<span class="misc-tag">#${t(i18nKey) || tKey}</span>`;
      }).join(' ');

      return `
        <div class="writing-entry" onclick="openBlogPost('${blog.id}', 'about')">
          <div class="writing-entry-header">
            <span class="writing-title">${postData.title}</span>
            <span class="writing-meta">${blog.date} &middot; ${readTimeStr}</span>
          </div>
          <p class="writing-summary">${postData.summary}</p>
          ${tagsHtml ? `<div class="misc-tag-list">${tagsHtml}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  // 3. Misc Preview (Card matching writing format; opens dedicated misc reader)
  const miscContainer = document.getElementById('previewMisc');
  if (miscContainer) {
    const previewMisc = SITE_DATA.misc.slice(0, 3);
    miscContainer.innerHTML = previewMisc.map(item => {
      const miscData = item[lang] || item.en;
      const readTimeStr = (item.readTime && item.readTime[lang]) || (item.readTime && item.readTime.en) || '';
      const tagsHtml = (item.tags || []).map(tKey => {
        const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
        return `<span class="misc-tag">#${t(i18nKey) || tKey}</span>`;
      }).join(' ');

      return `
        <div class="writing-entry" onclick="openMiscPost('${item.id}', 'about')">
          <div class="writing-entry-header">
            <span class="writing-title">${miscData.title}</span>
            <span class="writing-meta">${item.date}${readTimeStr ? ' &middot; ' + readTimeStr : ''}</span>
          </div>
          <p class="writing-summary">${miscData.summary || miscData.note}</p>
          ${tagsHtml ? `<div class="misc-tag-list">${tagsHtml}</div>` : ''}
        </div>
      `;
    }).join('');
  }
}

/* ==========================================================================
   Render Full Tabs Content
   ========================================================================== */
function renderFullContent() {
  const lang = getLang();

  // 1. Full Experience
  const fullExp = document.getElementById('fullExperience');
  if (fullExp) {
    fullExp.innerHTML = SITE_DATA.experience.map(item => {
      const expData = item[lang] || item.en;
      return `
        <div class="experience-entry">
          <div class="entry-header">
            <span class="entry-title">${expData.role}</span>
            <span class="entry-period">${expData.period}</span>
          </div>
          <div class="entry-company">${item.company} &middot; (${expData.location})</div>
          <p class="entry-desc">${expData.description}</p>
        </div>
      `;
    }).join('');
  }

  // 2. Full Writing & Tags
  renderWritingEntries(activeWritingTag);

  // 3. Full Misc & Tags
  renderMiscEntries(activeMiscTag);
}

/* ==========================================================================
   Writing Section: Tag Filters & Card List
   ========================================================================== */
function setupWritingTagFilters() {
  const filterContainer = document.getElementById('writingTagFilters');
  if (!filterContainer) return;

  // Extract all unique tags across blogs
  const allTags = new Set(['all']);
  (SITE_DATA.blogs || []).forEach(b => {
    (b.tags || []).forEach(t => allTags.add(t));
  });

  filterContainer.innerHTML = Array.from(allTags).map(tKey => {
    const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
    const label = tKey === 'all' ? t('tag_all') : (t(i18nKey) || tKey);
    const activeClass = tKey === activeWritingTag ? 'active' : '';
    return `<button class="tag-filter-btn ${activeClass}" data-tag="${tKey}">${label}</button>`;
  }).join('');

  filterContainer.querySelectorAll('.tag-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.tag-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeWritingTag = btn.getAttribute('data-tag');
      renderWritingEntries(activeWritingTag);
    });
  });
}

function renderWritingEntries(filterTag = 'all') {
  const fullWriting = document.getElementById('fullWriting');
  if (!fullWriting) return;
  const lang = getLang();

  const filtered = filterTag === 'all'
    ? SITE_DATA.blogs
    : SITE_DATA.blogs.filter(b => (b.tags || []).includes(filterTag));

  if (filtered.length === 0) {
    fullWriting.innerHTML = `<p style="color: var(--text-dim); font-size: 0.88rem; padding: 1rem 0;">No articles found under #${filterTag}.</p>`;
    return;
  }

  fullWriting.innerHTML = filtered.map(blog => {
    const postData = blog[lang] || blog.en;
    const readTimeStr = (blog.readTime && blog.readTime[lang]) || (blog.readTime && blog.readTime.en) || '';
    const tagsHtml = (blog.tags || []).map(tKey => {
      const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
      return `<span class="misc-tag">#${t(i18nKey) || tKey}</span>`;
    }).join(' ');

    return `
      <div class="writing-entry" onclick="openBlogPost('${blog.id}', 'writing')">
        <div class="writing-entry-header">
          <span class="writing-title">${postData.title}</span>
          <span class="writing-meta">${blog.date} &middot; ${readTimeStr}</span>
        </div>
        <p class="writing-summary">${postData.summary}</p>
        ${tagsHtml ? `<div class="misc-tag-list">${tagsHtml}</div>` : ''}
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Misc Section: Tag Filters & Card List (Matching Writing Format)
   ========================================================================== */
function setupMiscTagFilters() {
  const filterContainer = document.getElementById('miscTagFilters');
  if (!filterContainer) return;

  // Extract all unique tags across misc items
  const allTags = new Set(['all']);
  (SITE_DATA.misc || []).forEach(m => {
    (m.tags || []).forEach(t => allTags.add(t));
  });

  filterContainer.innerHTML = Array.from(allTags).map(tKey => {
    const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
    const label = tKey === 'all' ? t('tag_all') : (t(i18nKey) || tKey);
    const activeClass = tKey === activeMiscTag ? 'active' : '';
    return `<button class="tag-filter-btn ${activeClass}" data-tag="${tKey}">${label}</button>`;
  }).join('');

  filterContainer.querySelectorAll('.tag-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.tag-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMiscTag = btn.getAttribute('data-tag');
      renderMiscEntries(activeMiscTag);
    });
  });
}

function renderMiscEntries(filterTag = 'all') {
  const fullMisc = document.getElementById('fullMisc');
  if (!fullMisc) return;
  const lang = getLang();

  const filtered = filterTag === 'all'
    ? SITE_DATA.misc
    : SITE_DATA.misc.filter(item => (item.tags || []).includes(filterTag));

  if (filtered.length === 0) {
    fullMisc.innerHTML = `<p style="color: var(--text-dim); font-size: 0.88rem; padding: 1rem 0;">No entries found for #${filterTag}.</p>`;
    return;
  }

  fullMisc.innerHTML = filtered.map(item => {
    const miscData = item[lang] || item.en;
    const readTimeStr = (item.readTime && item.readTime[lang]) || (item.readTime && item.readTime.en) || '';
    const tagsHtml = (item.tags || []).map(tKey => {
      const i18nKey = 'tag_' + tKey.replace(/-/g, '_');
      return `<span class="misc-tag">#${t(i18nKey) || tKey}</span>`;
    }).join(' ');

    return `
      <div class="writing-entry" onclick="openMiscPost('${item.id}', 'misc')">
        <div class="writing-entry-header">
          <span class="writing-title">${miscData.title}</span>
          <span class="writing-meta">${item.date}${readTimeStr ? ' &middot; ' + readTimeStr : ''}</span>
        </div>
        <p class="writing-summary">${miscData.summary || miscData.note}</p>
        ${tagsHtml ? `<div class="misc-tag-list">${tagsHtml}</div>` : ''}
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Simple Markdown Formatter
   ========================================================================== */
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
    } else if (trimmed.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h1>${formatInlineStyles(trimmed.substring(2))}</h1>`);
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
