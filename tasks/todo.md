# Todo: Frontend Optimization Pass

See `tasks/plan.md` for the description, acceptance criteria and verification for each task.

## Phase 0: Clean start
- [x] T0: Commit pending "Everything Included" centering change (XS)

## Phase 1: Safety net
- [x] T1: Make `build` + `lint` green (exclude skill submodule, add ESLint config, fix lint) (S)
- [x] T2: Use one animation library: `framer-motion` → `motion/react` (S)
- [x] ✅ Checkpoint 1: build/lint/tsc green, bundle delta recorded, review, push

## Phase 2: Restructure (no visual change)
- [x] T3: Split the static parts of the experience section + `data.ts` (M)
- [x] T4: Split `ResortAccess` + `PhotoGallery`, extract `useImageReadiness` (M)
- [x] ✅ Checkpoint 2: screenshots match, behaviour scripts pass, review, push

## Phase 3: SEO and asset weight
- [x] T5: Hero `<h1>` + heading order (XS)
- [x] T6: `metadataBase`, OG/Twitter image, canonical, viewport, `sitemap.ts`, `robots.ts` for `https://adamstaycation.business` (M)
- [x] T7: JSON-LD `VacationRental` structured data (S)
- [x] T8: Compress original photos with `sips` (long edge 2560px, quality about 80; keep the `.mp4`) (M)
- [x] ✅ Checkpoint 3: Lighthouse SEO ≥ 95, image weight target met, review, push

> Checkpoint 3 Lighthouse (desktop, local prod build): SEO 100 · A11y 97 (contrast → T12) · Best Practices 96 (only the local-only `/_vercel/insights` 404) · Performance 71 (TBT 460 ms, LCP 1.9 s, CLS 0)

## Phase 4: Accessibility and runtime
- [ ] T9: Reduced motion everywhere (`MotionConfig`, autoplay, zoom effect, particles, smooth scroll) (M)
- [ ] T10: Hero slideshow pause/play control (WCAG 2.2.2) (S)
- [ ] T11: `useIsActive`: pause hero, resort and particles when off-screen or the tab is hidden (M)
- [ ] T12: Raise low-contrast labels to WCAG AA (S)
- [ ] T13: Skip link + roving-tabindex gallery tabs (M)
- [ ] T14: `min-h-screen` → `min-h-svh` (XS)
- [ ] T17: Fullscreen gallery lightbox (native `<dialog>`, keys, swipe, focus return, preloading) (M)
- [ ] ✅ Checkpoint 4: Lighthouse A11y ≥ 95, keyboard and reduced-motion scripts pass, review, push

## Phase 5: Maintainability and monitoring
- [ ] T15: Replace hard-coded hex with tokens; gallery active pill and thumbnail ring → rust (Q3 = B) (S)
- [ ] T16: Add Vercel Speed Insights (XS)
- [ ] ✅ Checkpoint 5: all criteria met, final Lighthouse vs baseline, push

## Open questions (needed before the blocked tasks)
- [x] Q1: Production domain → `https://adamstaycation.business`
- [x] Q2: Build a real fullscreen lightbox (T17)
- [x] Q3: Option B: gallery active pill and thumbnail ring → rust, everything else stays coral
