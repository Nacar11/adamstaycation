'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useInView } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ImageShimmer } from '@/components/ui/image-shimmer'
import { cn } from '@/lib/utils'
import { preloadImage } from '@/lib/preload-image'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { aboutGridImages, aboutHighlights, arrivalSteps, roomSpecs } from './data'
import { ABOUT_GRID_SIZES, BASE_DELAY, NEAR_VIEWPORT_MARGIN, STAGGER_DELAY } from './constants'

// Dita Building intro, arrival steps, and the 2×2 studio photo grid with room specs
const DitaAbout = () => {
    const { isLoaded, markLoaded } = useImageReadiness()

    // Warm the studio grid as it approaches the viewport
    const gridRef = useRef<HTMLDivElement>(null)
    const isGridNear = useInView(gridRef, { once: true, margin: NEAR_VIEWPORT_MARGIN })

    useEffect(() => {
        if (!isGridNear) return
        aboutGridImages.forEach((img) => {
            preloadImage(img.src, ABOUT_GRID_SIZES, () => markLoaded(`about:${img.src}`))
        })
    }, [isGridNear, markLoaded])

    return (
        <div className="relative bg-sand-light overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <BlurFade delay={BASE_DELAY} inView>
                    <div className="grid lg:grid-cols-2 min-h-[680px] lg:gap-6">

                        {/* ── Left: Editorial Content ── */}
                        <div className="px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 flex flex-col justify-center">

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 0.5} inView>
                                <p className="text-rust text-xs uppercase tracking-[0.22em] mb-5 font-semibold">
                                    Dita Building&nbsp;·&nbsp;Tambuli Seaside Living&nbsp;·&nbsp;Lapu&#8209;Lapu City, Cebu
                                </p>
                            </BlurFade>

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                                <h2 className="font-display text-ocean-deep text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight mb-8">
                                    Welcome to{' '}
                                    <em className="text-rust whitespace-nowrap">Adam&apos;s Staycation.</em>
                                </h2>
                            </BlurFade>

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                                <div className="space-y-4 mb-12">
                                    {aboutHighlights.map((item) => (
                                        <div key={item.highlight} className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rust mt-[10px] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-base leading-[1.7]">
                                                <span className="text-ocean-deep font-semibold">{item.highlight} </span>
                                                <span className="text-ocean/75">{item.detail}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </BlurFade>

                            {/* Two arrival items — no numbers, clean editorial */}
                            <div className="space-y-0">
                                {arrivalSteps.map((item, i) => (
                                    <BlurFade key={item.title} delay={BASE_DELAY + STAGGER_DELAY * (3 + i)} inView>
                                        <div className={cn(
                                            "py-7",
                                            i > 0 && "border-t border-sand-dark/50"
                                        )}>
                                            <h3 className="font-display text-ocean-deep text-xl mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-ocean/75 text-[15px] leading-relaxed max-w-sm">
                                                {item.body}
                                            </p>
                                        </div>
                                    </BlurFade>
                                ))}
                            </div>
                        </div>

                        {/* ── Right: 2×2 Studio Image Grid ── */}
                        <div ref={gridRef} className="relative min-h-[460px] lg:min-h-0 overflow-hidden lg:rounded-l-2xl">
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
                                {aboutGridImages.map((img) => (
                                    <div key={img.src} className="relative overflow-hidden bg-sand">
                                        <ImageShimmer visible={!isLoaded(`about:${img.src}`)} />
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className={cn(
                                                "object-cover transition-[opacity,transform] duration-700 ease-out hover:scale-105",
                                                isLoaded(`about:${img.src}`) ? "opacity-100" : "opacity-0"
                                            )}
                                            sizes={ABOUT_GRID_SIZES}
                                            onLoad={() => markLoaded(`about:${img.src}`)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Room specs — dark gradient overlay */}
                            <div className="absolute bottom-0 left-0 right-0 pt-20 pb-8 px-8 md:px-10 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/60 to-transparent pointer-events-none">
                                <p className="text-white/25 text-[9px] uppercase tracking-[0.35em] mb-5">
                                    Room Specifications
                                </p>
                                <div className="flex items-center gap-8 md:gap-10">
                                    {roomSpecs.map((spec) => {
                                        const Icon = spec.icon
                                        return (
                                            <div key={spec.label} className="flex items-center gap-3">
                                                <Icon className="w-4 h-4 text-coral flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                                                <div>
                                                    <p className="font-display text-white text-2xl font-bold leading-none">
                                                        {spec.numericValue ? (
                                                            <NumberTicker value={spec.numericValue} className="text-white" />
                                                        ) : spec.value}
                                                    </p>
                                                    <p className="text-white/35 text-[11px] mt-0.5 tracking-wide">{spec.label}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </BlurFade>
            </div>
        </div>
    )
}

export default DitaAbout
