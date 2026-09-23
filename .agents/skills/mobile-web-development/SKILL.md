---
name: mobile-web-development
description: >-
  Use this skill whenever developing, designing, optimizing, reviewing, or fixing web interfaces
  for mobile users and responsive devices. Enforces mobile-first architecture, touch ergonomics (WCAG 2.5.5 / 2.5.8),
  fluid layouts and typography, mobile viewport and safe-area optimization, responsive spacing, and Core Web Vitals for mobile.
---

# Mobile Web Development & Responsive Design Guide

This skill provides modern, production-tested guidelines for engineering responsive, high-performance, and ergonomic web experiences tailored for mobile users and cross-device environments.

---

## Core Philosophy: The Mobile Context

1. **Mobile-First Mindset**: Design and implement base styles for small viewports (320px–393px) first, then layer on progressive enhancements for larger screens.
2. **Physical Touch vs. Mouse Pointer**: Mouse cursors have sub-pixel precision; human thumbs have an average contact surface of ~44px. Every interactive element must be touch-friendly, forgiving, and tactile.
3. **Adaptive Vertical Rhythm**: Desktop screens have ample vertical headroom where 40px–80px margins feel airy. On mobile screens (667px–850px viewport height), excessive spacing pushes meaningful content below the fold, creating a barren, fragmented layout. Spacing and gaps must scale adaptively.
4. **Performance as UX**: Mobile devices operate under fluctuating network latencies, lower CPU performance, and battery constraints. Minimizing layout recalculations, avoiding render-blocking assets, and optimizing Core Web Vitals (LCP, INP, CLS) are essential.

---

## 1. Mobile Viewport & Safe Areas

### Viewport Configuration
Always include a proper viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### Safe-Area Insets (Notches & Home Indicator Bars)
Modern mobile devices (e.g., iPhone Dynamic Island, gesture home bars) require padding to prevent content clipping:
```css
.page-container {
  padding-top: max(1.5rem, env(safe-area-inset-top, 1.5rem));
  padding-right: max(1.25rem, env(safe-area-inset-right, 1.25rem));
  padding-bottom: max(2rem, env(safe-area-inset-bottom, 2rem));
  padding-left: max(1.25rem, env(safe-area-inset-left, 1.25rem));
}
```

### Eliminate Horizontal Page Overflow
Mobile horizontal "page wobble" ruins user experience. Ensure:
```css
html, body {
  overflow-x: hidden;
  width: 100%;
}

img, video, iframe, pre, table, svg {
  max-width: 100%;
}
```

---

## 2. Touch Ergonomics & Interaction

### Touch Target Sizing (WCAG 2.5.5 & 2.5.8)
- **Primary Buttons & Nav Elements**: Minimum `44px × 44px` target area.
- **Secondary / Dense Tags & Pills**: If visual height is compact (e.g., 28px–34px), ensure sufficient horizontal padding (`padding: 0.35rem 0.75rem`) and at least `8px` (`0.5rem`) gap between adjacent clickable items to avoid mis-taps.
- **Inline Text Links**: Provide adequate line-height (`1.5`–`1.7`) so tapping inline links does not trigger neighboring lines.

### Touch Feedback & Fast Tap Response
Eliminate mobile tap lag and iOS tap highlight boxes:
```css
button,
a,
[role="button"],
.interactive-pill {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* Disables double-tap-to-zoom delay on mobile */
  transition: transform 0.15s ease, background-color 0.15s ease;
}

button:active,
.interactive-pill:active {
  transform: scale(0.97); /* Instant tactile press feedback */
}
```

### Never Rely on `:hover` for Mobile
Touch devices do not have persistent hover states. Sticking hover styles can trap UI elements in hover states after tapping:
```css
/* Only apply hover effects when the device actually supports fine hover */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}
```

---

## 3. Responsive Spacing & Vertical Rhythm

### Avoid Desktop Whitespace Inflation on Mobile
A common bug is using identical flex gaps or margins on desktop and mobile. A `2.75rem` (44px) gap between a header, a filter pill bar, and a post list creates over 100px of dead space on mobile.

**Best Practice Pattern:**
```css
/* Desktop default */
.tab-panel.active {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tab-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Keeps title, subtitle, and tag filters tightly grouped */
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .tab-panel.active {
    gap: 1.25rem; /* Scaled down for mobile viewports */
  }

  .tab-header {
    gap: 0.6rem;
  }
  
  .tag-filters {
    gap: 0.45rem;
    margin: 0; /* Never stack large margins on top of flex container gaps */
  }
}
```

---

## 4. Fluid Typography & Inputs

### Scalable Typography with `clamp()`
Scale font sizes smoothly across viewports without rigid media-query jumps:
```css
:root {
  --font-size-h1: clamp(1.65rem, 4vw + 0.5rem, 2.25rem);
  --font-size-h2: clamp(1.35rem, 3vw + 0.4rem, 1.75rem);
  --font-size-body: clamp(0.95rem, 1.5vw + 0.5rem, 1.08rem);
}
```

### Prevent iOS Auto-Zoom on Inputs
iOS Safari automatically zooms into any input with font size smaller than 16px (1rem):
```css
input,
select,
textarea {
  font-size: 16px; /* Must be at least 16px to prevent unwanted viewport zoom */
}
```

---

## 5. Responsive Breakpoint Strategy

Use mobile-first breakpoint logic:

| Breakpoint | Target Devices | Usage |
| :--- | :--- | :--- |
| **Default** | `< 480px` | Single-column, stacked layout, full-width cards, compact headers |
| `@media (min-width: 480px)` | Phablets / Large Phones | Enhanced grids (2 columns), relaxed horizontal margins |
| `@media (min-width: 768px)` | Tablets / iPad Portrait | Dual-column layouts, expanded navigation, sidebars |
| `@media (min-width: 1024px)`| Desktops / Laptops | Sticky sidebars, full-width views, multi-column cards |

---

## 6. Mobile Performance & Web Vitals

1. **Largest Contentful Paint (LCP)**:
   - Serve responsive images via `<picture>` or `srcset`.
   - Never lazy-load above-the-fold hero images; use `fetchpriority="high"`.
2. **Cumulative Layout Shift (CLS)**:
   - Explicitly define `width` and `height` or `aspect-ratio` on all images and containers.
   - Avoid injecting dynamic banners or heights without reserving space.
3. **Interaction to Next Paint (INP)**:
   - Keep event handlers lightweight.
   - For touch or gesture handlers (such as maps or carousels), use `touch-action: pan-y` or `pan-x` so the browser can handle native scroll without waiting on JavaScript execution.

---

## 7. Mobile QA Verification Checklist

Before deploying any mobile layout change, verify against this checklist:

- [ ] **No Horizontal Overflow**: Page does not sway or wobble horizontally when scrolling.
- [ ] **Viewport Fit**: Tested at 375px (iPhone SE), 390px (iPhone 14/15/16), and 768px (iPad).
- [ ] **Tap Target Sizes**: Buttons and pills can be easily tapped with thumbs without touching adjacent links.
- [ ] **Vertical Rhythm**: Headers, tag pills, and list entries are grouped logically without huge vertical gaps.
- [ ] **Safe Areas**: Content is not cut off by notches, punch holes, or the iOS home indicator bar.
- [ ] **Touch Scrolling**: Any embedded widgets (SVG maps, tables, code blocks) allow page vertical scrolling without locking the screen.
- [ ] **No Sticky Hover Artifacts**: Buttons return to default visual state immediately after finger release.
