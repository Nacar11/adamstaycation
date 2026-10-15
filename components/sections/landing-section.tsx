'use client'

import { Fragment, useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown, MapPin } from 'lucide-react'
import { AIRBNB_LISTING_URL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { TextAnimate } from '@/components/ui/text-animate'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { Particles } from '@/components/ui/particles'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'
import PageLoader from '@/components/shared/page-loader'
import { scrollToTarget } from '@/lib/scroll'
import heroImage1 from '@/public/images/banner/landing-page-1.jpg'
import heroImage2 from '@/public/images/banner/landing-page-2.jpg'
import heroImage3 from '@/public/images/banner/landing-page-3.jpg'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2
const SLIDE_DURATION = 7000
// Only show the branded loader if the first hero photo is still missing after this — cached/fast loads never see it
const LOADER_DELAY = 400
// Never hold the page hostage on a slow network — hide the loader after this regardless
const LOADER_TIMEOUT = 10000

// Static imports give next/image a built-in blurred preview (placeholder="blur")
const heroImages = [
    { image: heroImage1, origin: '70% 40%' },
    { image: heroImage2, origin: '50% 30%' },
    { image: heroImage3, origin: '40% 70%' },
]

export default function LandingSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [loadedCount, setLoadedCount] = useState(0)
    const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false)
    const [isLoaderDelayElapsed, setIsLoaderDelayElapsed] = useState(false)
    const [hasTimedOut, setHasTimedOut] = useState(false)
    const [contentKey, setContentKey] = useState(0)
    const loadedSrcs = useRef(new Set<string>())
    const wasLoaderShown = useRef(false)

    const isLoaderVisible = isLoaderDelayElapsed && !isFirstImageLoaded && !hasTimedOut
    const areAllImagesSettled = hasTimedOut || loadedCount >= heroImages.length

    const handleImageSettled = useCallback((src: string, index: number) => {
        if (index === 0) setIsFirstImageLoaded(true)
        if (loadedSrcs.current.has(src)) return
        loadedSrcs.current.add(src)
        setLoadedCount(loadedSrcs.current.size)
    }, [])

    useEffect(() => {
        const delay = setTimeout(() => setIsLoaderDelayElapsed(true), LOADER_DELAY)
        const timeout = setTimeout(() => setHasTimedOut(true), LOADER_TIMEOUT)
        return () => {
            clearTimeout(delay)
            clearTimeout(timeout)
        }
    }, [])

    // If the loader covered the hero, replay the entrance animations once it lifts
    useEffect(() => {
        if (isLoaderVisible) {
            wasLoaderShown.current = true
            return
        }
        if (wasLoaderShown.current) {
            wasLoaderShown.current = false
            setContentKey((key) => key + 1)
        }
    }, [isLoaderVisible])

    const advanceImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, [])

    // Start the slideshow only once every slide is ready, so it never crossfades into a blurry placeholder.
    // Reduced motion: hold on the first photo (no autoplay, no Ken Burns zoom, no particles).
    const prefersReducedMotion = usePrefersReducedMotion()
    const isSlideshowRunning = areAllImagesSettled && !prefersReducedMotion

    useEffect(() => {
        if (!isSlideshowRunning) return
        const interval = setInterval(advanceImage, SLIDE_DURATION)
        return () => clearInterval(interval)
    }, [advanceImage, isSlideshowRunning])

    const scrollToSection = (id: string) => {
        scrollToTarget(id)
    }

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            scrollToSection(id)
        }
    }

    return (
        <>
            <PageLoader visible={isLoaderVisible} />
            <section
                id="home"
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ocean-deep"
                aria-label="Welcome to Adam's Staycation"
            >
                {/* Ken Burns Background Carousel */}
                <div className="absolute inset-0" aria-hidden="true">
                    {heroImages.map((img, index) => (
                        <div
                            key={img.image.src}
                            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                            style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        >
                            <Image
                                src={img.image}
                                alt=""
                                fill
                                priority={index === 0}
                                placeholder="blur"
                                sizes="100vw"
                                quality={70}
                                onLoad={() => handleImageSettled(img.image.src, index)}
                                onError={() => handleImageSettled(img.image.src, index)}
                                className="object-cover will-change-transform"
                                style={{
                                    transformOrigin: img.origin,
                                    transform: index === currentImageIndex && !prefersReducedMotion ? 'scale(1.15)' : 'scale(1)',
                                    transition: index === currentImageIndex
                                        ? `transform ${SLIDE_DURATION + 1500}ms ease-out`
                                        : 'transform 1.5s ease-in-out',
                                }}
                            />
                        </div>
                    ))}
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(13, 43, 51, 0.45), rgba(13, 43, 51, 0.75))',
                        }}
                    />
                </div>
    
                {/* Particles Background Effect — skipped entirely for reduced motion */}
                {!prefersReducedMotion && (
                    <Particles
                        className="absolute inset-0 z-[1]"
                        quantity={50}
                        staticity={30}
                        ease={50}
                        color="#ffffff"
                    />
                )}
    
                {/* Dot Pattern Overlay */}
                <DotPattern
                    className={cn(
                        "absolute inset-0 z-[2] opacity-20",
                        "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
                    )}
                    cr={1}
                    cx={1}
                    cy={1}
                />
    
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sand-light/30 z-[3]" />
    
                {/* Content — always server-rendered for SEO; re-keyed to replay entrance animations if the loader covered it */}
                <Fragment key={contentKey}>
                    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                        {/* Animated Title */}
                        <BlurFade delay={BASE_DELAY} inView>
                            <TextAnimate
                                as="h1"
                                animation="blurInUp"
                                by="character"
                                className="font-display text-[2.6rem] md:text-7xl lg:text-8xl text-white mb-6 tracking-tight whitespace-nowrap"
                                style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.3)' }}
                            >
                                Adam&apos;s Staycation
                            </TextAnimate>
                        </BlurFade>
        
                        {/* Subtitle */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light">
                                Your Luxury Escape at Tambuli Seaside Living
                            </p>
                        </BlurFade>
        
                        {/* Location Badge */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 mb-12">
                                <MapPin className="w-4 h-4" aria-hidden="true" />
                                <span className="text-sm md:text-base font-medium">Lapu-Lapu City, Cebu</span>
                            </div>
                        </BlurFade>
        
                        {/* CTA Buttons */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 3} inView>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {/* Primary CTA - Shimmer Button */}
                                <a
                                    href={AIRBNB_LISTING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Book your stay on Airbnb (opens in new tab)"
                                >
                                    <ShimmerButton
                                        className="h-14 px-8 text-lg font-medium"
                                        shimmerColor="rgba(255, 255, 255, 0.2)"
                                        shimmerSize="0.1em"
                                        background="linear-gradient(135deg, #E07A5F 0%, #c96a52 100%)"
                                    >
                                        <span className="whitespace-pre-wrap text-center leading-none tracking-tight text-white">
                                            Book on Airbnb
                                        </span>
                                    </ShimmerButton>
                                </a>
        
                                {/* Secondary CTA */}
                                <button
                                    onClick={() => scrollToSection('experience')}
                                    onKeyDown={(e) => handleKeyDown(e, 'experience')}
                                    tabIndex={0}
                                    className="px-8 py-4 glass-effect text-white text-lg font-medium rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                                    aria-label="Explore amenities section"
                                >
                                    Explore Amenities
                                </button>
                            </div>
                        </BlurFade>
                    </div>
        
                    {/* Progress Bar */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2 w-48">
                        {heroImages.map((_, index) => (
                            <div key={index} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                                {isSlideshowRunning && index === currentImageIndex && (
                                    <div
                                        key={`progress-${currentImageIndex}`}
                                        className="h-full bg-white/70 rounded-full origin-left"
                                        style={{
                                            animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
        
                    {/* Scroll Indicator */}
                    <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 5} inView>
                        <div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 cursor-pointer z-10"
                            onClick={() => scrollToSection('experience')}
                            onKeyDown={(e) => handleKeyDown(e, 'experience')}
                            tabIndex={0}
                            role="button"
                            aria-label="Scroll to explore more content"
                        >
                            <span className="text-sm tracking-widest uppercase font-medium">Scroll to explore</span>
                            <div className="animate-float">
                                <ChevronDown className="w-6 h-6" aria-hidden="true" />
                            </div>
                        </div>
                    </BlurFade>
                </Fragment>
            </section>
        </>
    )
}
