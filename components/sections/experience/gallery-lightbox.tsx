'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageShimmer } from '@/components/ui/image-shimmer'
import { cn, wrapIndex } from '@/lib/utils'
import { preloadImage } from '@/lib/preload-image'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll'
import { useSwipe } from '@/lib/hooks/use-swipe'
import type { GalleryImage } from './data'
import { LIGHTBOX_SIZES } from './constants'

const GLASS_BUTTON =
    'flex items-center justify-center rounded-full border border-sand-light/20 bg-white/10 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach'

interface GalleryLightboxProps {
    open: boolean
    title: string
    images: GalleryImage[]
    index: number
    onIndexChange: (index: number) => void
    onClose: () => void
}

// Fullscreen photo viewer built on the native <dialog> (top layer, focus containment, Esc to close)
const GalleryLightbox = ({ open, title, images, index, onIndexChange, onClose }: GalleryLightboxProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { isLoaded, markLoaded } = useImageReadiness()

    const total = images.length
    const image = images[index]
    const handlePrev = () => onIndexChange(wrapIndex(index - 1, total))
    const handleNext = () => onIndexChange(wrapIndex(index + 1, total))
    const swipeHandlers = useSwipe(handleNext, handlePrev)

    useLockBodyScroll(open)

    useEffect(() => {
        const dialog = dialogRef.current
        if (open && !dialog?.open) dialog?.showModal()
        if (!open && dialog?.open) dialog.close()
    }, [open])

    // Native Esc (cancel → close) routes through onClose too
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        dialog.addEventListener('close', onClose)
        return () => dialog.removeEventListener('close', onClose)
    }, [onClose])

    useEffect(() => {
        if (!open || total < 2) return
        ;[1, -1].forEach((step) => {
            const neighbour = images[wrapIndex(index + step, total)]
            preloadImage(neighbour.src, LIGHTBOX_SIZES, () => markLoaded(neighbour.src))
        })
    }, [open, images, index, total, markLoaded])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault()
            handleNext()
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            handlePrev()
        }
    }

    // Clicking the empty stage around the photo closes the viewer
    const handleStageClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <dialog
            ref={dialogRef}
            aria-label={`${title} photos`}
            aria-modal="true"
            onKeyDown={handleKeyDown}
            className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-sand-light backdrop:bg-ocean-deep/[0.98] backdrop:backdrop-blur-md"
        >
            {open && (
                <div className="relative flex h-full w-full flex-col" {...swipeHandlers}>
                    <div className="flex items-center justify-between gap-4 px-4 pt-4 md:px-8 md:pt-6">
                        <p className="text-sm md:text-base">
                            <span className="font-display text-lg md:text-xl">{title}</span>
                            <span className="ml-3 text-sand-light/75 tabular-nums" aria-live="polite">
                                {index + 1} / {total}
                            </span>
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            autoFocus
                            aria-label="Close full screen gallery"
                            className={cn(GLASS_BUTTON, 'h-11 w-11 flex-shrink-0')}
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="relative flex-1 px-4 py-4 md:px-24 md:py-6" onClick={handleStageClick}>
                        <div className="pointer-events-none relative h-full w-full">
                            <ImageShimmer tone="dark" visible={!isLoaded(image.src)} className="rounded-xl" />
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={image.src}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={isLoaded(image.src) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes={LIGHTBOX_SIZES}
                                        className="object-contain"
                                        onLoad={() => markLoaded(image.src)}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {total > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    aria-label="Previous photo"
                                    className={cn(GLASS_BUTTON, 'absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 md:left-6')}
                                >
                                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    aria-label="Next photo"
                                    className={cn(GLASS_BUTTON, 'absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 md:right-6')}
                                >
                                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </>
                        )}
                    </div>

                    <p className="px-4 pb-5 text-center text-sm text-sand-light/75 md:pb-8">{image.alt}</p>
                </div>
            )}
        </dialog>
    )
}

export default GalleryLightbox
