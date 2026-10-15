'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { ImageShimmer } from '@/components/ui/image-shimmer'
import { cn } from '@/lib/utils'
import { preloadImage } from '@/lib/preload-image'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { allCategories, galleryGroups, type GalleryCategory } from './data'
import {
    BASE_DELAY,
    GALLERY_MAIN_SIZES,
    GALLERY_PREFETCH_START_DELAY,
    GALLERY_PREFETCH_STAGGER,
    GALLERY_THUMB_SIZES,
    NEAR_VIEWPORT_MARGIN,
    STAGGER_DELAY,
} from './constants'

// Photo gallery: group tabs → category pills → main image + thumbnail strip
const PhotoGallery = () => {
    const { isLoaded, markLoaded } = useImageReadiness()

    const [activeGroupId, setActiveGroupId] = useState(galleryGroups[0].id)
    const [activeCategory, setActiveCategory] = useState(galleryGroups[0].categories[0].id)
    const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>(
        Object.fromEntries(allCategories.map((cat) => [cat.id, 0]))
    )

    const activeGroup = galleryGroups.find((g) => g.id === activeGroupId) || galleryGroups[0]
    const activeGallery = activeGroup.categories.find((cat) => cat.id === activeCategory) || activeGroup.categories[0]
    const currentImageIndex = currentImageIndexes[activeCategory] || 0
    const currentImage = activeGallery.images[currentImageIndex]

    // ── Prefetching (keeps category/group switches instant) ──
    const isMainLoaded = isLoaded(`main:${currentImage.src}`)

    const prefetchCategory = useCallback((category: GalleryCategory) => {
        const [firstImage] = category.images
        if (firstImage) {
            preloadImage(firstImage.src, GALLERY_MAIN_SIZES, () => markLoaded(`main:${firstImage.src}`))
        }
        category.images.forEach((img) => {
            preloadImage(img.src, GALLERY_THUMB_SIZES, () => markLoaded(`thumb:${img.src}`))
        })
    }, [markLoaded])

    const handlePrefetchGroup = (groupId: string) => {
        const group = galleryGroups.find((g) => g.id === groupId)
        if (group) prefetchCategory(group.categories[0])
    }

    // Once the gallery is near the viewport, quietly warm every category in the background
    const galleryRef = useRef<HTMLDivElement>(null)
    const isGalleryNear = useInView(galleryRef, { once: true, margin: NEAR_VIEWPORT_MARGIN })

    useEffect(() => {
        if (!isGalleryNear) return
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        if (connection?.saveData) return

        const timers = allCategories.map((category, i) =>
            window.setTimeout(() => prefetchCategory(category), GALLERY_PREFETCH_START_DELAY + i * GALLERY_PREFETCH_STAGGER)
        )
        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [isGalleryNear, prefetchCategory])

    // Preload the neighbours of the current photo so prev/next/swipe paint instantly
    useEffect(() => {
        const { images } = activeGallery
        if (images.length < 2) return
        ;[1, -1].forEach((step) => {
            const neighbour = images[(currentImageIndex + step + images.length) % images.length]
            preloadImage(neighbour.src, GALLERY_MAIN_SIZES, () => markLoaded(`main:${neighbour.src}`))
        })
    }, [activeGallery, currentImageIndex, markLoaded])

    const handleNextImage = () => {
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [activeCategory]: (prev[activeCategory] + 1) % activeGallery.images.length,
        }))
    }

    const handlePrevImage = () => {
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [activeCategory]:
                (prev[activeCategory] - 1 + activeGallery.images.length) % activeGallery.images.length,
        }))
    }

    const handleDotClick = (index: number) => {
        setCurrentImageIndexes((prev) => ({
            ...prev,
            [activeCategory]: index,
        }))
    }

    const handleGroupChange = (groupId: string) => {
        if (groupId === activeGroupId) return
        setActiveGroupId(groupId)
        const group = galleryGroups.find((g) => g.id === groupId)
        if (group) {
            setActiveCategory(group.categories[0].id)
        }
    }

    // Keep the active thumbnail fully visible inside the strip (scrolls the strip only, never the page)
    const thumbStripRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const strip = thumbStripRef.current
        const thumb = strip?.children[currentImageIndex] as HTMLElement | undefined
        if (!strip || !thumb) return

        const stripRect = strip.getBoundingClientRect()
        const thumbRect = thumb.getBoundingClientRect()
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        strip.scrollBy({
            top: thumbRect.top + thumbRect.height / 2 - (stripRect.top + stripRect.height / 2),
            left: thumbRect.left + thumbRect.width / 2 - (stripRect.left + stripRect.width / 2),
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        })
    }, [currentImageIndex, activeCategory])

    // Touch swipe for mobile gallery
    const touchStartX = useRef(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) handleNextImage()
            else handlePrevImage()
        }
    }

    return (
        <div className="bg-white py-16 md:py-20 border-t border-sand-dark/10">
            <div className="max-w-7xl mx-auto px-5 md:px-10">

                {/* Header row: editorial label + heading + group toggle */}
                <BlurFade delay={BASE_DELAY} inView>
                    <div className="mb-10">
                        <p className="text-rust text-xs uppercase tracking-[0.22em] mb-5 font-semibold">
                            Photo Gallery
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                            <h2 className="font-display text-ocean-deep text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight">
                                Every corner.{' '}
                                <em className="text-rust">Every detail.</em>
                            </h2>

                            {/* Group toggle — right-aligned */}
                            <div
                                className="inline-flex self-start sm:self-auto bg-white border border-sand-dark/15 rounded-xl p-1 shadow-sm flex-shrink-0"
                                role="tablist"
                                aria-label="Gallery groups"
                            >
                                {galleryGroups.map((group) => (
                                    <motion.button
                                        key={group.id}
                                        onClick={() => handleGroupChange(group.id)}
                                        onPointerEnter={() => handlePrefetchGroup(group.id)}
                                        onFocus={() => handlePrefetchGroup(group.id)}
                                        role="tab"
                                        aria-selected={activeGroupId === group.id}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.1, ease: 'easeOut' }}
                                        className={cn(
                                            "px-5 py-2.5 min-h-[44px] flex items-center rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer",
                                            activeGroupId === group.id
                                                ? "bg-ocean-deep text-white shadow-md"
                                                : "text-ocean/50 hover:text-ocean"
                                        )}
                                    >
                                        {group.title}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </BlurFade>

                {/* Category pills — left-aligned, light style */}
                <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                    <div
                        className="flex flex-wrap gap-2 mb-8"
                        role="tablist"
                        aria-label="Gallery categories"
                    >
                        <AnimatePresence mode="popLayout">
                            {activeGroup.categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    onClick={() => setActiveCategory(category.id)}
                                    onPointerEnter={() => prefetchCategory(category)}
                                    onFocus={() => prefetchCategory(category)}
                                    role="tab"
                                    aria-selected={activeCategory === category.id}
                                    className={cn(
                                        "px-4 py-2.5 min-h-[44px] flex items-center rounded-full text-xs font-medium cursor-pointer transition-colors duration-200",
                                        activeCategory === category.id
                                            ? "bg-coral text-white shadow-sm shadow-coral/20"
                                            : "bg-white text-ocean/50 hover:text-ocean border border-sand-dark/15 hover:border-sand-dark/30"
                                    )}
                                >
                                    {category.title}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                </BlurFade>

                {/* Gallery — main image + thumbnail strip */}
                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 1.5} inView>
                    <div
                        ref={galleryRef}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_185px] gap-3"
                        role="tabpanel"
                        id={`gallery-panel-${activeCategory}`}
                        aria-label={`${activeGallery.title} gallery`}
                    >
                        {/* Main image */}
                        <div
                            className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden group bg-sand shadow-lg shadow-ocean/8"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <ImageShimmer visible={!isMainLoaded} />

                            <AnimatePresence>
                                <motion.div
                                    key={`${activeCategory}-${currentImageIndex}`}
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={isMainLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{ scale: 1.04 }}
                                    transition={{
                                        opacity: { duration: 0.4, ease: 'easeOut' },
                                        scale: { duration: 0.65, ease: 'easeOut', type: 'tween' },
                                    }}
                                    className="absolute inset-0 cursor-zoom-in"
                                >
                                    <Image
                                        src={currentImage.src}
                                        alt={currentImage.alt}
                                        fill
                                        sizes={GALLERY_MAIN_SIZES}
                                        className="object-cover"
                                        onLoad={() => markLoaded(`main:${currentImage.src}`)}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Gradient scrim */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                            {/* Image caption + counter */}
                            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between pointer-events-none">
                                <div>
                                    <p className="text-white font-semibold text-sm drop-shadow mb-0.5">
                                        {activeGallery.title}
                                    </p>
                                    <p className="text-white/65 text-xs hidden md:block drop-shadow leading-snug">
                                        {activeGallery.description}
                                    </p>
                                </div>
                                <span className="text-white/75 text-[11px] font-medium bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full hidden md:block">
                                    {currentImageIndex + 1} / {activeGallery.images.length}
                                </span>
                            </div>

                            {/* Prev / Next arrows */}
                            {activeGallery.images.length > 1 && (
                                <>
                                    <motion.button
                                        onClick={handlePrevImage}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.88 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ocean/30 cursor-pointer"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                                    </motion.button>
                                    <motion.button
                                        onClick={handleNextImage}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.88 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ocean/30 cursor-pointer"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5" strokeWidth={2} />
                                    </motion.button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail strip — vertical on desktop (height locked to the main image), horizontal scroll on mobile */}
                        <div className="relative">
                            <div
                                ref={thumbStripRef}
                                className="flex flex-row lg:flex-col gap-2 p-1 overflow-x-auto lg:absolute lg:inset-0 lg:overflow-x-hidden lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                            >
                                {activeGallery.images.map((img, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleDotClick(i)}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{ duration: 0.12, ease: 'easeOut' }}
                                        aria-label={`View image ${i + 1} of ${activeGallery.images.length}`}
                                        aria-current={i === currentImageIndex ? 'true' : undefined}
                                        className={cn(
                                            "relative flex-shrink-0 w-20 h-14 lg:w-full lg:h-auto lg:aspect-[4/3]",
                                            "rounded-xl overflow-hidden cursor-pointer transition-all duration-200 bg-sand",
                                            "focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 focus:ring-offset-white",
                                            i === currentImageIndex
                                                ? "ring-2 ring-coral ring-offset-2 ring-offset-white opacity-100"
                                                : "opacity-50 hover:opacity-85"
                                        )}
                                    >
                                        <ImageShimmer visible={!isLoaded(`thumb:${img.src}`)} />
                                        <Image
                                            src={img.src}
                                            alt=""
                                            aria-hidden="true"
                                            fill
                                            sizes={GALLERY_THUMB_SIZES}
                                            className={cn(
                                                "object-cover transition-opacity duration-300 ease-out",
                                                isLoaded(`thumb:${img.src}`) ? "opacity-100" : "opacity-0"
                                            )}
                                            onLoad={() => markLoaded(`thumb:${img.src}`)}
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                    </div>
                </BlurFade>

            </div>
        </div>
    )
}

export default PhotoGallery
