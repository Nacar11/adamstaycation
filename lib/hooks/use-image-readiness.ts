import { useCallback, useEffect, useRef, useState } from 'react'

// Tracks loaded image keys for shimmer placeholders; loadedRef is for reads inside timers
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
