# Implementation Plan: Frontend Optimization Pass (Audit Tiers 1–3)

## Overview

A professional hardening pass on Adam's Staycation with **no intentional visual redesign**. It covers all 13 audit findings: build/lint safety net, bundle de-duplication, SEO (h1, metadata, sitemap, structured data), image weight, reduced-motion and runtime efficiency, accessibility (contrast, skip link, keyboard gallery), and maintainability (splitting the 1,160-line experience section, colour tokens, real-user metrics).

Source audit items → tasks:

| Audit # | Item | Task |
|---|---|---|
| 5 | Build + lint broken | T1 |
| 4 | Two animation libraries | T2 |
| 11 | `experience-section.tsx` too large | T3, T4 |
| 1 | No `<h1>` | T5 |
| 2 | Metadata / OG / sitemap / robots / JSON-LD | T6, T7 |
| 3 | 543 MB of original photos | T8 |
| 6 | Reduced motion + hero pause control | T9, T10 |
| 7 | Off-screen / hidden-tab animation work | T11 |
| 8 | Low-contrast labels | T12 |
| 9 | Skip link, zoom cursor, gallery keyboard nav | T13 |
| 10 | `min-h-screen` on mobile | T14 |
| 12 | Hard-coded hex colours | T15 |
| 13 | Speed Insights | T16 |
| 9+ | Fullscreen gallery lightbox (your request) | T17 |

## Architecture Decisions

- **Safety net first.** No tests exist, so `npm run build`, `npm run lint`, and `tsc` are the only automated guards. T1 makes them run green before anything else changes.
- **One animation runtime: `motion/react`.** Magic UI components already use `motion` v12; the three files on `framer-motion` v11 migrate to it and `framer-motion` is removed. The APIs are the same.
- **Refactor before polish.** Splitting `experience-section.tsx` (T3–T4) happens early, so the later a11y and runtime tasks touch small focused files instead of one 1,160-line file. It's a pure refactor, verified by before/after screenshots.
- **Shared hooks instead of per-section logic:**
  - `useImageReadiness`: the existing `loadedImages`/`markImageLoaded` logic, extracted in T4.
  - `useIsActive(ref)`: in view **and** tab visible, added in T11.
  - Reduced motion: `<MotionConfig reducedMotion="user">` at the root, plus motion's `useReducedMotion()` where JS timers are involved (T9).
- **SEO data lives in one place.** `SITE_URL = 'https://adamstaycation.business'` and listing facts go in `lib/constants.ts`, and are consumed by metadata, sitemap, robots and JSON-LD.
- **Lightbox uses the native `<dialog>` element** (`showModal()`), with no new dependency. It provides the top layer, focus containment, Esc-to-close and `::backdrop` for free. Motion comes from `motion/react` and respects reduced motion.
- **Image compression is done with macOS `sips`** (no new dependency): long edge 2560px, JPEG quality about 80. Originals stay recoverable from git history. The unused `.mp4` stays, per your decision.
- **Verification without a test suite:** headless-Chrome CDP scripts (already used this session) for DOM, contrast and behaviour checks, Lighthouse CLI for SEO/a11y scores, and screenshots at 1440px and 390px.
- **Commits:** one commit per task on `main`. Push to `origin main` (which deploys) only at checkpoints, after review.

## Dependency Graph

```
T0 commit pending amenity-centering change
 │
T1 build + lint green ─────────────┬──────────────────────────────┐
 │                                 │                              │
T2 unify motion lib                │                              │
 │                                 │                              │
T3 split experience (static) ── T4 split experience (stateful + useImageReadiness)
 │                                                                 │
 ├── T5 h1 + heading order                                         │
 ├── T6 metadata/OG/sitemap/robots ── T7 JSON-LD (needs SITE_URL)  │
 ├── T8 compress images (independent; affects blur + OG crop)      │
 │                                                                 │
 └── T9 reduced motion ── T10 hero pause control                   │
      └── T11 useIsActive (hero, resort, particles) ◄──────────────┘
           T12 contrast · T13 skip link + gallery keyboard · T14 svh
                │
           T17 fullscreen lightbox (needs T4, T9, T13)
                │
           T15 colour tokens · T16 Speed Insights
```

