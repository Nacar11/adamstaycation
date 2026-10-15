// Reveal stagger (CLAUDE.md pattern)
export const BASE_DELAY = 0.2
export const STAGGER_DELAY = 0.1

// `sizes` must match between <Image> and preloadImage so preloads hit the same cached variant
export const HIGHLIGHT_SIZES = '(max-width: 768px) 100vw, 50vw'
export const ABOUT_GRID_SIZES = '(max-width: 1024px) 50vw, 25vw'
export const RESORT_SIZES = '(max-width: 1024px) 100vw, 42vw'
export const GALLERY_MAIN_SIZES = '(max-width: 1024px) 100vw, 1000px'
export const GALLERY_THUMB_SIZES = '(max-width: 1024px) 80px, 185px'
export const LIGHTBOX_SIZES = '100vw'

// Preload / autoplay cadence (ms)
export const RESORT_AUTOPLAY_INTERVAL = 4000
export const RESORT_PREFETCH_STAGGER = 250
export const GALLERY_PREFETCH_START_DELAY = 800
export const GALLERY_PREFETCH_STAGGER = 400
