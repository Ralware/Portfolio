# Portfolio Base (Vanilla HTML/CSS/JS)

A clean, standalone portfolio template built with **only HTML5, CSS3, and vanilla JavaScript** — no React, no TypeScript, no Tailwind, no frameworks, no build step. It recreates the design system of the reference portfolio (layout, typography, colors, animations, interactions, responsive behavior) with all personal content replaced by placeholders.

## Run it

Open `index.html` in a browser. That's it.

```text
No build step required.
No framework required.
No dependencies required (Google Fonts load from CDN; everything works offline except the fonts).
```

For full multi-page navigation (and to avoid `file://` quirks), serve the folder statically:

```bash
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

## Structure

```text
portfolio-base/
├── index.html        Home: hero, about, experience, tech carousel, featured projects
├── projects.html     Project listing with hover preview (desktop) / image cards (mobile)
├── project.html      Project detail (?slug=...) with themed variants, TOC minimap, prev/next
├── resume.html       Resume preview + open/download
├── 404.html          Not found
├── css/
│   ├── styles.css    ALL styling: theme variables, layout, effects, responsive breakpoints
│   └── space.css     Space theme layer: cosmos palette, starfield, meteors, grain, Doto accents
├── js/
│   ├── data.js       ★ ALL CONTENT — edit this file to personalize (see below)
│   ├── theme.js      Enforces pure dark mode (`data-theme="dark"`)
│   ├── nav.js        Navbar render, scroll pill, mobile fullscreen menu
│   ├── palette.js    Command palette (Ctrl/⌘+K, search, keyboard nav)
│   ├── space.js      Cosmos background: generated starfield, shooting stars, mission kicker
│   ├── effects.js    Loader, scroll reveal, glow tracking, tilt, contour canvas, toast, footer
│   ├── home.js       Home page renderer (hero, about, experience, tech, projects)
│   ├── projects.js   Projects listing renderer
│   ├── project.js    Project detail renderer
└── assets/           placeholder.svg, avatar.jpg, resume-preview.svg, resume.pdf
```

## Personalize — edit `js/data.js`

Everything renders from the `portfolioData` object. You should never need to hunt through HTML/CSS/JS:

| Section | What to change |
|---|---|
| `site` | Logo text, name, tagline, URL |
| `personal` | Name, role, bio, location, email, avatar path, resume path, journey, education |
| `social` | Links + icons (`github, linkedin, email, discord, medium, spotify, twitter, website`) |
| `skills` | Tech carousel badges (`name` + short `glyph`) |
| `experience` | Timeline companies, positions, bullets, skills |
| `projects` | Title, descriptions, tags, live/GitHub links, images, accent color, detail template (`default, spotlight, newspaper, tv, contour`), features, tech |
| `homeProjectIds` / `projectOrder` | Which projects show on home / listing order |
| `githubActivity` | Static 7-month commit bars (wire to the GitHub API yourself for live data) |
| `nav` | Navigation links |

Then replace the files in `assets/` with your photo (`avatar.jpg` → your image, update the path in `data.js`), your resume PDF, and project screenshots (set each project's `image`). `placeholder.svg` is the generic fallback used wherever no image is set.

## Theme colors

Pure dark mode only. The palette lives in `css/space.css` (`:root` = pure-black cosmos variables); `js/theme.js` plus the inline `<script>` in each page's `<head>` enforce `data-theme="dark"` and repair stale `light` values in `localStorage` (key: `portfolio-theme`). There is no toggle UI.

## Notes on fidelity

- Fonts, sizes, spacing, radii, and the monochrome variable-driven theme replicate the reference design.
- Effects reproduced natively: scroll pill navbar, per-letter TextRoll hover, dual tech ribbons, animated contour-topography canvas (project detail `contour` template), glow cards, page loader, route fade, TOC minimap, arrow-key project navigation.
- Space theme (`css/space.css` + `js/space.js`): pure-black cosmos with a generated twinkling starfield (170 stars), film grain, and Doto HUD typography. The background is static (CSS keyframes only, no mouse tracking); `prefers-reduced-motion` renders static stars.
- Simplifications (documented, no dependency added): the handwriting "hello" effect and device mockups from single-project detail variants are represented by the generic themed templates, and live Discord/GitHub data are static placeholders.
- `prefers-reduced-motion` disables animation; semantic HTML, focus states, ARIA labels, and keyboard support (palette, menus, detail nav) are included.
