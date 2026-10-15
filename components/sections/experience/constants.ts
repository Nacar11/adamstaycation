// Shared reveal timing for the experience subsections (see CLAUDE.md stagger pattern)
export const BASE_DELAY = 0.2
export const STAGGER_DELAY = 0.1

// `sizes` strings — preloads must use the exact same value as the rendered <Image> to hit the cached variant
export const HIGHLIGHT_SIZES = '(max-width: 768px) 100vw, 50vw'
export const ABOUT_GRID_SIZES = '(max-width: 1024px) 50vw, 25vw'
export const RESORT_SIZES = '(max-width: 1024px) 100vw, 42vw'
export const GALLERY_MAIN_SIZES = '(max-width: 1024px) 100vw, 1000px'
export const GALLERY_THUMB_SIZES = '(max-width: 1024px) 80px, 185px'

// Preloading / autoplay cadence
export const NEAR_VIEWPORT_MARGIN = '600px 0px'
export const RESORT_AUTOPLAY_INTERVAL = 4000
export const RESORT_PREFETCH_STAGGER = 250
export const GALLERY_PREFETCH_START_DELAY = 800
export const GALLERY_PREFETCH_STAGGER = 400
