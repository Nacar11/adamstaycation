import { type RefObject, useSyncExternalStore } from 'react'
import { useInView } from 'motion/react'

const subscribeToVisibility = (onChange: () => void) => {
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
}

const getIsDocumentVisible = () => document.visibilityState === 'visible'

// True while the element is on screen and the tab is visible — gate timers and animation loops on it
export const useIsActive = (ref: RefObject<Element>) => {
    const isInView = useInView(ref)
    const isDocumentVisible = useSyncExternalStore(subscribeToVisibility, getIsDocumentVisible, () => true)
    return isInView && isDocumentVisible
}
