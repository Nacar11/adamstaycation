# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Brand name: Adam's Staycation** (the repo is named `dalestaycation` but the product/website is Adam's Staycation). Single-page marketing site for an Airbnb property (Tambuli Seaside Living, Lapu-Lapu City, Cebu). Built with Next.js 14 (App Router), TypeScript and Tailwind CSS v3. Production: `https://adamstaycation.business` (Vercel; pushing `main` deploys).

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (also type-checks)
- `npm run lint` — ESLint (`next/core-web-vitals`); must report zero warnings
- `npm start` — Serve production build
- `scripts/optimize-images.sh` — Shrink new photos in `public/images` (macOS `sips`, ≤2048px, q75) before committing

No test suite — `build` + `lint` are the CI checks. Verify UI changes in a browser at 1440px and 390px.

## Architecture

`app/page.tsx`: skip link → `StructuredData` (JSON-LD) → `Navbar` → `<main id="main">` with `LandingSection` → `ExperienceSection` → `HostSection`.

- `app/layout.tsx` — metadata (SEO/OG), `viewport`, fonts, `MotionProvider`, Vercel Analytics + Speed Insights
- `app/sitemap.ts`, `app/robots.ts` — generated from `SITE_URL`
- `components/sections/` — page sections
  - `landing-section.tsx` — hero slideshow, `PageLoader` (shown only if the first photo is slow), pause control
  - `experience-section.tsx` — server component composing `experience/*`:
    `highlights`, `dita-about`, `essentials-strip`, `resort-access`, `photo-gallery` (+ `gallery-tabs`, `gallery-lightbox`)
  - `experience/data.ts` — all copy, images and room facts (`ROOM`); `experience/constants.ts` — reveal timing, `sizes`, cadences
  - `host-section.tsx` — server component (owner, contacts, CTAs, footer)
- `components/shared/` — `navbar`, `page-loader`, `structured-data`, `motion-provider`, `section-heading`, `airbnb-link`
- `components/ui/` — Magic UI primitives + `image-shimmer` (`ImageShimmer`, `ShimmerImage`)
- `lib/constants.ts` — `AIRBNB_LISTING_URL`, `CONTACT_EMAIL`, `SITE_URL`, `MAPS_URL`, property address/geo (single source of truth)
- `lib/theme.ts` — colour values for props that can't take classes (e.g. `ShimmerButton`), built from CSS variables
- `lib/utils.ts` — `cn()`, `wrapIndex()`; `lib/scroll.ts` — `scrollToTarget()`; `lib/a11y.ts` — `handleTablistKeyDown()`; `lib/preload-image.ts` — `preloadImage()`
- `lib/hooks/` — `useImageReadiness`, `usePreloadWhenNear`, `useIsActive`, `usePrefersReducedMotion`, `useLockBodyScroll`, `useSwipe`

Static photos live in `public/images/` by area (studio, pool, beach, gym, …).

## Reuse First

Before writing markup or logic, use the existing building blocks:

| Need | Use |
|---|---|
| Section eyebrow + `h2` with italic accent | `SectionEyebrow`, `SectionHeading` (`tone="dark"` on ocean backgrounds) |
| Image with skeleton + fade-in | `ShimmerImage` with `useImageReadiness` |
| Preload images before they scroll in | `usePreloadWhenNear` (or `preloadImage` with the same `sizes` as the `<Image>`) |
| Link to the Airbnb listing | `AirbnbLink` |
| Carousel/gallery index maths | `wrapIndex` |
| Pause timers / loops when unseen | `useIsActive` |
| Branch rendering on reduced motion | `usePrefersReducedMotion` (hydration-safe) |
| Swipe, scroll lock, tab keyboard support | `useSwipe`, `useLockBodyScroll`, `handleTablistKeyDown` |

## Design System

### Color tokens (use these, never hardcode hex)

| Token | Hex | Usage |
|---|---|---|
| `sand-light` | `#F5F0E8` | Primary backgrounds, cards |
| `sand` | `#E8DFD0` | Secondary backgrounds, image placeholders |
| `sand-dark` | `#C4B8A5` | Borders, dividers |
| `ocean-light` | `#E6F2F5` | Accent backgrounds |
| `ocean` | `#1E4D5C` | Body text (`/75` on white, `/80` on sand for AA), navigation |
| `ocean-deep` | `#0D2B33` | Headings, dark sections, overlays |
| `coral` / `coral-dark` | `#E07A5F` / `#C96A52` | Booking CTAs (`CTA_GRADIENT`), highlights |
| `rust` | `#A8472A` | Text accents on light backgrounds: eyebrows, italic heading accents, active states |
| `peach` | `#F0A98C` | Text accents and CTAs on `ocean-deep` |

Text must meet WCAG AA (4.5:1). Hex values live only in `tailwind.config.js` and `app/globals.css`.

### Typography
- `font-display` (Playfair Display) — headings; pattern: regular-weight lead + `<em>` accent (via `SectionHeading`)
- `font-sans` (Inter) — body text and UI

### Utilities (`app/globals.css` / `tailwind.config.js`)
- `glass-effect` — translucent glass button background
- `animate-blur-fade-in` — CSS twin of `BlurFade`; use for above-the-fold reveals so LCP text paints without JS
- `animate-skeleton-shimmer`

## Magic UI Integration

**Selection hierarchy:** Magic UI → shadcn/ui (form controls) → Framer-style `motion/react` wrappers → custom component.

```bash
npx shadcn@latest add "https://magicui.design/r/[component-name].json"
```

Installed and in use: `BlurFade` (scroll reveals below the fold, `inView`), `TextAnimate` (hero title), `ShimmerButton` (CTAs), `NumberTicker`, `Particles`, `DotPattern` (static `<pattern>` rewrite — don't reinstall over it). Delete components that end up unused.

**Stagger pattern:** `BASE_DELAY = 0.2`, `STAGGER_DELAY = 0.1` → `<BlurFade delay={BASE_DELAY + STAGGER_DELAY * index} inView>`.

**Motion:** import from `motion/react` only (never `framer-motion`). `MotionProvider` sets `reducedMotion="user"` globally.

## Performance Rules

- `next/image` for every image with accurate `sizes`; `priority` only above the fold
- Never render per-element motion components for large decorative grids — prefer CSS/SVG
- Above-the-fold content must not depend on JS to become visible
- Autoplay timers and animation loops pause when unseen (`useIsActive`) and under reduced motion
- Keep source photos ≤2048px (run `scripts/optimize-images.sh`)

## Code Conventions

- `'use client'` only when needed (state, effects, event handlers); sections without hooks stay server components
- `const` arrow components and functions, not `function` declarations (vendored `components/ui` excepted)
- Event handlers prefixed with `handle`
- TypeScript interfaces/types for props and data
- `cn()` for conditional classes — no inline styles except dynamic values (transforms, animation timing)
- Early returns over nesting; no dead code — remove unused components, exports, CSS and dependencies
- Comments: at most one line, only for non-obvious *why*

## Accessibility

- Native `<button>`/`<a>` for interactions (no duplicate key handlers needed); `onKeyDown` only for custom widgets (e.g. tablists)
- Visible focus styles (`focus-visible:ring-*`), `aria-label` on icon-only controls, touch targets ≥44px
- Semantic HTML: one `<h1>` (hero), sequential headings, `<main id="main">` with skip link
- `next/image` with descriptive `alt` (empty for decorative)
- Respect `prefers-reduced-motion` (CSS `motion-reduce:`, `MotionProvider`, `usePrefersReducedMotion`)
