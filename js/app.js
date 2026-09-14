/**
 * Yan Wu - Personal Portfolio Main Script
 * Handles theme toggling, dynamic data rendering, category filters, and modal reader.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProfile();
  renderExperience();
  renderBlogs('All');
  renderMisc('All');
  setupFilters();
  setupModal();
  setupNavScroll();
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

  // Listen for system changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;
  
  if (theme === 'dark') {
    // Moon icon when dark mode is active
    themeIcon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    `;
  } else {
    // Sun icon when light mode is active
    themeIcon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    `;
  }
}

/* ==========================================================================
   Render Profile & Hero
   ========================================================================== */
function renderProfile() {
  const p = SITE_DATA.profile;
  const bioContainer = document.getElementById('heroBio');
  if (bioContainer && p.bio) {
    bioContainer.innerHTML = p.bio.map(para => `<p>${para}</p>`).join('');
  }
}

/* ==========================================================================
   Render Minimal Experience
   ========================================================================== */
function renderExperience() {
  const expContainer = document.getElementById('experienceList');
  if (!expContainer) return;

  expContainer.innerHTML = SITE_DATA.experience.map(item => {
    const isCurrent = item.badge === 'Current';
    return `
      <div class="experience-item">
        <div class="experience-header">
          <div class="experience-role-group">
            <div class="experience-role">
              ${item.role}
              <span class="badge ${isCurrent ? 'current' : ''}">${item.badge}</span>
            </div>
            <div class="experience-org">${item.organization} · <span style="color: var(--text-secondary); font-weight: normal;">${item.team}</span></div>
          </div>
          <div class="experience-meta">
            <span class="experience-period">${item.period}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${item.location}</span>
          </div>
        </div>
        <p class="experience-summary">${item.summary}</p>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Render Research & Blog Cards (Extensible Framework)
   ========================================================================== */
function renderBlogs(filterCategory = 'All') {
  const blogContainer = document.getElementById('blogGrid');
  if (!blogContainer) return;

  const filtered = filterCategory === 'All' 
    ? SITE_DATA.blogs 
    : SITE_DATA.blogs.filter(b => b.category === filterCategory);

  if (filtered.length === 0) {
    blogContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem;">No posts found in this category yet.</p>`;
    return;
  }

  blogContainer.innerHTML = filtered.map(blog => {
    const tagsHtml = (blog.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    return `
      <article class="blog-card" onclick="openModal('${blog.id}')" role="button" tabindex="0" aria-label="Read ${blog.title}">
        <div class="blog-card-top">
          <span class="blog-card-category">${blog.category}</span>
          <div class="blog-card-meta">
            <span>${blog.date}</span>
            <span>•</span>
            <span>${blog.readTime}</span>
          </div>
        </div>
        <h3 class="blog-card-title">${blog.title}</h3>
        <p class="blog-card-summary">${blog.summary}</p>
        <div class="blog-card-footer">
          <div class="tags-list">${tagsHtml}</div>
          <span class="read-more-link">Read note &rarr;</span>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   Render Misc (Food & Places)
   ========================================================================== */
function renderMisc(filterCategory = 'All') {
  const miscContainer = document.getElementById('miscGrid');
  if (!miscContainer) return;

  const filtered = filterCategory === 'All'
    ? SITE_DATA.misc
    : SITE_DATA.misc.filter(m => m.category === filterCategory);

  if (filtered.length === 0) {
    miscContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.95rem;">No entries found in this category.</p>`;
    return;
  }

  miscContainer.innerHTML = filtered.map(item => {
    return `
      <div class="misc-card">
        <div class="misc-card-header">
          <span class="misc-badge">${item.badge || item.category}</span>
          <span class="misc-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${item.location}
          </span>
        </div>
        <h3 class="misc-card-title">${item.title}</h3>
        <div>
          <span class="misc-highlight">${item.highlight}</span>
        </div>
        <p class="misc-desc">${item.description}</p>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Filter Pill Handlers
   ========================================================================== */
function setupFilters() {
  // Blog Filters
  const blogFilterBtns = document.querySelectorAll('[data-blog-filter]');
  blogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-blog-filter');
      renderBlogs(category);
    });
  });

  // Misc Filters
  const miscFilterBtns = document.querySelectorAll('[data-misc-filter]');
  miscFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      miscFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-misc-filter');
      renderMisc(category);
    });
  });
}

/* ==========================================================================
   Modal Reader
   ========================================================================== */
function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function openModal(blogId) {
  const blog = SITE_DATA.blogs.find(b => b.id === blogId);
  if (!blog) return;

  const overlay = document.getElementById('modalOverlay');
  const categoryEl = document.getElementById('modalCategory');
  const titleEl = document.getElementById('modalTitle');
  const metaEl = document.getElementById('modalMeta');
  const bodyEl = document.getElementById('modalBody');

  if (categoryEl) categoryEl.textContent = blog.category;
  if (titleEl) titleEl.textContent = blog.title;
  if (metaEl) {
    metaEl.innerHTML = `<span>${blog.date}</span> • <span>${blog.readTime}</span>`;
  }
  
  if (bodyEl) {
    bodyEl.innerHTML = parseSimpleMarkdown(blog.content);
  }

  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function parseSimpleMarkdown(md) {
  if (!md) return '';
  let lines = md.trim().split('\n');
  let result = [];
  let inList = false;

  for (let line of lines) {
    let trimmed = line.trim();
    
    // Headers
    if (trimmed.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3>${formatInline(trimmed.substring(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2>${formatInline(trimmed.substring(3))}</h2>`);
    } else if (trimmed.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h1>${formatInline(trimmed.substring(2))}</h1>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { result.push('<ul>'); inList = true; }
      result.push(`<li>${formatInline(trimmed.substring(2))}</li>`);
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList) { result.push('<ol>'); inList = true; }
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      result.push(`<li>${formatInline(itemText)}</li>`);
    } else if (trimmed === '') {
      if (inList) { result.push('</ul>'); inList = false; }
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<p>${formatInline(trimmed)}</p>`);
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  return result.join('\n');
}

function formatInline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background: var(--bg-subtle); padding: 0.15rem 0.4rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.88em; border: 1px solid var(--border-subtle);">$1</code>');
}

/* ==========================================================================
   Smooth Nav Scroll & Active Highlight
   ========================================================================== */
function setupNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
