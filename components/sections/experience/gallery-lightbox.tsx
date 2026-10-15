'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageShimmer } from '@/components/ui/image-shimmer'
import { cn } from '@/lib/utils'
import { preloadImage } from '@/lib/preload-image'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import type { GalleryImage } from './data'
import { LIGHTBOX_SIZES } from './constants'

const SWIPE_THRESHOLD = 50

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
    const touchStartX = useRef(0)
    const { isLoaded, markLoaded } = useImageReadiness()

    const total = images.length
    const image = images[index]
    const imageKey = `lightbox:${image.src}`

    const handlePrev = () => onIndexChange((index - 1 + total) % total)
    const handleNext = () => onIndexChange((index + 1) % total)

    // Sync the dialog with `open`; lock page scroll while it's showing
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
        if (!open) return

        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = overflow
        }
    }, [open])

    // Esc (native `cancel` → `close`) and form-less closes all route through onClose
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        dialog.addEventListener('close', onClose)
        return () => dialog.removeEventListener('close', onClose)
    }, [onClose])

    // Preload neighbours so ←/→ and swipes paint instantly
    useEffect(() => {
        if (!open || total < 2) return
        ;[1, -1].forEach((step) => {
            const neighbour = images[(index + step + total) % total]
            preloadImage(neighbour.src, LIGHTBOX_SIZES, () => markLoaded(`lightbox:${neighbour.src}`))
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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
        if (deltaX < 0) handleNext()
        else handlePrev()
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
                <div className="relative flex h-full w-full flex-col" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    {/* Top bar: caption + counter, close */}
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
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-sand-light/20 bg-white/10 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Stage */}
                    <div className="relative flex-1 px-4 py-4 md:px-24 md:py-6" onClick={handleStageClick}>
                        <div className="pointer-events-none relative h-full w-full">
                            <ImageShimmer tone="dark" visible={!isLoaded(imageKey)} className="rounded-xl" />
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={image.src}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={isLoaded(imageKey) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
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
                                        onLoad={() => markLoaded(imageKey)}
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
                                    className={cn(
                                        "absolute left-2 top-1/2 -translate-y-1/2 md:left-6",
                                        "flex h-12 w-12 items-center justify-center rounded-full border border-sand-light/20 bg-white/10 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach"
                                    )}
                                >
                                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    aria-label="Next photo"
                                    className={cn(
                                        "absolute right-2 top-1/2 -translate-y-1/2 md:right-6",
                                        "flex h-12 w-12 items-center justify-center rounded-full border border-sand-light/20 bg-white/10 transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach"
                                    )}
                                >
                                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Alt text as a visible caption */}
                    <p className="px-4 pb-5 text-center text-sm text-sand-light/75 md:pb-8">{image.alt}</p>
                </div>
            )}
        </dialog>
    )
}

export default GalleryLightbox
