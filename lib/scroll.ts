// Scrolls to an id or #selector — smooth unless the visitor prefers reduced motion
export const scrollToTarget = (target: string) => {
    const element = document.querySelector(target.startsWith('#') ? target : `#${target}`)
    if (!element) return false

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    return true
}