## Task List

### Phase 0: Clean start

#### Task 0: Commit the pending "Everything Included" centering change
**Description:** The working tree has the uncommitted `w-max mx-auto` amenity-row change. Commit it so the plan starts from a clean tree.

**Acceptance criteria:**
- [ ] `git status` is clean
- [ ] Commit message describes the centering behaviour

**Verification:** `git status --short` prints nothing.

**Dependencies:** None · **Files:** `components/sections/experience-section.tsx` · **Scope:** XS

---

### Phase 1: Safety net

#### Task 1: Make `build` and `lint` run green
**Description:** Exclude the `ui-ux-pro-max-skill/` git submodule from TypeScript so `next build` stops type-checking it. Add `.eslintrc.json` (`next/core-web-vitals`) so `next lint` runs non-interactively. Fix any lint errors it surfaces; the likely ones are `<img>` warnings and hook dependency arrays.

**Acceptance criteria:**
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` runs without prompting and exits 0
- [ ] The baseline "First Load JS" for `/` is recorded in the commit message

**Verification:** run `npm run build && npm run lint`, and check that `tsc --noEmit` reports 0 errors.

**Dependencies:** T0 · **Files:** `tsconfig.json`, `.eslintrc.json` (new), plus small fixes in any file lint flags · **Scope:** S

#### Task 2: Use one animation library (`motion/react`)
**Description:** Change the `framer-motion` imports in `navbar.tsx`, `experience-section.tsx` and `page-loader.tsx` to `motion/react`, then uninstall `framer-motion`.

**Acceptance criteria:**
- [ ] `grep -r "framer-motion" components app lib` returns nothing, and `package.json` no longer lists it
- [ ] "First Load JS" for `/` is lower than the T1 baseline
- [ ] Navbar, page loader, gallery switching and pill animations behave the same

**Verification:** compare build output with T1. Manually check that the mobile menu opens and closes, the gallery tabs switch, and the loader appears on a throttled load.

**Dependencies:** T1 · **Files:** `components/shared/navbar.tsx`, `components/shared/page-loader.tsx`, `components/sections/experience-section.tsx`, `package.json`, `package-lock.json` · **Scope:** S

### ✅ Checkpoint 1: Foundation
- [ ] `build`, `lint` and `tsc` are all green
- [ ] The bundle-size reduction from T2 is recorded
- [ ] Review with you, then push

---

### Phase 2: Restructure (pure refactor, no visual change)

#### Task 3: Split the static parts of the experience section
**Description:** Move the data arrays (highlights, amenities, safety, room specs, gallery groups, resort images, about grid) to `components/sections/experience/data.ts`. Extract `ExperienceHighlights`, `DitaAbout` and `EssentialsStrip` into `components/sections/experience/`. `experience-section.tsx` becomes a thin composer.

**Acceptance criteria:**
- [ ] Every extracted component is under about 250 lines, and `experience-section.tsx` gets much shorter
- [ ] Pixel-equivalent screenshots of those three areas at 1440px and 390px
- [ ] `build`, `lint` and `tsc` are green

**Verification:** take before/after screenshots with the CDP script and compare them side by side.

**Dependencies:** T2 · **Files:** `experience-section.tsx`, `experience/data.ts`, `experience/highlights.tsx`, `experience/dita-about.tsx`, `experience/essentials-strip.tsx` · **Scope:** M

#### Task 4: Split the stateful parts and extract `useImageReadiness`
**Description:** Extract `ResortAccess` (carousel, autoplay, preloading) and `PhotoGallery` (tabs, pills, main image, thumbnail strip, prefetching) into their own files. Move the `loadedImages`/`markImageLoaded` logic into a `useImageReadiness()` hook in `lib/hooks/`, so each section keeps its own readiness state.

**Acceptance criteria:**
- [ ] `experience-section.tsx` is under about 60 lines and only composes the subsections
- [ ] Gallery switching, prefetching, shimmer, autoplay that waits for readiness, and active-thumbnail scrolling all still work
- [ ] `build`, `lint` and `tsc` are green

**Verification:** re-run the earlier CDP scripts. The cached category switch should take about 30ms, autoplay should step through positions 0 to 5, and the shimmer should appear on a throttled load.

**Dependencies:** T3 · **Files:** `experience-section.tsx`, `experience/resort-access.tsx`, `experience/photo-gallery.tsx`, `lib/hooks/use-image-readiness.ts` · **Scope:** M

### ✅ Checkpoint 2: Structure
- [ ] Screenshots match the pre-refactor baseline
- [ ] All behaviour scripts pass
- [ ] Review with you, then push

---

### Phase 3: SEO and asset weight

#### Task 5: Semantic `<h1>` and heading order
**Description:** Render the hero title "Adam's Staycation" as `<h1>` using `TextAnimate as="h1"`. Change the gallery caption from `<h4>` to `<p>` so heading levels don't skip.

**Acceptance criteria:**
- [ ] The page has exactly one `<h1>`, and it's in the server HTML
- [ ] The heading outline has no skipped levels (h1 → h2 → h3)
- [ ] No visual change

**Verification:** `curl localhost:3000 | grep -c "<h1"` returns 1. Dump the heading outline with CDP.

**Dependencies:** T4 · **Files:** `landing-section.tsx`, `experience/photo-gallery.tsx` · **Scope:** XS

#### Task 6: Metadata, share image, sitemap and robots
**Description:** Add `SITE_URL` to `lib/constants.ts`. In `app/layout.tsx`, set `metadataBase`, the canonical URL, Open Graph and Twitter images, and a `viewport` export with `themeColor`. Generate a 1200×630 `public/og-image.jpg` from the hero photo with `sips`. Add `app/sitemap.ts` and `app/robots.ts`. Align the title and description with the CLAUDE.md SEO template.

**Acceptance criteria:**
- [ ] `/sitemap.xml` and `/robots.txt` return 200 and point to `SITE_URL`
- [ ] Rendered `<head>` has absolute `og:image`, `og:url` and `canonical` values
- [ ] A link-preview check (for example opengraph.xyz, run after deploy) shows the image card

**Verification:** use `curl` on `/sitemap.xml`, `/robots.txt` and `/`, then grep the meta tags.

**Dependencies:** T1 (domain resolved: `https://adamstaycation.business`) · **Files:** `lib/constants.ts`, `app/layout.tsx`, `app/sitemap.ts` (new), `app/robots.ts` (new), `public/og-image.jpg` (new) · **Scope:** M

