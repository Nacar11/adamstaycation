'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Waves } from 'lucide-react'
import { useInView } from 'motion/react'
import { AIRBNB_LISTING_URL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { ImageShimmer } from '@/components/ui/image-shimmer'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'
import { useIsActive } from '@/lib/hooks/use-is-active'
import { preloadImage } from '@/lib/preload-image'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { resortAccessImages } from './data'
import {
    BASE_DELAY,
    NEAR_VIEWPORT_MARGIN,
    RESORT_AUTOPLAY_INTERVAL,
    RESORT_PREFETCH_STAGGER,
    RESORT_SIZES,
    STAGGER_DELAY,
} from './constants'

// Resort amenities: autoplay photo carousel + pricing tiers
const ResortAccess = () => {
    const { isLoaded, markLoaded, loadedRef } = useImageReadiness()
    const [resortIndex, setResortIndex] = useState(0)
    const [resortHovered, setResortHovered] = useState(false)

    const prevResort = useCallback(() => {
        setResortIndex((prev) => (prev - 1 + resortAccessImages.length) % resortAccessImages.length)
    }, [])

    const nextResort = useCallback(() => {
        setResortIndex((prev) => (prev + 1) % resortAccessImages.length)
    }, [])

    // Autoplay only moves onto a slide that's ready, so it never rotates into a placeholder
    const handleResortAutoplay = useCallback(() => {
        setResortIndex((prev) => {
            const next = (prev + 1) % resortAccessImages.length
            return loadedRef.current.has(`resort:${resortAccessImages[next].src}`) ? next : prev
        })
    }, [loadedRef])

    // Warm every slide, in order, once the carousel approaches the viewport
    const resortRef = useRef<HTMLDivElement>(null)

    // Reduced motion: no autoplay — visitors step through with the arrows instead.
    // Off-screen or hidden tab: no autoplay either, so nothing ticks unseen.
    const prefersReducedMotion = usePrefersReducedMotion()
    const isResortActive = useIsActive(resortRef)

    useEffect(() => {
        if (resortHovered || prefersReducedMotion || !isResortActive) return
        const interval = setInterval(handleResortAutoplay, RESORT_AUTOPLAY_INTERVAL)
        return () => clearInterval(interval)
    }, [handleResortAutoplay, resortHovered, prefersReducedMotion, isResortActive])
    const isResortNear = useInView(resortRef, { once: true, margin: NEAR_VIEWPORT_MARGIN })

    useEffect(() => {
        if (!isResortNear) return
        const timers = resortAccessImages.map((img, i) =>
            window.setTimeout(
                () => preloadImage(img.src, RESORT_SIZES, () => markLoaded(`resort:${img.src}`)),
                i * RESORT_PREFETCH_STAGGER
            )
        )
        return () => timers.forEach((timer) => window.clearTimeout(timer))
    }, [isResortNear, markLoaded])

    return (
        <div className="bg-ocean-deep overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 min-h-[580px] md:min-h-[620px] lg:gap-6">

                    {/* Left — Auto-play carousel */}
                    <div
                        ref={resortRef}
                        className="lg:col-span-5 relative min-h-[360px] lg:min-h-0 order-2 lg:order-1 overflow-hidden lg:rounded-r-2xl"
                        onMouseEnter={() => setResortHovered(true)}
                        onMouseLeave={() => setResortHovered(false)}
                    >
                        {/* Slides track */}
                        <div
                            className="absolute inset-0 flex transition-transform duration-700 ease-out motion-reduce:transition-none"
                            style={{ transform: `translateX(-${resortIndex * 100}%)` }}
                        >
                            {resortAccessImages.map((img) => (
                                <div key={img.src} className="relative flex-shrink-0 w-full h-full bg-ocean">
                                    <ImageShimmer tone="dark" visible={!isLoaded(`resort:${img.src}`)} />
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className={cn(
                                            "object-cover transition-opacity duration-500 ease-out",
                                            isLoaded(`resort:${img.src}`) ? "opacity-100" : "opacity-0"
                                        )}
                                        sizes={RESORT_SIZES}
                                        onLoad={() => markLoaded(`resort:${img.src}`)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Bottom scrim */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent z-10 pointer-events-none" />

                        {/* Prev arrow */}
                        <button
                            onClick={prevResort}
                            aria-label="Previous image"
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40",
                                resortHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
                            )}
                        >
                            <ChevronLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                        </button>

                        {/* Next arrow */}
                        <button
                            onClick={nextResort}
                            aria-label="Next image"
                            className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40",
                                resortHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
                            )}
                        >
                            <ChevronRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                        </button>

                        {/* Floating badge */}
                        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/25">
                            <Waves className="w-3.5 h-3.5 text-white" strokeWidth={1.5} aria-hidden="true" />
                            <span className="text-white text-xs font-medium tracking-wide">Pool · Beach · Gym</span>
                        </div>
                    </div>

                    {/* Right — Editorial content */}
                    <div className="lg:col-span-7 px-8 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-center order-1 lg:order-2">
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>

                            {/* Label */}
                            <p className="text-peach text-xs uppercase tracking-[0.22em] mb-5 font-semibold">
                                Resort Amenities Access&nbsp;·&nbsp;Pool&nbsp;·&nbsp;Beach&nbsp;·&nbsp;Gym
                            </p>

                            {/* Heading — navy/cream + italic accent, shared with Host & Gallery */}
                            <h2 className="font-display text-sand-light text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight mb-6">
                                Pool. Beach. Gym.
                                <em className="block text-peach">Access on your terms.</em>
                            </h2>

                            {/* Descriptor */}
                            <p className="text-sand-light/80 text-base leading-[1.75] max-w-md mb-10">
                                One pass unlocks all three — pool, beach, and gym together. No separate fees, no restrictions.
                            </p>

                            {/* Tier cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-xl">

                                {/* Short stay */}
                                <div className="rounded-2xl bg-sand-light p-6 md:p-7">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-rust font-semibold mb-3">Day Pass</p>
                                    <p className="font-display text-[2.5rem] text-ocean-deep leading-none mb-2 tabular-nums">
                                        &#8369;900
                                    </p>
                                    <p className="text-sm text-ocean/75 mb-5">per person / per day</p>
                                    <p className="text-sm text-ocean/75 leading-relaxed pt-5 border-t border-sand-dark/50">
                                        Vouchers available at check-in. Ideal for 1–7 day bookings.
                                    </p>
                                </div>

                                {/* Long stay */}
                                <div className="rounded-2xl bg-white/[0.06] border border-sand-light/15 p-6 md:p-7">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-peach font-semibold mb-3">Long Stay</p>
                                    <p className="font-display text-[1.75rem] lg:text-[1.5rem] xl:text-[1.875rem] text-sand-light leading-none mb-2 whitespace-nowrap">
                                        Complimentary
                                    </p>
                                    <p className="text-sm text-sand-light/75 mb-5">from 3 weeks onward</p>
                                    <p className="text-sm text-sand-light/75 leading-relaxed pt-5 border-t border-sand-light/15">
                                        Full resort access included. Terms negotiable.
                                    </p>
                                </div>

                            </div>

                            {/* CTA */}
                            <a
                                href={AIRBNB_LISTING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-peach text-ocean-deep text-[15px] font-semibold transition-colors duration-200 hover:bg-sand-light cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-peach focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-deep w-fit"
                                aria-label="Check availability on Airbnb (opens in new tab)"
                            >
                                Check availability
                                <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={2} aria-hidden="true" />
                            </a>

                        </BlurFade>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResortAccess
