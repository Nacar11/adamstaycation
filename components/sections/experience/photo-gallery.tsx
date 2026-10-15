'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { ImageShimmer, ShimmerImage } from '@/components/ui/image-shimmer'
import { SectionEyebrow, SectionHeading } from '@/components/shared/section-heading'
import { cn, wrapIndex } from '@/lib/utils'
import { preloadImage } from '@/lib/preload-image'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { NEAR_VIEWPORT_MARGIN } from '@/lib/hooks/use-preload-when-near'
import { useSwipe } from '@/lib/hooks/use-swipe'
import { allCategories, galleryGroups, type GalleryCategory } from './data'
import { GALLERY_PANEL_ID, GalleryCategoryPills, GalleryGroupTabs, galleryTabId } from './gallery-tabs'
import GalleryLightbox from './gallery-lightbox'
import {
    BASE_DELAY,
    GALLERY_MAIN_SIZES,
    GALLERY_PREFETCH_START_DELAY,
    GALLERY_PREFETCH_STAGGER,
    GALLERY_THUMB_SIZES,
    STAGGER_DELAY,
} from './constants'

const ARROW_CLASS =
    'absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-opacity duration-250 shadow-md focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ocean/30 cursor-pointer'

const isSaveDataOn = () => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)

// Photo gallery: group tabs → category pills → main image + thumbnail strip + lightbox
const PhotoGallery = () => {
    const { isLoaded, markLoaded } = useImageReadiness()

    const [activeGroupId, setActiveGroupId] = useState(galleryGroups[0].id)
    const [activeCategory, setActiveCategory] = useState(galleryGroups[0].categories[0].id)
    const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({})
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const activeGroup = galleryGroups.find((g) => g.id === activeGroupId) ?? galleryGroups[0]
    const activeGallery = activeGroup.categories.find((cat) => cat.id === activeCategory) ?? activeGroup.categories[0]
    const imageCount = activeGallery.images.length
    const currentImageIndex = imageIndexes[activeCategory] ?? 0
    const currentImage = activeGallery.images[currentImageIndex]
    const isMainLoaded = isLoaded(`main:${currentImage.src}`)

    const showImage = (index: number) =>
        setImageIndexes((prev) => ({ ...prev, [activeCategory]: wrapIndex(index, imageCount) }))
    const handlePrevImage = () => showImage(currentImageIndex - 1)
    const handleNextImage = () => showImage(currentImageIndex + 1)
    const swipeHandlers = useSwipe(handleNextImage, handlePrevImage)

    const handleGroupChange = (groupId: string) => {
        const group = galleryGroups.find((g) => g.id === groupId)
        if (!group || groupId === activeGroupId) return
        setActiveGroupId(groupId)
        setActiveCategory(group.categories[0].id)
    }

    // Warm a category's first photo + all thumbnails so switching paints from cache
    const prefetchCategory = useCallback((category: GalleryCategory) => {
        const [firstImage] = category.images
        if (firstImage) preloadImage(firstImage.src, GALLERY_MAIN_SIZES, () => markLoaded(`main:${firstImage.src}`))
        category.images.forEach((img) => preloadImage(img.src, GALLERY_THUMB_SIZES, () => markLoaded(`thumb:${img.src}`)))
    }, [markLoaded])

    const handlePrefetchGroup = (groupId: string) => {
        const group = galleryGroups.find((g) => g.id === groupId)
        if (group) prefetchCategory(group.categories[0])
    }

    const galleryRef = useRef<HTMLDivElement>(null)
    const isGalleryNear = useInView(galleryRef, { once: true, margin: NEAR_VIEWPORT_MARGIN })

    useEffect(() => {
        if (!isGalleryNear || isSaveDataOn()) return
        const timers = allCategories.map((category, i) =>
            window.setTimeout(() => prefetchCategory(category), GALLERY_PREFETCH_START_DELAY + i * GALLERY_PREFETCH_STAGGER)
        )
        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [isGalleryNear, prefetchCategory])

    useEffect(() => {
        if (imageCount < 2) return
        ;[1, -1].forEach((step) => {
            const neighbour = activeGallery.images[wrapIndex(currentImageIndex + step, imageCount)]
            preloadImage(neighbour.src, GALLERY_MAIN_SIZES, () => markLoaded(`main:${neighbour.src}`))
        })
    }, [activeGallery, imageCount, currentImageIndex, markLoaded])

    // Keep the active thumbnail centred in its strip (scrolls the strip, never the page)
    const thumbStripRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const strip = thumbStripRef.current
        const thumb = strip?.children[currentImageIndex] as HTMLElement | undefined
        if (!strip || !thumb) return
        const stripRect = strip.getBoundingClientRect()
        const thumbRect = thumb.getBoundingClientRect()
        strip.scrollBy({
            top: thumbRect.top + thumbRect.height / 2 - (stripRect.top + stripRect.height / 2),
            left: thumbRect.left + thumbRect.width / 2 - (stripRect.left + stripRect.width / 2),
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })
    }, [currentImageIndex, activeCategory])

    const lightboxTriggerRef = useRef<HTMLButtonElement>(null)

    const handleCloseLightbox = useCallback(() => {
        setIsLightboxOpen(false)
        lightboxTriggerRef.current?.focus()
    }, [])

    return (
        <div className="bg-white py-16 md:py-20 border-t border-sand-dark/10">
            <div className="max-w-7xl mx-auto px-5 md:px-10">
                <BlurFade delay={BASE_DELAY} inView>
                    <div className="mb-10">
                        <SectionEyebrow>Photo Gallery</SectionEyebrow>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                            <SectionHeading lead="Every corner." accent="Every detail." />
                            <GalleryGroupTabs
                                groups={galleryGroups}
                                activeGroupId={activeGroupId}
                                onSelect={handleGroupChange}
                                onPrefetch={handlePrefetchGroup}
                            />
                        </div>
                    </div>
                </BlurFade>

                <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                    <GalleryCategoryPills
                        categories={activeGroup.categories}
                        activeCategoryId={activeCategory}
                        onSelect={setActiveCategory}
                        onPrefetch={prefetchCategory}
                    />
                </BlurFade>

                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 1.5} inView>
                    <div
                        ref={galleryRef}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_185px] gap-3"
                        role="tabpanel"
                        id={GALLERY_PANEL_ID}
                        aria-labelledby={galleryTabId(activeGallery.id)}
                    >
                        <div
                            className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden group bg-sand shadow-lg shadow-ocean/8"
                            {...swipeHandlers}
                        >
                            <ImageShimmer visible={!isMainLoaded} />

                            <button
                                ref={lightboxTriggerRef}
                                type="button"
                                onClick={() => setIsLightboxOpen(true)}
                                aria-label={`Open ${activeGallery.title} photo ${currentImageIndex + 1} of ${imageCount} in full screen`}
                                aria-haspopup="dialog"
                                className="absolute inset-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rust"
                            >
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
                                        className="absolute inset-0"
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
                            </button>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between pointer-events-none">
                                <div>
                                    <p className="text-white font-semibold text-sm drop-shadow mb-0.5">{activeGallery.title}</p>
                                    <p className="text-white/65 text-xs hidden md:block drop-shadow leading-snug">{activeGallery.description}</p>
                                </div>
                                <span className="text-white/75 text-[11px] font-medium bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full hidden md:block">
                                    {currentImageIndex + 1} / {imageCount}
                                </span>
                            </div>

                            {imageCount > 1 && (
                                <>
                                    <motion.button
                                        type="button"
                                        onClick={handlePrevImage}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.88 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className={cn(ARROW_CLASS, 'left-3')}
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={handleNextImage}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.88 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className={cn(ARROW_CLASS, 'right-3')}
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                                    </motion.button>
                                </>
                            )}
                        </div>

                        {/* Desktop: vertical strip locked to the main image height; mobile: horizontal */}
                        <div className="relative">
                            <div
                                ref={thumbStripRef}
                                className="flex flex-row lg:flex-col gap-2 p-1 overflow-x-auto lg:absolute lg:inset-0 lg:overflow-x-hidden lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                            >
                                {activeGallery.images.map((img, i) => (
                                    <motion.button
                                        key={img.src}
                                        type="button"
                                        onClick={() => showImage(i)}
                                        whileTap={{ scale: 0.94 }}
                                        transition={{ duration: 0.12, ease: 'easeOut' }}
                                        aria-label={`View image ${i + 1} of ${imageCount}`}
                                        aria-current={i === currentImageIndex ? 'true' : undefined}
                                        className={cn(
                                            'relative flex-shrink-0 w-20 h-14 lg:w-full lg:h-auto lg:aspect-[4/3]',
                                            'rounded-xl overflow-hidden cursor-pointer transition-all duration-200 bg-sand',
                                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                                            i === currentImageIndex
                                                ? 'ring-2 ring-rust ring-offset-2 ring-offset-white opacity-100'
                                                : 'opacity-50 hover:opacity-85'
                                        )}
                                    >
                                        <ShimmerImage
                                            src={img.src}
                                            alt=""
                                            aria-hidden="true"
                                            fill
                                            sizes={GALLERY_THUMB_SIZES}
                                            loaded={isLoaded(`thumb:${img.src}`)}
                                            onLoad={() => markLoaded(`thumb:${img.src}`)}
                                            className="object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </BlurFade>
            </div>

            <GalleryLightbox
                open={isLightboxOpen}
                title={activeGallery.title}
                images={activeGallery.images}
                index={currentImageIndex}
                onIndexChange={showImage}
                onClose={handleCloseLightbox}
            />
        </div>
    )
}

export default PhotoGallery
