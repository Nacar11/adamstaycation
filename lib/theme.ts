/**
 * Colour values for components that take colours as props (e.g. ShimmerButton) instead of classes.
 * Built from the CSS custom properties in app/globals.css — never hard-code hex here.
 */

// Primary booking CTA fill (coral → coral-dark)
export const CTA_GRADIENT = 'linear-gradient(135deg, var(--coral) 0%, var(--coral-dark) 100%)'

// Subtle white shimmer sweep for coral CTAs
export const CTA_SHIMMER = 'rgb(255 255 255 / 0.2)'

// Peach shimmer sweep for the rust CTA in the Host section
export const RUST_CTA_SHIMMER = 'rgb(240 169 140 / 0.35)'
