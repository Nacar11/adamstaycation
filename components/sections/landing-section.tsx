'use client'

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

export default function LandingSection() {
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
            aria-label="Welcome to Dale's Staycation"
        >
            {/* Background with gradient overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(13, 43, 51, 0.5), rgba(13, 43, 51, 0.8)), 
                        url('https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                }}
            />

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
                        className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight"
                        style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.3)' }}
                    >
                        Dale&apos;s Staycation
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
