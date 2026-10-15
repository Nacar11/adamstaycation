'use client'

import { Fragment, useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown, MapPin, Pause, Play } from 'lucide-react'
import { TextAnimate } from '@/components/ui/text-animate'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { Particles } from '@/components/ui/particles'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'
import { useIsActive } from '@/lib/hooks/use-is-active'
import PageLoader from '@/components/shared/page-loader'
import AirbnbLink from '@/components/shared/airbnb-link'
import { scrollToTarget } from '@/lib/scroll'
import { CTA_GRADIENT, CTA_SHIMMER } from '@/lib/theme'
import heroImage1 from '@/public/images/banner/landing-page-1.jpg'
import heroImage2 from '@/public/images/banner/landing-page-2.jpg'
import heroImage3 from '@/public/images/banner/landing-page-3.jpg'

// Hero reveals use CSS animate-blur-fade-in (paints without JS) at BlurFade's stagger: 240/340/440/540/740ms
const SLIDE_DURATION = 7000
// Loader only appears if the first photo is still missing after this, and never stays past the timeout
const LOADER_DELAY = 400
const LOADER_TIMEOUT = 10000

// Static imports give next/image a blurred placeholder
const heroImages = [
    { image: heroImage1, origin: '70% 40%' },
    { image: heroImage2, origin: '50% 30%' },
    { image: heroImage3, origin: '40% 70%' },
]

const LandingSection = () => {
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

    // Autoplay needs every slide loaded and motion allowed; it also pauses on demand (WCAG 2.2.2) and when unseen
    const prefersReducedMotion = usePrefersReducedMotion()
    const canAutoplay = areAllImagesSettled && !prefersReducedMotion

    const [isPaused, setIsPaused] = useState(false)

    const heroRef = useRef<HTMLElement>(null)
    const isHeroActive = useIsActive(heroRef)
    const isSlideshowRunning = canAutoplay && !isPaused && isHeroActive

    const handleTogglePause = () => {
        setIsPaused((paused) => !paused)
    }

    // `cycle` restarts the progress bar whenever the slide timer (re)starts
    const [cycle, setCycle] = useState(0)

    useEffect(() => {
        if (!isSlideshowRunning) return
        setCycle((count) => count + 1)
        const interval = setInterval(advanceImage, SLIDE_DURATION)
        return () => clearInterval(interval)
    }, [advanceImage, isSlideshowRunning])

    const handleExplore = () => scrollToTarget('experience')

    return (
        <>
            <PageLoader visible={isLoaderVisible} />
            <section
                ref={heroRef}
                id="home"
                className="relative min-h-svh flex items-center justify-center overflow-hidden bg-ocean-deep"
                aria-label="Welcome to Adam's Staycation"
            >
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
                    <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/45 to-ocean-deep/75" />
                </div>
    
                {!prefersReducedMotion && (
                    <Particles
                        paused={!isHeroActive}
                        className="absolute inset-0 z-[1]"
                        quantity={50}
                        staticity={30}
                        ease={50}
                    />
                )}
    
                <DotPattern className="z-[2] opacity-20 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
    
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sand-light/30 z-[3]" />
    
                {/* Server-rendered for SEO; re-keyed to replay the entrance after the loader */}
                <Fragment key={contentKey}>
                    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                        <div className="animate-blur-fade-in motion-reduce:animate-none [animation-delay:240ms]">
                            <TextAnimate
                                as="h1"
                                animation="blurInUp"
                                by="character"
                                className="font-display text-[2.6rem] md:text-7xl lg:text-8xl text-white mb-6 tracking-tight whitespace-nowrap [text-shadow:2px_4px_8px_rgba(0,0,0,0.3)]"
                            >
                                Adam&apos;s Staycation
                            </TextAnimate>
                        </div>
        
                        <div className="animate-blur-fade-in motion-reduce:animate-none [animation-delay:340ms]">
                            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light">
                                Your Luxury Escape at Tambuli Seaside Living
                            </p>
                        </div>
        
                        <div className="animate-blur-fade-in motion-reduce:animate-none [animation-delay:440ms]">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 mb-12">
                                <MapPin className="w-4 h-4" aria-hidden="true" />
                                <span className="text-sm md:text-base font-medium">Lapu-Lapu City, Cebu</span>
                            </div>
                        </div>
        
                        <div className="animate-blur-fade-in motion-reduce:animate-none [animation-delay:540ms]">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <AirbnbLink>
                                    <ShimmerButton
                                        className="h-14 px-8 text-lg font-medium"
                                        shimmerColor={CTA_SHIMMER}
                                        shimmerSize="0.1em"
                                        background={CTA_GRADIENT}
                                    >
                                        <span className="whitespace-pre-wrap text-center leading-none tracking-tight text-white">
                                            Book on Airbnb
                                        </span>
                                    </ShimmerButton>
                                </AirbnbLink>
                                <button
                                    type="button"
                                    onClick={handleExplore}
                                    className="px-8 py-4 glass-effect text-white text-lg font-medium rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                                    aria-label="Explore amenities section"
                                >
                                    Explore Amenities
                                </button>
                            </div>
                        </div>
                    </div>
        
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                        <div className="flex gap-2 w-48">
                            {heroImages.map((_, index) => (
                                <div key={index} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                                    {canAutoplay && index === currentImageIndex && (
                                        <div
                                            key={`progress-${currentImageIndex}-${cycle}`}
                                            className="h-full bg-white/70 rounded-full origin-left"
                                            style={{
                                                animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                                                animationPlayState: isSlideshowRunning ? 'running' : 'paused',
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        {canAutoplay && (
                            <button
                                type="button"
                                onClick={handleTogglePause}
                                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                                className="w-11 h-11 flex items-center justify-center rounded-full text-white/80 bg-white/10 border border-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            >
                                {isPaused ? (
                                    <Play className="w-3.5 h-3.5 translate-x-px" fill="currentColor" aria-hidden="true" />
                                ) : (
                                    <Pause className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true" />
                                )}
                            </button>
                        )}
                    </div>
        
                    <div className="animate-blur-fade-in motion-reduce:animate-none [animation-delay:740ms]">
                        <button
                            type="button"
                            onClick={handleExplore}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 z-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                            <span className="text-sm tracking-widest uppercase font-medium">Scroll to explore</span>
                            <ChevronDown className="w-6 h-6 animate-float motion-reduce:animate-none" aria-hidden="true" />
                        </button>
                    </div>
                </Fragment>
            </section>
        </>
    )
}

export default LandingSection
