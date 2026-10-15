import { type RefObject, useEffect } from 'react'
import { useInView } from 'motion/react'
import { preloadImage } from '@/lib/preload-image'

export const NEAR_VIEWPORT_MARGIN = '600px 0px'

// Once `ref` is within 600px of the viewport, preloads `srcs` in order (`stagger` ms apart)
export const usePreloadWhenNear = (
    ref: RefObject<Element>,
    srcs: string[],
    sizes: string,
    onLoad: (src: string) => void,
    stagger = 0
) => {
    const isNear = useInView(ref, { once: true, margin: NEAR_VIEWPORT_MARGIN })

    useEffect(() => {
        if (!isNear) return
        const timers = srcs.map((src, i) =>
            window.setTimeout(() => preloadImage(src, sizes, () => onLoad(src)), i * stagger)
        )
        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [isNear, srcs, sizes, onLoad, stagger])
}
