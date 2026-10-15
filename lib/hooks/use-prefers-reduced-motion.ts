import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (onChange: () => void) => {
    const media = window.matchMedia(QUERY)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

// The server can't know the OS setting — render "motion allowed" there, then correct after hydration
const getServerSnapshot = () => false

/**
 * Hydration-safe `prefers-reduced-motion` check that also reacts to live OS setting changes.
 * Use this (not motion's `useReducedMotion`) when the value changes what gets rendered.
 */
export const usePrefersReducedMotion = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