#### Task 7: Structured data for the listing (JSON-LD)
**Description:** Add a server-rendered `<script type="application/ld+json">` with `VacationRental` (or `LodgingBusiness`) schema: name, address (Tambuli Seaside Living, Lapu-Lapu City, Cebu, PH), geo coordinates (from the existing Maps link), images, amenities, occupancy (3 guests, 1 bed, 35 sqm), and a `sameAs` link to the Airbnb listing. Facts are pulled from constants and data, not duplicated.

**Acceptance criteria:**
- [ ] The JSON-LD is valid and in the server HTML
- [ ] Google's Rich Results Test or the Schema.org validator reports no errors

**Verification:** paste the rendered JSON into validator.schema.org (or run the Rich Results Test against the deployed URL).

**Dependencies:** T6 · **Files:** `app/page.tsx` or `components/shared/structured-data.tsx` (new), `lib/constants.ts` · **Scope:** S

#### Task 8: Compress original photos
**Description:** Add `scripts/optimize-images.sh`. It uses `sips` to cap each JPEG at 2560px on the long edge at about 80% quality, skips files that are already small, and leaves the `.mp4` untouched. Run it once over `public/images/` and commit the smaller files.

**Acceptance criteria:**
- [ ] `public/images` (excluding the `.mp4`) drops from about 495MB to under about 60MB, with no single JPEG over about 1MB
- [ ] Spot-check of hero, gallery and portrait photos at 1440px shows no visible quality loss
- [ ] The build still generates blur placeholders, and all image paths are unchanged

