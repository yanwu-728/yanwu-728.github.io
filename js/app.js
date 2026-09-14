/**
 * Yan Wu - Personal Website Main Script
 * Minimalist, zero-dependency tab switching, data rendering, and theme management.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  renderPreviews();
  renderFullContent();
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
   Tab Navigation
   ========================================================================== */
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Handle URL hash on load (e.g. #experience, #writing, #misc)
  const initialHash = window.location.hash.replace('#', '');
  if (['about', 'experience', 'writing', 'misc'].includes(initialHash)) {
    switchTab(initialHash, false);
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'about';
    if (['about', 'experience', 'writing', 'misc'].includes(hash)) {
      switchTab(hash, false);
    }
  });
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

  if (updateHistory) {
    history.pushState(null, '', `#${tabId}`);
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ==========================================================================
   Render Main Page Previews
   ========================================================================== */
function renderPreviews() {
  // 1. Experience Preview (Top 3)
  const expContainer = document.getElementById('previewExperience');
  if (expContainer) {
    const previewItems = SITE_DATA.experience.slice(0, 3);
    expContainer.innerHTML = previewItems.map(item => `
      <div class="experience-entry">
        <div class="entry-header">
          <span class="entry-title">${item.role} &middot; <span style="font-weight: normal; color: var(--text-muted);">${item.company}</span></span>
          <span class="entry-period">${item.period}</span>
        </div>
      </div>
    `).join('');
  }

  // 2. Writing Preview (Demo drafts)
  const writingContainer = document.getElementById('previewWriting');
  if (writingContainer) {
    writingContainer.innerHTML = SITE_DATA.blogs.map(blog => `
      <div class="writing-entry" onclick="switchTab('writing')">
        <div class="writing-entry-header">
          <span class="writing-title">${blog.title}</span>
          <span class="writing-meta">${blog.date}</span>
        </div>
        <p class="writing-summary">${blog.summary}</p>
      </div>
    `).join('');
  }

  // 3. Misc Preview (Top 2 spots)
  const miscContainer = document.getElementById('previewMisc');
  if (miscContainer) {
    const previewMisc = SITE_DATA.misc.slice(0, 2);
    miscContainer.innerHTML = previewMisc.map(item => `
      <div class="misc-entry" onclick="switchTab('misc')" style="cursor: pointer;">
        <div class="misc-header">
          <span class="misc-title">${item.title}</span>
          <span class="misc-location">${item.location}</span>
        </div>
        <div class="misc-highlight">${item.highlight}</div>
      </div>
    `).join('');
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

  // Full Writing (Demo / Starter notes with inline toggle)
  const fullWriting = document.getElementById('fullWriting');
  if (fullWriting) {
    fullWriting.innerHTML = SITE_DATA.blogs.map(blog => `
      <div class="writing-entry" onclick="togglePostInline('${blog.id}')">
        <div class="writing-entry-header">
          <span class="writing-title">${blog.title}</span>
          <span class="writing-meta">${blog.date} &middot; ${blog.topic}</span>
        </div>
        <p class="writing-summary">${blog.summary}</p>
        <div id="content-${blog.id}" class="writing-content-inline">
          ${formatSimpleMarkdown(blog.content)}
        </div>
      </div>
    `).join('');
  }

  // Full Misc
  const fullMisc = document.getElementById('fullMisc');
  if (fullMisc) {
    fullMisc.innerHTML = SITE_DATA.misc.map(item => `
      <div class="misc-entry">
        <div class="misc-header">
          <span class="misc-title">${item.title}</span>
          <span class="misc-location">${item.location}</span>
        </div>
        <div class="misc-highlight">${item.highlight}</div>
        <p class="misc-note">${item.note}</p>
      </div>
    `).join('');
  }
}

/* Inline expand/collapse for blog posts */
function togglePostInline(postId) {
  const contentEl = document.getElementById(`content-${postId}`);
  if (contentEl) {
    contentEl.classList.toggle('open');
  }
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
