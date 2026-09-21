# DESIGN.md -- "Observatory" visual system (2026-09-21 revamp)

Read this before touching any `.astro` file. Every lane builds on these tokens;
if you need something that isn't here, add it to `Layout.astro` `:root` AND
document it here, don't invent a local one-off.

## The idea in one line
A quiet observatory at night: near-black space, starlight-gold accent, one serif
voice for the words that matter, and NO bubble wrap. Motion is a budget spent
on two things only: the hero sky and the Astraedus emblem. Everything else is
still, typographic, and flat.

## Personality it must express (from Anti's own About copy)
"I like romanticising life." Systems thinker, generalist, space / astronomy /
neuroscience, building things that give people back their agency. Editorial,
warm, a little poetic. NOT "developer template", NOT SaaS.

## Kill list (the old template language -- remove wherever you touch)
- Glass cards (`--glass-bg` + `backdrop-filter` + `border-radius: 16-24px`).
- Gradient hairlines on card top/bottom (`.card-glow`, `.card-hover-line`, `.app-glow`).
- Hover `translateY(-4px)` + glow shadow on every element.
- Pill spam: tag pills, skill pills, badge pills. A row of 3+ pills is a smell.
  Replace with a single mono meta line: `Kotlin · Android · GPL-3.0`.
- Teal `#64ffda` / purple `#a855f7` as accents. `--primary-color` now MAPS to
  the gold accent; don't hardcode the old hexes (grep for `100, 255, 218` and
  `168, 85, 247` and `8, 145, 178` and delete them).
- Two-button footers on every card ("View Project" + "GitHub"). One quiet
  arrow-link, or make the whole row the link.
- Section-title + centered 60px gradient bar (`.header-accent`). Replace with
  the editorial section header below.

## Tokens (all in `src/layouts/Layout.astro`)
Colors (dark is the base; `<html>` has NO attribute in dark mode, light sets
`data-theme="light"`):
- `--color-bg` #07070f  page. `--color-bg-alt` #0b0b17 alternate band.
  `--color-surface` #10101d raised panel (use SPARINGLY -- feature panels only).
- `--color-heading` #f2f0ff, `--color-text` #b9b7c9, `--color-text-alt` #8c8a9e,
  `--color-text-dim` #5f5d70.
- `--color-rule` hairline dividers: rgba(255,255,255,.1). `--color-border` same.
- `--accent` #f2c27b starlight gold: links, the one highlighted word, arrows,
  active nav. `--accent-soft` rgba(242,194,123,.12) for tints.
- `--accent-2` #9d8cff nebula violet: RARE. Visited links, one decorative use.
- Light (`[data-theme="light"]`): parchment bg #f4efe6 / alt #ece6d9 / surface
  #faf7f1; ink heading #17140f, text #3a3632, alt #6b665f, dim #9a948a; rule
  rgba(23,20,15,.12); accent rust #b4531f; accent-2 #5b4bb5.

Type:
- `--font-display: 'Instrument Serif', Georgia, serif` -- ALL h1/h2/h3 and any
  "voice" line. Regular weight only (it has one). Italic for the poetic line.
  Tight tracking: `letter-spacing: -0.02em`, `line-height: 1.05`.
- `--font-body: 'Inter'` body copy, 1.05rem / 1.7.
- `--font-mono: 'JetBrains Mono', ui-monospace, monospace` for meta: dates,
  tech lines, eyebrows, numbers. 0.78rem, `letter-spacing: 0.06em`, uppercase
  for eyebrows, normal case for tech lines.
- Scale: h1 clamp(2.8rem, 6vw, 5rem); section h2 clamp(2.2rem, 4vw, 3.4rem);
  h3 1.5rem.

Layout:
- Content measure `--measure: 68ch` for prose. Wide container `--container: 1120px`.
- Section rhythm: `padding: clamp(5rem, 10vw, 8rem) 0`. Sections alternate
  `--color-bg` / `--color-bg-alt` bands only where it helps; a hairline
  (`border-top: 1px solid var(--color-rule)`) is the preferred separator.
- Radius: `--radius-sm` 4px for images/thumbnails, `--radius-md` 8px max for
  feature panels. NOTHING at 16px+ except the two remaining round things
  (profile photo, Astraedus emblem).

