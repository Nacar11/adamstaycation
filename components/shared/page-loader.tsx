'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

interface PageLoaderProps {
    visible: boolean
}

// Branded fallback for slow connections only — the parent decides when it's needed
const PageLoader = ({ visible }: PageLoaderProps) => {
    const prefersReducedMotion = useReducedMotion()

    // Lock page scroll while the loader covers the viewport
    useEffect(() => {
        if (!visible) return
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = overflow
        }
    }, [visible])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="page-loader"
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-ocean-deep px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
                    role="status"
                    aria-live="polite"
                    aria-label="Loading Adam's Staycation"
                >
                    <p className="font-display text-sand-light text-3xl md:text-4xl tracking-tight text-center">
                        Adam&apos;s <em className="text-peach">Staycation</em>
                    </p>

                    <div className="w-40 h-[2px] rounded-full bg-sand-light/15 overflow-hidden" aria-hidden="true">
                        <motion.div
                            className="h-full w-1/3 rounded-full bg-peach"
                            initial={{ x: '-100%' }}
                            animate={prefersReducedMotion ? { x: '100%' } : { x: ['-100%', '300%'] }}
                            transition={
                                prefersReducedMotion
                                    ? { duration: 0 }
                                    : { duration: 1.4, ease: 'easeInOut', repeat: Infinity }
                            }
                        />
                    </div>

                    <p className="text-sand-light/70 text-xs uppercase tracking-[0.22em]">
                        Preparing your stay
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PageLoader
