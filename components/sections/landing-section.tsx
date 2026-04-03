'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import { AIRBNB_LISTING_URL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { TextAnimate } from '@/components/ui/text-animate'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { Particles } from '@/components/ui/particles'
import { cn } from '@/lib/utils'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2
const SLIDE_DURATION = 7000

const heroImages = [
    { src: '/images/banner/landing-page-1.jpg', origin: '70% 40%' },
    { src: '/images/banner/landing-page-2.jpg', origin: '50% 30%' },
    { src: '/images/banner/landing-page-3.jpg', origin: '40% 70%' },
]

export default function LandingSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const advanceImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, [])

    useEffect(() => {
        const interval = setInterval(advanceImage, SLIDE_DURATION)
        return () => clearInterval(interval)
    }, [advanceImage])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            scrollToSection(id)
        }
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Welcome to Adam's Staycation"
        >
            {/* Ken Burns Background Carousel */}
            <div className="absolute inset-0" aria-hidden="true">
                {heroImages.map((img, index) => (
                    <div
                        key={img.src}
                        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                        style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                    >
                        <img
                            src={img.src}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover will-change-transform"
                            style={{
                                transformOrigin: img.origin,
                                transform: index === currentImageIndex ? 'scale(1.15)' : 'scale(1)',
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

            {/* Particles Background Effect */}
            <Particles
                className="absolute inset-0 z-[1]"
                quantity={50}
                staticity={30}
                ease={50}
                color="#ffffff"
            />

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

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Animated Title */}
                <BlurFade delay={BASE_DELAY} inView>
                    <TextAnimate
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
                        {index === currentImageIndex && (
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
        </section>
    )
}
