# Yan Wu — Personal Website

A modern, fast, zero-dependency personal website for **Yan Wu** (Software Engineer @ Google DeepMind Antigravity, ex-Windsurf, MIT CS & Math alum).

## Features
- **Clean, Minimalist Aesthetics**: Thoughtful typography, smooth spacing, and responsive layout.
- **Dark / Light Mode**: Built-in toggle with automatic system theme detection (`prefers-color-scheme`) and `localStorage` persistence.
- **Minimal Experience Section**: Highlights Google DeepMind (Antigravity), Windsurf, and MIT (M.Eng & B.S. CS & Math) without cluttered widgets.
- **Extensible Research & Blog Framework**:
  - Filterable by topic: `Agentic AI`, `Math & Theory`, `Reading Notes`, etc.
  - Interactive clean modal reader for full article view with markdown formatting support.
  - Zero build step needed to write new posts!
- **Good Food & Fun Places (Misc Section)**:
  - Highlights Tianjin roots (Jianbing, Haihe), Cambridge/MIT days (Charles River, Tatte), South Bay routine (coffee & ramen), and coastal adventures.
  - Filterable by `Places & Travel` and `Food & Drinks`.
- **Zero-Build Architecture**: Vanilla HTML5, CSS3 (modern custom properties, grid/flexbox, backdrop-filter), and modular ES6 JavaScript. Instant loading, no `node_modules`, no security vulnerabilities, and zero broken build pipelines.

---

## Local Development & Preview

To preview the website locally on your computer, run:

```bash
# From the repository root
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## How to Add Writing Posts or Misc Notes

All articles and life notes are written in **standard Markdown** with separate English and Chinese files!

### 1. Adding a Writing Blog Post
Create a folder in `posts/<slug>/` and add `en.md`:
```markdown
---
id: your-post-slug
title: "Your Article Title"
date: Mar 2025
topic: "AI Agents"
tags:
  - agents
  - workflows
readTime: 3 min read
summary: "A short 1-2 sentence preview for the card."
---

### Heading

Write your article content here in standard markdown!
```

Then generate the Chinese translation and build the site:
```bash
# Generate Chinese zh.md and compile data/posts.js
python3 scripts/build_content.py --translate your-post-slug
```
*(Or scaffold directly using `python3 scripts/build_content.py --new-post your-post-slug`)*

### 2. Adding a Misc / Life Note
Create a folder in `misc/<slug>/` (or `data/misc/<slug>/`) and add `en.md`:
```markdown
---
id: your-note-slug
title: "Title of Note or Place"
date: "2025"
tags:
  - food
image: assets/images/your-photo.jpg # optional
summary: "Brief one-line summary."
---

Write your thoughts, food reviews, or observations here!
```

Then generate the Chinese version and compile:
```bash
python3 scripts/build_content.py --translate your-note-slug
```
*(Or scaffold directly using `python3 scripts/build_content.py --new-misc your-note-slug`)*

### 3. Rebuild Command
Whenever you edit markdowns, run:
```bash
python3 scripts/build_content.py
```
This automatically bundles both `posts/` and `misc/` into browser-ready data files with zero CORS issues on `file://` and on GitHub Pages. You **never have to touch `index.html`**!

---

## Deploying to GitHub Pages

This site is 100% static and requires zero build steps, making it ideal for GitHub Pages:

1. Create a repository on GitHub named `yanwu-728.github.io` (or `personal_website`).
2. Commit and push:
   ```bash
   git add .
   git commit -m "Initial launch of Yan Wu personal portfolio"
   git remote add origin https://github.com/yanwu-728/yanwu-728.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository settings, go to **Settings** > **Pages**, choose the `main` branch root `/`, and click **Save**.
4. Your website will be live at `https://yanwu-728.github.io` within seconds!

---

## License
MIT
