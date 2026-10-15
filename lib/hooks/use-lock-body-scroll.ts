import { useEffect } from 'react'

// Locks page scroll while `locked` (overlays, dialogs)
export const useLockBodyScroll = (locked: boolean) => {
    useEffect(() => {
        if (!locked) return
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = overflow
        }
    }, [locked])
}
