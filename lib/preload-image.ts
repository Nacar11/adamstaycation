import { getImageProps } from 'next/image'

const requested = new Set<string>()

/**
 * Warms the browser cache with the exact variant `next/image` will request for the same `src` + `sizes`,
 * so switching to it later paints from cache instead of hitting the network.
 */
export const preloadImage = (src: string, sizes: string, onLoad?: () => void) => {
    if (typeof window === 'undefined') return

    const key = `${src}|${sizes}`
    if (requested.has(key)) return
    requested.add(key)

    const { props } = getImageProps({ src, alt: '', fill: true, sizes })
    const img = new window.Image()
    if (onLoad) img.onload = onLoad
    img.onerror = () => requested.delete(key)
    if (props.sizes) img.sizes = props.sizes
    if (props.srcSet) img.srcset = props.srcSet
    img.src = props.src
}