**Verification:** compare `du -sh public/images` before and after, run `find public/images -name '*.jpg' -size +1M` (expect none), and compare screenshots.

**Dependencies:** T1 (independent of the other tasks, so it can run in parallel) · **Files:** `scripts/optimize-images.sh` (new), about 63 photos in `public/images/**` · **Scope:** M (one script, many binary files)

### ✅ Checkpoint 3: SEO and weight
- [ ] Lighthouse SEO score ≥ 95 (`npx lighthouse http://localhost:3000 --only-categories=seo` against `next start`)
- [ ] Image weight target met
- [ ] Review with you, then push (production deploy)

---

### Phase 4: Accessibility and runtime efficiency

#### Task 9: Respect reduced motion everywhere
**Description:** Wrap the app in `<MotionConfig reducedMotion="user">`. When reduced motion is on:
- disable the hero zoom effect and the hero and resort autoplay
- don't render `Particles`
- gate `scroll-behavior: smooth` in `globals.css` behind `prefers-reduced-motion: no-preference`

**Acceptance criteria:**
- [ ] With `prefers-reduced-motion: reduce` emulated: no zoom effect, no autoplay advance in 15s, no particles canvas, and anchor jumps are instant
- [ ] Without emulation, behaviour is unchanged

**Verification:** a CDP script with `Emulation.setEmulatedMedia({features:[{name:'prefers-reduced-motion',value:'reduce'}]})` checks the slide positions and confirms the canvas is absent.

**Dependencies:** T4 · **Files:** `app/layout.tsx` or `components/shared/providers.tsx` (new), `landing-section.tsx`, `experience/resort-access.tsx`, `app/globals.css` · **Scope:** M

#### Task 10: Pause/play control for the hero slideshow
**Description:** Add a small play/pause button next to the hero progress bar to meet WCAG 2.2.2. It's keyboard-focusable, has an `aria-label` and `aria-pressed`, and when paused it freezes both the slide timer and the progress bar.

**Acceptance criteria:**
- [ ] Pausing stops slide changes, and resuming continues them
- [ ] The button has a visible focus ring, a touch target of at least 44×44px, and a correct `aria-pressed` state

**Verification:** with a CDP click, the position stays the same for 10s while paused. Do a manual keyboard pass.

**Dependencies:** T9 · **Files:** `landing-section.tsx` · **Scope:** S

#### Task 11: Pause work when it's off-screen or the tab is hidden
**Description:** Add a `useIsActive(ref)` hook (in view and `document.visibilityState === 'visible'`). Use it to pause the hero interval, the resort autoplay and the `Particles` animation loop when they're not visible.

**Acceptance criteria:**
- [ ] With the hero scrolled out of view, its slide index doesn't advance
- [ ] With the tab hidden, no animation-loop callbacks or interval ticks fire
- [ ] Everything resumes on return

**Verification:** a CDP script reads the slide indexes after scrolling away and after `Page.setWebLifecycleState({state:'frozen'})` or a visibility toggle. A Performance-panel trace shows no animation-loop work while off-screen.

**Dependencies:** T9 · **Files:** `lib/hooks/use-is-active.ts` (new), `landing-section.tsx`, `experience/resort-access.tsx`, `components/ui/particles.tsx` · **Scope:** M

