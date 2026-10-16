'use client'

import { useRef } from 'react'
import { BlurFade } from '@/components/ui/blur-fade'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerImage } from '@/components/ui/image-shimmer'
import { SectionEyebrow, SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'
import { useImageReadiness } from '@/lib/hooks/use-image-readiness'
import { usePreloadWhenNear } from '@/lib/hooks/use-preload-when-near'
import { aboutGridImages, aboutHighlights, arrivalSteps, roomSpecs } from './data'
import { ABOUT_GRID_SIZES, BASE_DELAY, STAGGER_DELAY } from './constants'

const gridSrcs = aboutGridImages.map((img) => img.src)

// Dita Building intro, arrival steps, and the 2×2 studio photo grid with room specs
const DitaAbout = () => {
    const { isLoaded, markLoaded } = useImageReadiness()
    const gridRef = useRef<HTMLDivElement>(null)
    usePreloadWhenNear(gridRef, gridSrcs, ABOUT_GRID_SIZES, markLoaded)

    return (
        <div className="relative bg-sand-light overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <BlurFade delay={BASE_DELAY} inView>
                    <div className="grid lg:grid-cols-2 min-h-[680px] lg:gap-6">

                        <div className="px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 flex flex-col justify-center">

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 0.5} inView>
                                <SectionEyebrow>
                                    Dita Building&nbsp;·&nbsp;Tambuli Seaside Living&nbsp;·&nbsp;Lapu&#8209;Lapu City, Cebu
                                </SectionEyebrow>
                            </BlurFade>

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                                <SectionHeading lead="Welcome to" accent="Adam's Staycation." accentClassName="whitespace-nowrap" className="mb-8" />
                            </BlurFade>

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                                <div className="space-y-4 mb-12">
                                    {aboutHighlights.map((item) => (
                                        <div key={item.highlight} className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rust mt-[10px] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-base leading-[1.7] text-ocean-deep">
                                                <span className="font-bold">{item.highlight}</span> {item.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </BlurFade>

                            {arrivalSteps.map((item, i) => (
                                <BlurFade key={item.title} delay={BASE_DELAY + STAGGER_DELAY * (3 + i)} inView>
                                    <div className={cn('py-7', i > 0 && 'border-t border-sand-dark/50')}>
                                        <h3 className="font-display font-semibold text-ocean-deep text-xl mb-2">{item.title}</h3>
                                        <p className="text-ocean-deep text-[15px] leading-relaxed max-w-sm">{item.body}</p>
                                    </div>
                                </BlurFade>
                            ))}
                        </div>

                        <div ref={gridRef} className="relative min-h-[460px] lg:min-h-0 overflow-hidden lg:rounded-l-2xl">
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
                                {aboutGridImages.map((img) => (
                                    <div key={img.src} className="relative overflow-hidden bg-sand">
                                        <ShimmerImage
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes={ABOUT_GRID_SIZES}
                                            loaded={isLoaded(img.src)}
                                            onLoad={() => markLoaded(img.src)}
                                            className="object-cover transition-[opacity,transform] duration-700 hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 pt-20 pb-8 px-8 md:px-10 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/60 to-transparent pointer-events-none">
                                <p className="text-white/55 text-[9px] uppercase tracking-[0.35em] mb-5">
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
                                                        <NumberTicker value={spec.value} className="text-white" />
                                                    </p>
                                                    <p className="text-white/55 text-[11px] mt-0.5 tracking-wide">{spec.label}</p>
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