## Shared primitives (copy these patterns, keep classnames)
Editorial section header (left-aligned, in the container):
```html
<header class="sec-head">
  <span class="sec-index">02</span>      <!-- mono, dim, the section number -->
  <h2 class="sec-title">Featured Projects</h2>   <!-- display serif -->
  <p class="sec-lede">One sentence, optional.</p> <!-- body, text-alt -->
</header>
```
```css
.sec-head { display: grid; grid-template-columns: 3.5rem 1fr; gap: 0 1rem; align-items: baseline; margin-bottom: clamp(2.5rem, 5vw, 4rem); }
.sec-index { font-family: var(--font-mono); font-size: .8rem; color: var(--color-text-dim); letter-spacing: .08em; }
.sec-title { grid-column: 2; margin: 0; font-family: var(--font-display); font-weight: 400; font-size: clamp(2.2rem, 4vw, 3.4rem); line-height: 1.05; letter-spacing: -.02em; color: var(--color-heading); }
.sec-lede { grid-column: 2; margin: .75rem 0 0; max-width: 60ch; color: var(--color-text-alt); }
```
Section numbers on the homepage: 01 About, 02 Featured Projects, 03 Writing, 04 Contact.

Row list (projects, posts): hairline-separated rows, whole row is the link.
```html
<a class="row" href="..."><span class="row-meta">2026</span><span class="row-title">Title</span><span class="row-desc">One line.</span><span class="row-arrow">→</span></a>
```
Grid `grid-template-columns: 5rem 1fr 1.4fr auto` on desktop, stacked on mobile;
`border-top: 1px solid var(--color-rule)`, `padding: 1.4rem 0`; hover: title
turns `--accent`, arrow `translateX(6px)`, row background `--accent-soft` at
very low alpha is allowed. Optional hover image reveal: a fixed-position
thumbnail that follows the cursor (JS, `pointer-events: none`, only on
`(hover: hover) and (min-width: 900px)`). Meta in mono.

Mono meta line (replaces tag pills): `<p class="meta">Kotlin · Android · GPL-3.0</p>`
`font-family: var(--font-mono); font-size: .78rem; color: var(--color-text-dim); letter-spacing: .04em;`

Arrow link (replaces buttons): `<a class="arrow-link">Read the write-up <span>→</span></a>`
`color: var(--accent); font-weight: 500; text-decoration: none; border-bottom: 1px solid transparent;` hover: `border-bottom-color: var(--accent)`, arrow `translateX(4px)`. No fills, no pills. A filled button is allowed ONLY for the two store CTAs (Google Play) and the Astraedus CTA.

Feature panel (Nudge / SoulSync / latest post): flat `background: var(--color-surface); border: 1px solid var(--color-rule); border-radius: var(--radius-md);` no shadow, no lift. Image on top with `border-radius: var(--radius-sm)` inside padding, or full-bleed with the panel radius. Body: display-serif h3, one accent tagline in body italic, mono meta line, one paragraph, one arrow-link + one filled store CTA max.

## Motion budget
- Allowed everywhere: `color`, `border-color`, `opacity`, `transform: translateX` on arrows, 0.25-0.4s ease.
- Forbidden outside hero + Astraedus: `translateY` lifts, glow `box-shadow`, `scale` on images, gradient sweeps, floating shapes.
- Respect `prefers-reduced-motion`.

## Light theme rule (Astro scoping gotcha)
Inside component `<style>`, ALWAYS `:global([data-theme="light"]) .x`. Bare
`[data-theme="light"] .x` compiles to dead CSS. Dark values live on the base
rule. Verify with `getComputedStyle`, not by reading source.

## Verification bar for every lane
1. `npm run build` exits 0.
2. Screenshot your sections at 1280 and 400 wide, dark AND light (playwright:
   `import { chromium } from '/home/astraedus/Projects/piano/node_modules/playwright/index.mjs'`,
   `chromium.launch({ executablePath: '/usr/bin/google-chrome' })`; set light via
   `document.documentElement.setAttribute('data-theme','light')`; scroll targets
   into view first, lazy images don't load offscreen; clip y = rect.top + scrollY).
   Save to `~/Pictures/screenshots/<lane>-*.png` and LOOK at them.
3. `grep -n "64ffda\|100, 255, 218\|168, 85, 247\|8, 145, 178\|glass-bg\|backdrop-filter\|translateY(-" <your files>` returns nothing.
4. No horizontal overflow at 400px.