#### Task 12: Fix low-contrast text
**Description:** Raise the faint text to WCAG AA: the "Everything Included" and "Safety" labels, the safety items, the separator dots (decorative and `aria-hidden`, so exempt), the "Room Specifications" label, and the spec captions on the image overlay. Use the smallest opacity increase that passes, so the look stays the same.

**Acceptance criteria:**
- [ ] Every non-decorative text node is at least 4.5:1 (or 3:1 for large text) against its rendered background
- [ ] Visually still reads as muted, secondary text

**Verification:** a CDP script computes contrast for each changed node. Spot-check with a Lighthouse a11y run.

**Dependencies:** T3 · **Files:** `experience/essentials-strip.tsx`, `experience/dita-about.tsx` · **Scope:** S

#### Task 13: Skip link, honest zoom cursor, and keyboard-friendly gallery tabs
**Description:**
- Add a "Skip to content" link that's visible on focus and targets `<main id="main">`.
- Leave the main photo's zoom cursor alone; T17 makes it open a real lightbox.
- Give the group tabs and category pills a roving `tabIndex` with ←/→/Home/End keys, `aria-controls` linking to the panel, and a matching panel `id`.

**Acceptance criteria:**
- [ ] The first Tab press shows "Skip to content", and Enter moves focus to `<main>`
- [ ] Arrow keys move between tabs and activate them, and only the active tab is in the Tab order
- [ ] The tab and pill keyboard pattern is ready for T17 to reuse

**Verification:** a CDP keyboard script using `Input.dispatchKeyEvent` checks `document.activeElement` and `aria-selected`.

**Dependencies:** T4 · **Files:** `app/page.tsx`, `components/shared/navbar.tsx` or `app/layout.tsx`, `experience/photo-gallery.tsx` · **Scope:** M

#### Task 14: Stable mobile viewport height
**Description:** Change the hero's (and page `main`'s) `min-h-screen` to `min-h-svh`, so the hero doesn't jump when mobile Safari's address bar hides and shows.

**Acceptance criteria:**
- [ ] The hero fills the small viewport at 390×844, and desktop looks the same

**Verification:** take screenshots at 390px and 1440px.

**Dependencies:** T1 · **Files:** `landing-section.tsx`, `app/page.tsx` · **Scope:** XS

#### Task 17: Fullscreen gallery lightbox
**Description:** Clicking the main gallery photo, or pressing Enter/Space on it (it becomes a real `<button>` with an `aria-label`), opens a fullscreen lightbox for the current category. It's built on the native `<dialog>`.

Inside it:
- the full-resolution photo (`next/image`, `sizes="100vw"`, `object-contain`) on a dark ocean backdrop
- a caption and "n / total" counter
- prev/next buttons, ←/→ keys, swipe on touch, and a close button plus Esc
- neighbouring photos preloaded through `preloadImage`, with the dark `ImageShimmer` while a photo loads
- page scroll locked while it's open

On close, focus returns to the trigger and the gallery stays on the last photo you viewed.

**Acceptance criteria:**
- [ ] Opens from click, Enter or Space, and closes with Esc, the close button or a backdrop click. Focus is contained while it's open and returns to the main photo afterwards.
- [ ] ←/→, the buttons and swipe all navigate with wrap-around, and the gallery index matches the lightbox on close
- [ ] Reduced motion means no zoom or slide transitions, touch targets are at least 44px, and the dialog has `aria-label` and `aria-modal` set

**Verification:** a CDP script opens it with Enter, presses → twice, then Esc, and checks `document.activeElement`, the counter text and the gallery index. Screenshots at 1440px and 390px. A mobile swipe check by emulating touch with `Input.dispatchTouchEvent`.

**Dependencies:** T4, T9, T13 · **Files:** `experience/gallery-lightbox.tsx` (new), `experience/photo-gallery.tsx` · **Scope:** M

