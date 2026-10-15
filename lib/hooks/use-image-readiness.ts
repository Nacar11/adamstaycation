import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Tracks which images have finished loading (by an arbitrary key, e.g. `thumb:/images/a.jpg`)
 * so components can show shimmer placeholders and avoid revealing unloaded images.
 * `loadedRef` mirrors the set for use inside timers/intervals without re-subscribing.
 */
export const useImageReadiness = () => {
    const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set())
    const loadedRef = useRef(loaded)

    useEffect(() => {
        loadedRef.current = loaded
    }, [loaded])

    const markLoaded = useCallback((key: string) => {
        setLoaded((prev) => (prev.has(key) ? prev : new Set(prev).add(key)))
    }, [])

    const isLoaded = useCallback((key: string) => loaded.has(key), [loaded])

    return { isLoaded, markLoaded, loadedRef }
}
