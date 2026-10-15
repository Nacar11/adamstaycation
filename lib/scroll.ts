/**
 * Scrolls an element into view — smoothly, unless the visitor prefers reduced motion.
 * Accepts an element id ("experience") or a selector ("#experience").
 */
export const scrollToTarget = (target: string) => {
    const element = document.querySelector(target.startsWith('#') ? target : `#${target}`)
    if (!element) return false

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    return true
}