### ✅ Checkpoint 4: Accessibility and runtime
- [ ] Lighthouse Accessibility ≥ 95, and still ≥ 95 for SEO
- [ ] Reduced-motion, keyboard and off-screen scripts all pass
- [ ] Manual keyboard-only walkthrough of the whole page
- [ ] Review with you, then push

---

### Phase 5: Maintainability and monitoring

#### Task 15: Replace hard-coded hex with colour tokens
**Description:** Replace the raw hex values (the navbar and hero `ShimmerButton` gradients, the highlight `accentColor`, and Particles' `#ffffff`) with token-based values such as `var(--coral)` and `var(--ocean)`. Coral stays the booking/CTA colour. **Per Q3 (option B), the gallery's active category pill and active-thumbnail ring (fill, shadow, focus ring) move from coral to rust**, so they match the rust "Every detail." heading. Nothing else changes visually.

**Acceptance criteria:**
- [ ] `grep -rn "#[0-9A-Fa-f]\{6\}" components/sections components/shared` returns nothing (UI primitives excluded)
- [ ] Screenshots match the baseline everywhere except the gallery's active pill and thumbnail ring, which are now rust

**Verification:** run the grep and compare screenshots.

**Dependencies:** T4 · **Files:** `components/shared/navbar.tsx`, `landing-section.tsx`, `experience/data.ts`, `experience/highlights.tsx` · **Scope:** S

#### Task 16: Add Vercel Speed Insights
**Description:** Install `@vercel/speed-insights` and render `<SpeedInsights />` next to `<Analytics />`, so real-visitor page-speed numbers (LCP, INP, CLS) show up in the Vercel dashboard.

**Acceptance criteria:**
- [ ] The component is rendered in the layout and the build is green
- [ ] After deploy, Speed Insights collects data (Vercel dashboard → Speed Insights; you may need to enable it there)

**Verification:** `npm run build`, then check the dashboard after deploy.

**Dependencies:** T1 · **Files:** `app/layout.tsx`, `package.json` · **Scope:** XS

### ✅ Checkpoint 5: Complete
- [ ] Every acceptance criterion above is met
- [ ] Final Lighthouse run (Performance, Accessibility, Best Practices, SEO), compared with a baseline taken before T1
- [ ] Final push to `main`

## Parallelization

- **Independent, any time after T1:** T8 (images), T14 (svh), T16 (Speed Insights).
- **Strictly sequential:** T3 → T4, then everything that touches the split files (T5, T9–T13, T15). T9 → T10 and T9 → T11.
- One person working sequentially in the order above is the simplest route, since most tasks touch the same few files.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| The refactor (T3–T4) quietly breaks gallery or prefetch behaviour | High | Pure moves only, no logic changes. Re-run the existing CDP behaviour scripts and compare screenshots before committing. |
| Image compression visibly degrades photos | Medium | Cap at 2560px and quality 80 (more than any current `sizes` needs). Spot-check the hero and gallery. Originals stay in git history. |
| A large binary commit (T8) makes the repo heavier | Low | It's a one-time cost. History already holds the originals, and the new files are small. |
| Removing `framer-motion` changes animation timing | Low | Same API in `motion` v12. Manual check of the navbar, loader and gallery. |
| Lint (T1) surfaces many errors | Medium | Fix real issues. Disable rules inline, with a reason, only for intentional patterns (for example the shimmer `<img>`-less preload). |
| Wrong production domain in metadata or JSON-LD | High (SEO) | Blocked on Open Question 1. Kept in one `SITE_URL` constant. |

## Open Questions

1. ~~Production domain~~ → **resolved: `https://adamstaycation.business`**
2. ~~Gallery zoom~~ → **resolved: build a real fullscreen lightbox (T17)**
3. ~~Remaining coral~~ → **resolved: option B.** The gallery's active pill and thumbnail ring become rust; the booking buttons and other accents stay coral (T15).
