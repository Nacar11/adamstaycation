import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (onChange: () => void) => {
    const media = window.matchMedia(QUERY)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

const getServerSnapshot = () => false

// Hydration-safe (server assumes motion allowed); use instead of motion's useReducedMotion when it changes markup
export const usePrefersReducedMotion = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
