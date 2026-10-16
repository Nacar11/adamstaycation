'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Waves } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { ShimmerImage } from '@/components/ui/image-shimmer'
import AirbnbLink from '@/components/shared/airbnb-link'
import { SectionEyebrow, SectionHeading } from '@/components/shared/section-heading'
import { cn, wrapIndex } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'
import { useIsActive } from '@/lib/hooks/use-is-active'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { usePreloadWhenNear } from '@/lib/hooks/use-preload-when-near'
import { resortAccessImages } from './data'
import { BASE_DELAY, RESORT_AUTOPLAY_INTERVAL, RESORT_PREFETCH_STAGGER, RESORT_SIZES, STAGGER_DELAY } from './constants'

const slideSrcs = resortAccessImages.map((img) => img.src)
const SLIDE_COUNT = resortAccessImages.length
const ARROW_CLASS =
    'absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white transition-all duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40'

// Resort amenities: autoplay photo carousel + pricing tiers
const ResortAccess = () => {
    const { isLoaded, markLoaded, loadedRef } = useImageReadiness()
    const [resortIndex, setResortIndex] = useState(0)
    const [resortHovered, setResortHovered] = useState(false)
    const resortRef = useRef<HTMLDivElement>(null)

    usePreloadWhenNear(resortRef, slideSrcs, RESORT_SIZES, markLoaded, RESORT_PREFETCH_STAGGER)

    const handlePrev = () => setResortIndex((prev) => wrapIndex(prev - 1, SLIDE_COUNT))
    const handleNext = () => setResortIndex((prev) => wrapIndex(prev + 1, SLIDE_COUNT))

    // Autoplay only moves onto loaded slides; off while hovered, unseen or under reduced motion
    const handleAutoplay = useCallback(() => {
        setResortIndex((prev) => {
            const next = wrapIndex(prev + 1, SLIDE_COUNT)
            return loadedRef.current.has(slideSrcs[next]) ? next : prev
        })
    }, [loadedRef])

    const prefersReducedMotion = usePrefersReducedMotion()
    const isResortActive = useIsActive(resortRef)

    useEffect(() => {
        if (resortHovered || prefersReducedMotion || !isResortActive) return
        const interval = setInterval(handleAutoplay, RESORT_AUTOPLAY_INTERVAL)
        return () => clearInterval(interval)
    }, [handleAutoplay, resortHovered, prefersReducedMotion, isResortActive])

    return (
        <div className="bg-ocean-deep overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 min-h-[580px] md:min-h-[620px] lg:gap-6">

                    <div
                        ref={resortRef}
                        className="lg:col-span-5 relative min-h-[360px] lg:min-h-0 order-2 lg:order-1 overflow-hidden lg:rounded-r-2xl"
                        onMouseEnter={() => setResortHovered(true)}
                        onMouseLeave={() => setResortHovered(false)}
                    >
                        <div
                            className="absolute inset-0 flex transition-transform duration-700 ease-out motion-reduce:transition-none"
                            style={{ transform: `translateX(-${resortIndex * 100}%)` }}
                        >
                            {resortAccessImages.map((img) => (
                                <div key={img.src} className="relative flex-shrink-0 w-full h-full bg-ocean">
                                    <ShimmerImage
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes={RESORT_SIZES}
                                        tone="dark"
                                        loaded={isLoaded(img.src)}
                                        onLoad={() => markLoaded(img.src)}
                                        className="object-cover duration-500"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent z-10 pointer-events-none" />

                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous image"
                            className={cn(ARROW_CLASS, 'left-4', resortHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none')}
                        >
                            <ChevronLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next image"
                            className={cn(ARROW_CLASS, 'right-4', resortHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none')}
                        >
                            <ChevronRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                        </button>

                        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/25">
                            <Waves className="w-3.5 h-3.5 text-white" strokeWidth={1.5} aria-hidden="true" />
                            <span className="text-white text-xs font-medium tracking-wide">Pool · Beach · Gym</span>
                        </div>
                    </div>

                    <div className="lg:col-span-7 px-8 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 flex flex-col justify-center order-1 lg:order-2">
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>

                            <SectionEyebrow tone="dark" className="text-coral">
                                Resort Amenities Access&nbsp;·&nbsp;Pool&nbsp;·&nbsp;Beach&nbsp;·&nbsp;Gym
                            </SectionEyebrow>
                            <SectionHeading tone="dark" lead="Pool. Beach. Gym." accent="Access on your terms." accentOnNewLine className="mb-6" accentClassName="text-coral" />
                            <p className="text-sand-light/80 text-base leading-[1.75] max-w-md mb-10">
                                One pass unlocks all three — pool, beach, and gym together. No separate fees, no restrictions.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-xl">

                                <div className="rounded-2xl bg-sand-light p-6 md:p-7">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-rust font-semibold mb-3">Day Pass</p>
                                    <p className="font-display text-[2.5rem] text-ocean-deep leading-none mb-2 tabular-nums">
                                        &#8369;900
                                    </p>
                                    <p className="text-sm text-ocean/80 mb-5">per person / per day</p>
                                    <p className="text-sm text-ocean/80 leading-relaxed pt-5 border-t border-sand-dark/50">
                                        Vouchers available at check-in. Ideal for 1–7 day bookings.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/[0.06] border border-sand-light/15 p-6 md:p-7">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-coral font-semibold mb-3">Long Stay</p>
                                    <p className="font-display text-[1.75rem] lg:text-[1.5rem] xl:text-[1.875rem] text-sand-light leading-none mb-2 whitespace-nowrap">
                                        Complimentary
                                    </p>
                                    <p className="text-sm text-sand-light/75 mb-5">from 3 weeks onward</p>
                                    <p className="text-sm text-sand-light/75 leading-relaxed pt-5 border-t border-sand-light/15">
                                        Full resort access included. Terms negotiable.
                                    </p>
                                </div>

                            </div>

                            <AirbnbLink
                                ariaLabel="Check availability on Airbnb (opens in new tab)"
                                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-gradient-to-br from-coral to-coral-dark text-white text-[15px] font-semibold transition-[filter] duration-200 hover:brightness-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-ocean-deep w-fit"
                            >
                                Check availability
                                <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" strokeWidth={2} aria-hidden="true" />
                            </AirbnbLink>

                        </BlurFade>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResortAccess
