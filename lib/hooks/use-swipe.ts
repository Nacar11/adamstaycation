import { useRef, type TouchEvent } from 'react'

const SWIPE_THRESHOLD = 50

// Horizontal swipe handlers: spread the result onto the touch target
export const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
    const startX = useRef(0)

    return {
        onTouchStart: (e: TouchEvent) => {
            startX.current = e.touches[0].clientX
        },
        onTouchEnd: (e: TouchEvent) => {
            const deltaX = e.changedTouches[0].clientX - startX.current
            if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
            if (deltaX < 0) onSwipeLeft()
            else onSwipeRight()
        },
    }
}
