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

## How to Add Your Own Blog Posts

All blog posts live in [`js/data.js`](js/data.js) inside the `SITE_DATA.blogs` array.

To add a new post, simply add an entry:

```javascript
{
  id: 'my-new-post-slug',
  title: 'Your Article Title Here',
  date: 'Mar 2025',
  readTime: '4 min read',
  category: 'Agentic AI', // e.g. 'Agentic AI', 'Math & Theory', or 'Reading Notes'
  tags: ['Agents', 'Compilers'],
  summary: 'A short 1-2 sentence preview for the card...',
  content: `
### Heading 1

Your thoughts, equations, or notes here in markdown format!

- Point 1
- Point 2
  `
}
```

The site will automatically render your new post, calculate tags, update the filter pills, and open the full reader when clicked.

---

## How to Add Food Spots or Places (Misc Section)

Add an entry to `SITE_DATA.misc` in [`js/data.js`](js/data.js):

```javascript
{
  id: 'unique-id',
  title: 'Place Name or Cuisine',
  category: 'Food & Drinks', // or 'Places & Travel'
  tag: 'Local Favorite',
  location: 'City, State / Country',
  badge: 'Recommended',
  highlight: 'Signature dish or landmark',
  description: 'Why you loved it, tips, or what to order.'
}
```

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
