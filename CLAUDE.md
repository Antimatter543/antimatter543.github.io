# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro. The site features a blog, projects showcase, and personal information sections. It uses Astro's content collections for managing blog posts and project data.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Architecture

### Content Collections
The site uses Astro's content collections system for structured content:

- **Projects Collection** (`src/content/projects/`): Markdown files with frontmatter defining project metadata (title, description, technologies, dates, status, etc.). Projects can either have detailed writeups or link to external URLs
- **Blog Collection** (`src/content/blog/`): Blog posts with frontmatter for title, description, publication date, tags, etc.
- **Content Schema** (`src/content/config.ts`): Zod schemas defining the structure and validation for both collections

### Page Structure
- `src/pages/index.astro`: Main homepage, in order: hero (lensed starfield + Anti's line) -> manifesto (the xkcd strip) -> about -> featured projects (Astraedus showcase, then the two shipped-apps panels, then the project rows) -> latest writing -> contact
- `src/pages/blog.astro`: Blog listing page
- `src/pages/projects.astro`: Projects showcase page
- `src/pages/blog/[slug].astro`: Dynamic blog post pages
- `src/pages/projects/[slug].astro`: Dynamic project detail pages

### Components
- **Visual system: read `DESIGN.md` first.** The 2026-09-21 "Observatory" revamp: near-black space, starlight-gold accent, Instrument Serif for headings/voice lines, JetBrains Mono for meta, Inter body, flat editorial layout (rows + hairlines, no glass cards, no pills, motion budget spent only on the hero sky and the Astraedus emblem). Tokens live in `Layout.astro`; legacy names (`--primary-color`, `--glass-*`, `--radius-lg/xl`) are mapped onto the new tokens so old code degrades gracefully, but new code should use the new names.
- `src/components/`: Reusable Astro components for sections (Hero, Manifesto, About, Projects, Writing, Contact, Navbar, Footer)
  - `HeroSection.astro` + `src/utils/observatory-sky.js`: the first screen. The canvas is a 3-layer parallax starfield with a real point-mass gravitational lens (theta+/theta- images, Einstein ring), an idle Lissajous wander confined to the upper sky, pointer-follow while hovered, occasional meteors, theme-aware colors (parchment star chart in light), a static render under `prefers-reduced-motion`, and it pauses when offscreen. The headline is Anti's own About line.
  - `ManifestoSection.astro`: the xkcd #137 strip that used to BE the hero, now one beat down with credit.
  - `AstraedusShowcase.astro`: The first, full-width row of Featured Projects: the Astraedus autonomous-agent card linking to github.com/astraedus. The ouroboros (`public/images/astraedus-ouroboros.svg`, vectorised from the GitHub avatar) is painted through a CSS `mask-image`, so the same silhouette is monochrome at rest and an animated fire gradient on hover; rings, embers and the background wash all swap cool -> warm on hover. Tagline is a constant in the frontmatter.
  - `ShippedAppsRow.astro`: The second row of Featured Projects: two larger cards for the shipped Android apps (Nudge, SoulSync). Card copy (tagline, badges, the "why" quote) is defined in the component's frontmatter, while images and links are pulled from the projects collection via `getEntry` so they stay single-sourced with the project pages. Formerly a standalone `AppsSection`; the `#apps` id is kept on the row for old deep links.
  - `ProjectGrid.astro` accepts an `exclude` prop (array of slugs); `ProjectsSection` passes `['nudge', 'soulsync']` so the apps are not shown twice.
- `src/layouts/`: Base layouts including main Layout.astro with global styles and metadata
  - `src/layouts/BlogPost.astro`: Legacy blog post layout (not currently used)

### Blog Post Rendering
**Important**: Blog posts are rendered using the dynamic page template at `src/pages/blog/[slug].astro`, NOT the `BlogPost.astro` layout. This template handles:
- Hero image display (`.featured-image` class)
- Blog metadata and tags
- Content rendering
- Navigation back to blog listing

### Utilities
- `src/utils/projects.ts`: Helper functions for working with project data including filtering, sorting, and formatting

### Styling
Global styles are defined in `src/layouts/Layout.astro` with CSS custom properties for theming. The site uses Inter font from Google Fonts.

**Light-theme overrides inside component `<style>` blocks MUST use `:global([data-theme="light"]) .selector`.** A bare `[data-theme="light"] .selector` gets scoped by Astro to `[data-astro-cid-x][data-theme="light"] ...`, and since `<html>` never carries the scope attribute the rule silently never matches (every such rule on the site was dead CSS until 2026-09-21). Verify a new override with `getComputedStyle` in the browser, not by reading the source.

## Content Management

### Adding Projects
1. Create a new `.md` file in `src/content/projects/`
2. Follow the schema defined in `src/content/config.ts` for frontmatter
3. Include required fields: title, description, image, technologies, status, startDate, category
4. Set `hasWriteup: true` for projects with detailed content or `hasWriteup: false` for external links
5. For external projects, provide `externalUrl` to redirect users to GitHub repos or live applications

### Adding Blog Posts
1. Create a new `.md` file in `src/content/blog/`
2. Follow the blog schema for frontmatter with title, description, pubDate, and optional tags

### Project Status Values
- `completed`: Finished projects
- `in-progress`: Currently active projects  
- `planned`: Future projects

### Project Types
- **Writeup Projects** (`hasWriteup: true`): Projects with detailed case studies and content. These display a book icon (📖) and "Read More" button
- **External Projects** (`hasWriteup: false`): Projects that redirect to external URLs. These show "View Project" and link directly to GitHub repos or live applications

## Key Files to Understand
- `src/content/config.ts`: Content collection schemas and validation
- `src/utils/projects.ts`: Project data utilities and helper functions
- `src/layouts/Layout.astro`: Base layout with global styles and metadata
- `astro.config.mjs`: Astro configuration including markdown syntax highlighting