'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
    Waves,
    Palmtree,
    Car,
    Wifi,
    ChefHat,
    Tv,
    Snowflake,
    Users,
    BedDouble,
    Maximize,
    ChevronLeft,
    ChevronRight,
    WashingMachine,
    Dumbbell,
    Monitor,
    Shield,
    Ticket,
    Calendar,
    Sparkles,
    Star,
    Check,
    LucideIcon
} from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { TextAnimate } from '@/components/ui/text-animate'
import { MagicCard } from '@/components/ui/magic-card'
import { BorderBeam } from '@/components/ui/border-beam'
import { DotPattern } from '@/components/ui/dot-pattern'
import { NumberTicker } from '@/components/ui/number-ticker'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { cn } from '@/lib/utils'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2

// Type definitions
interface FeaturedHighlight {
    image: string
    title: string
    description: string
    accentColor: string
    glowColor: string
}

interface Amenity {
    icon: LucideIcon
    title: string
    description: string
    size: 'normal' | 'featured'
    category: string
}

interface RoomSpec {
    icon: LucideIcon
    value: string
    numericValue?: number
    label: string
}

interface GalleryImage {
    src: string
    alt: string
}

interface GalleryCategory {
    id: string
    title: string
    description: string
    images: GalleryImage[]
}

interface GalleryGroup {
    id: string
    title: string
    categories: GalleryCategory[]
}

// Featured highlights - the "wow" factors with premium styling
const featuredHighlights: FeaturedHighlight[] = [
    {
        image: '/images/experience/pool-beach-access.jpg',
        title: 'Pool & Beach Access',
        description: 'Multiple resort pools and private beach',
        accentColor: '#1E4D5C',
        glowColor: 'rgba(30, 77, 92, 0.4)'
    },
    {
        image: '/images/experience/luxury-amneties.jpg',
        title: 'Luxury Amenities',
        description: 'Fully equipped modern studio',
        accentColor: '#E07A5F',
        glowColor: 'rgba(224, 122, 95, 0.4)'
    },
    {
        image: '/images/experience/resort-living.jpg',
        title: 'Resort Living',
        description: '11-hectare seaside community',
        accentColor: '#1E4D5C',
        glowColor: 'rgba(30, 77, 92, 0.4)'
    },
    {
        image: '/images/experience/gym-access.jpg',
        title: 'Gym & Fitness',
        description: 'State-of-the-art fitness facilities',
        accentColor: '#E07A5F',
        glowColor: 'rgba(224, 122, 95, 0.4)'
    }
]

// All amenities for bento grid
const allAmenities: Amenity[] = [
    { icon: Wifi, title: 'High-Speed WiFi', description: 'Work-ready internet', size: 'normal', category: 'essential' },
    { icon: Waves, title: 'Pool Access', description: 'Multiple resort pools', size: 'normal', category: 'resort' },
    { icon: Snowflake, title: 'Air Conditioning', description: 'Climate-controlled', size: 'normal', category: 'essential' },
    { icon: Palmtree, title: 'Beach Access', description: 'Private beach nearby', size: 'normal', category: 'resort' },
    { icon: ChefHat, title: 'Full Kitchen', description: 'Cook your own meals', size: 'normal', category: 'essential' },
    { icon: Tv, title: 'Smart TV', description: 'Netflix & streaming', size: 'normal', category: 'entertainment' },
    { icon: Car, title: 'Free Parking', description: 'Secure on-site', size: 'normal', category: 'essential' },
    { icon: Monitor, title: 'Workspace', description: 'Dedicated desk area', size: 'normal', category: 'work' },
    { icon: WashingMachine, title: 'Washer', description: 'In-unit laundry', size: 'normal', category: 'essential' },
    { icon: Dumbbell, title: 'Fitness Gym', description: 'Stay active', size: 'normal', category: 'wellness' },
]

// Safety features
const safetyFeatures: string[] = [
    'Lock on bedroom door',
    'Security cameras (exterior)',
    'Smoke alarm',
    'Fire extinguisher',
    'First aid kit',
    'Noise monitors'
]

// Room specifications
const roomSpecs: RoomSpec[] = [
    { icon: Users, value: '3', numericValue: 3, label: 'Guests Max' },
    { icon: BedDouble, value: '1', numericValue: 1, label: 'Queen Bed' },
    { icon: Maximize, value: '35', numericValue: 35, label: 'sqm Space' },
]

// Gallery groups
const galleryGroups: GalleryGroup[] = [
    {
        id: 'the-suite',
        title: 'The Suite',
        categories: [
            {
                id: 'studio',
                title: 'The Studio',
                description: 'Your luxury one-bedroom sanctuary',
                images: [
                    { src: '/images/studio/photo-gallery-studio-1.jpg', alt: 'Spacious studio with floor-to-ceiling curtains' },
                    { src: '/images/studio/photo-gallery-studio-2.jpg', alt: 'Cozy queen bed with wooden headboard' },
                    { src: '/images/studio/photo-gallery-studio-3.jpg', alt: 'Studio living area with elegant decor' },
                    { src: '/images/studio/photo-gallery-studio-4.jpg', alt: 'Studio interior with natural lighting' },
                    { src: '/images/studio/photo-gallery-studio-5.jpg', alt: 'Studio sleeping area with queen bed' },
                    { src: '/images/studio/photo-gallery-studio-6.jpg', alt: 'Studio entertainment and relaxation space' },
                    { src: '/images/studio/photo-gallery-studio-7.jpg', alt: 'Studio workspace and desk area' },
                    { src: '/images/studio/photo-gallery-studio-8.jpg', alt: 'Studio ambient evening lighting' },
                ],
            },
            {
                id: 'kitchen-dining',
                title: 'Kitchen & Dining',
                description: 'Fully equipped for your culinary needs',
                images: [
                    { src: '/images/kitchen/photo-gallery-kitchen-1.jpg', alt: 'Modern kitchen with full appliances' },
                    { src: '/images/kitchen/photo-gallery-kitchen-2.jpg', alt: 'Kitchen dining area setup' },
                ],
            },
            {
                id: 'bathroom',
                title: 'Bathroom',
                description: 'Modern and well-appointed',
                images: [
                    { src: '/images/bathroom/photo-gallery-bathroom-1.jpg', alt: 'Modern bathroom with rain shower' },
                    { src: '/images/bathroom/photo-gallery-bathroom-2.jpg', alt: 'Bathroom vanity and mirror area' },
                    { src: '/images/bathroom/photo-gallery-bathroom-3.jpg', alt: 'Bathroom amenities and fixtures' },
                ],
            },
            {
                id: 'balcony',
                title: 'Balcony',
                description: 'Private outdoor space with views',
                images: [
                    { src: '/images/balcony/photo-gallery-balcony-1.jpg', alt: 'Balcony with resort view' },
                    { src: '/images/balcony/photo-gallery-balcony-2.jpg', alt: 'Private balcony seating area' },
                    { src: '/images/balcony/photo-gallery-balcony-3.jpg', alt: 'Balcony sunset view' },
                ],
            },
        ],
    },
    {
        id: 'the-resort',
        title: 'The Resort',
        categories: [
            {
                id: 'frontdesk',
                title: 'Lobby & Reception',
                description: 'Professional reception and concierge service',
                images: [
                    { src: '/images/frontdesk/photo-gallery-frontdesk-1.jpg', alt: 'Front desk lobby seating' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-2.jpg', alt: 'Reception concierge counter' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-3.jpg', alt: 'Lobby lounge area' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-4.jpg', alt: 'Front desk information board' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-5.jpg', alt: 'Resort entrance and reception' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-6.jpg', alt: 'Front desk service area' },
                    { src: '/images/frontdesk/photo-gallery-frontdesk-7.jpg', alt: 'Resort welcome signage' },
                ],
            },
            {
                id: 'lounge',
                title: 'Lounge',
                description: 'Relax and unwind in style',
                images: [
                    { src: '/images/lounge/photo-gallery-lounge-1.jpg', alt: 'Resort lounge seating area' },
                    { src: '/images/lounge/photo-gallery-lounge-2.jpg', alt: 'Lounge relaxation space' },
                    { src: '/images/lounge/photo-gallery-lounge-3.jpg', alt: 'Lounge ambient lighting and seating' },
                    { src: '/images/lounge/photo-gallery-lounge-4.jpg', alt: 'Lounge panoramic view' },
                    { src: '/images/lounge/photo-gallery-lounge-5.jpg', alt: 'Lounge evening atmosphere' },
                ],
            },
            {
                id: 'pool',
                title: 'Pool',
                description: 'Multiple pools for your enjoyment',
                images: [
                    { src: '/images/pool/photo-gallery-pool-1.jpg', alt: 'Resort main swimming pool' },
                    { src: '/images/pool/photo-gallery-pool-2.jpg', alt: 'Pool lounge chairs and cabana' },
                    { src: '/images/pool/photo-gallery-pool-3.jpg', alt: 'Infinity pool with ocean view' },
                    { src: '/images/pool/photo-gallery-pool-4.jpg', alt: 'Pool area with tropical landscaping' },
                    { src: '/images/pool/photo-gallery-pool-5.jpg', alt: 'Evening pool with ambient lighting' },
                    { src: '/images/pool/photo-gallery-pool-6.jpg', alt: 'Lap pool for fitness swimming' },
                    { src: '/images/pool/photo-gallery-pool-7.jpg', alt: 'Pool deck and seating area' },
                ],
            },
            {
                id: 'beach',
                title: 'Beach',
                description: 'Private beach access steps away',
                images: [
                    { src: '/images/beach/photo-gallery-beach-1.jpg', alt: 'Beach shoreline and crystal waters' },
                    { src: '/images/beach/photo-gallery-beach-2.jpg', alt: 'Beach lounge area with umbrellas' },
                    { src: '/images/beach/photo-gallery-beach-3.jpg', alt: 'Seaside walking path' },
                    { src: '/images/beach/photo-gallery-beach-4.jpg', alt: 'Beach sunset panoramic view' },
                    { src: '/images/beach/photo-gallery-beach-5.jpg', alt: 'Beach palm trees and coastline' },
                    { src: '/images/beach/photo-gallery-beach-6.jpg', alt: 'Beachfront relaxation spot' },
                ],
            },
            {
                id: 'gym',
                title: 'Gym',
                description: 'State-of-the-art fitness facilities',
                images: [
                    { src: '/images/gym/photo-gallery-gym-1.jpg', alt: 'Fitness center main floor' },
                    { src: '/images/gym/photo-gallery-gym-2.jpg', alt: 'Cardio equipment area' },
                    { src: '/images/gym/photo-gallery-gym-4.jpg', alt: 'Gym stretching and yoga space' },
                    { src: '/images/gym/photo-gallery-gym-5.jpg', alt: 'Exercise machines row' },
                    { src: '/images/gym/photo-gallery-gym-6.jpg', alt: 'Gym locker and towel area' },
                    { src: '/images/gym/photo-gallery-gym-7.jpg', alt: 'Training equipment closeup' },
                ],
            },
        ],
    },
]

// Flatten all categories for state initialization
const allCategories = galleryGroups.flatMap((group) => group.categories)

// Premium Icon Component - Elegant outlined design with gradient glow
const PremiumIcon = ({
    icon: Icon,
    accentColor,
    glowColor,
    size = 'large'
}: {
    icon: LucideIcon
    accentColor: string
    glowColor: string
    size?: 'small' | 'large'
}) => {
    const sizeClasses = size === 'large'
        ? 'w-20 h-20'
        : 'w-14 h-14'
    const iconSize = size === 'large' ? 'w-9 h-9' : 'w-6 h-6'

    return (
        <div
            className={cn(
                sizeClasses,
                "relative flex items-center justify-center rounded-2xl",
                "bg-gradient-to-br from-white to-sand-light",
                "border-2 transition-all duration-300",
                "group-hover:scale-105"
            )}
            style={{
                borderColor: accentColor,
                boxShadow: `0 8px 32px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.5)`
            }}
        >
            {/* Inner glow */}
            <div
                className="absolute inset-2 rounded-xl opacity-20"
                style={{ backgroundColor: accentColor }}
            />
            <Icon
                className={cn(iconSize, "relative z-10")}
                style={{ color: accentColor }}
                strokeWidth={1.5}
                aria-hidden="true"
            />
        </div>
    )
}

const aboutCarouselImages = [
    '/images/about/about-kitchen.jpg',
    '/images/studio/photo-gallery-studio-1.jpg',
    '/images/studio/photo-gallery-studio-2.jpg',
    '/images/balcony/photo-gallery-balcony-1.jpg',
]

export default function ExperienceSection() {
    // About section carousel
    const [aboutIndex, setAboutIndex] = useState(0)

    const advanceAbout = useCallback(() => {
        setAboutIndex((prev) => (prev + 1) % aboutCarouselImages.length)
    }, [])

    useEffect(() => {
        const interval = setInterval(advanceAbout, 5000)
        return () => clearInterval(interval)
    }, [advanceAbout])

    const [activeGroupId, setActiveGroupId] = useState(galleryGroups[0].id)
    const [activeCategory, setActiveCategory] = useState(galleryGroups[0].categories[0].id)
    const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<string, number>>(
        Object.fromEntries(allCategories.map((cat) => [cat.id, 0]))
    )

    const activeGroup = galleryGroups.find((g) => g.id === activeGroupId) || galleryGroups[0]
    const activeGallery = activeGroup.categories.find((cat) => cat.id === activeCategory) || activeGroup.categories[0]
    const currentImageIndex = currentImageIndexes[activeCategory] || 0

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
        <section id="experience" className="relative overflow-hidden" aria-label="Experience Section">
            {/* ================================ */}
            {/* HERO INTRODUCTION */}
            {/* ================================ */}
            <div className="relative bg-gradient-to-br from-ocean-deep via-ocean to-ocean-deep py-24 md:py-32">
                {/* Dot Pattern Background */}
                <DotPattern
                    className={cn(
                        "absolute inset-0 opacity-10",
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                    )}
                    cr={1.5}
                    cx={1}
                    cy={1}
                />

                {/* Decorative Blurs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ocean-light/20 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="text-center">
                            {/* Badge */}
                            <div className="inline-flex items-center justify-center mb-6">
                                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium transition ease-out">
                                    <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                                    Tambuli Seaside Living, Cebu
                                </AnimatedShinyText>
                            </div>

                            {/* Title */}
                            <TextAnimate
                                animation="blurInUp"
                                by="word"
                                className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6"
                            >
                                The Experience
                            </TextAnimate>

                            <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                    Your luxury escape in an 11-hectare residential resort community
                                </p>
                            </BlurFade>
                        </div>
                    </BlurFade>

                    {/* Featured Highlights - Premium Design */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {featuredHighlights.map((highlight, index) => (
                            <BlurFade key={highlight.title} delay={BASE_DELAY + STAGGER_DELAY * (index + 2)} inView>
                                <MagicCard
                                    className="group relative p-8 bg-white rounded-3xl border border-sand-dark/10 cursor-default h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    gradientColor="rgba(30, 77, 92, 0.08)"
                                    gradientSize={200}
                                >
                                    {/* Feature Image */}
                                    <div className="mb-6 relative w-32 h-32 rounded-2xl overflow-hidden border-2 shadow-lg group-hover:scale-105 transition-transform duration-300"
                                        style={{
                                            borderColor: highlight.accentColor,
                                            boxShadow: `0 8px 32px ${highlight.glowColor}`
                                        }}
                                    >
                                        <Image
                                            src={highlight.image}
                                            alt={highlight.title}
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                            priority
                                        />
                                    </div>

                                    <h3 className="text-xl font-semibold text-ocean-deep mb-2">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-ocean/70 leading-relaxed">
                                        {highlight.description}
                                    </p>
                                </MagicCard>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================================ */}
            {/* ABOUT SECTION */}
            {/* ================================ */}
            <div className="bg-sand-light py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-sand-dark/10">
                            <BorderBeam size={250} duration={12} delay={0} colorFrom="#E07A5F" colorTo="#1E4D5C" />

                            <div className="grid lg:grid-cols-2">
                                {/* Left - Content */}
                                <div className="p-10 md:p-14 lg:p-16">
                                    {/* Eyebrow Label */}
                                    <p className="text-ocean/50 text-xs uppercase tracking-wider font-medium mb-4">
                                        Your Stay
                                    </p>

                                    {/* Heading with coral accent bar */}
                                    <h3 className="font-display text-3xl md:text-4xl text-ocean-deep mb-6 border-l-4 border-coral pl-4">
                                        Welcome to Adam&apos;s Staycation
                                    </h3>

                                    {/* Description callout */}
                                    <div className="bg-ocean-light/40 rounded-xl p-5 mb-8">
                                        <p className="text-ocean/80 text-base leading-relaxed">
                                            Your staycation is located at the <strong className="text-ocean-deep">Dita Building</strong> of
                                            Tambuli Seaside Living in Lapu-Lapu City, Cebu. A fully-furnished studio
                                            with resort-style amenities awaits you — here&apos;s how to get settled in.
                                        </p>
                                    </div>

                                    {/* Check-in Steps */}
                                    <div className="bg-sand/40 rounded-2xl p-6 space-y-5">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-9 h-9 rounded-full bg-coral flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
                                                    1
                                                </div>
                                                <div className="w-px flex-1 bg-sand-dark/30 mt-2" />
                                            </div>
                                            <div className="pb-5">
                                                <h4 className="font-semibold text-ocean-deep mb-1">Arrive at Tambuli</h4>
                                                <p className="text-ocean/70 text-sm leading-relaxed">
                                                    Head to the Dita Building entrance. Let the security guard know
                                                    you&apos;re a booked guest for your scheduled stay.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-9 h-9 rounded-full bg-coral flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
                                                    2
                                                </div>
                                                <div className="w-px flex-1 bg-sand-dark/30 mt-2" />
                                            </div>
                                            <div className="pb-5">
                                                <h4 className="font-semibold text-ocean-deep mb-1">Check In at the Lobby</h4>
                                                <p className="text-ocean/70 text-sm leading-relaxed">
                                                    Proceed to the front desk and sign in the log book. The host
                                                    will verify your reservation details.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-9 h-9 rounded-full bg-ocean flex items-center justify-center flex-shrink-0 shadow-md">
                                                    <Check className="w-5 h-5 text-white" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-ocean-deep mb-1">Settle Into Your Suite</h4>
                                                <p className="text-ocean/70 text-sm leading-relaxed">
                                                    Head up to your fully-furnished studio — it&apos;s open and
                                                    ready for you. Make yourself at home!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - Sliding Carousel + Room Specs */}
                                <div className="flex flex-col">
                                    {/* Image Carousel — 4/5 of right panel */}
                                    <div className="relative flex-[4] min-h-[280px] lg:min-h-0 overflow-hidden">
                                        <div
                                            className="flex h-full transition-transform duration-700 ease-out"
                                            style={{ transform: `translateX(-${aboutIndex * 100}%)` }}
                                        >
                                            {aboutCarouselImages.map((src, index) => (
                                                <img
                                                    key={src}
                                                    src={src}
                                                    alt=""
                                                    className="w-full h-full object-cover flex-shrink-0"
                                                />
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ocean-deep/60 pointer-events-none" />
                                    </div>

                                    {/* Room Specs — 1/3 of right panel */}
                                    <div className="bg-gradient-to-br from-ocean-deep to-ocean px-8 py-6 md:px-12 md:py-8 lg:px-14 lg:py-8 flex-1 flex flex-col justify-center">
                                        <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4 font-medium">
                                            Room Specifications
                                        </h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {roomSpecs.map((spec) => {
                                                const Icon = spec.icon
                                                return (
                                                    <div key={spec.label} className="text-center">
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 mx-auto mb-2">
                                                            <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                                        </div>
                                                        <span className="text-2xl font-display text-white font-bold block">
                                                            {spec.numericValue ? (
                                                                <NumberTicker value={spec.numericValue} className="text-white" />
                                                            ) : (
                                                                spec.value
                                                            )}
                                                        </span>
                                                        <p className="text-white/50 text-xs font-medium mt-0.5">{spec.label}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* ================================ */}
            {/* AMENITIES BENTO GRID */}
            {/* ================================ */}
            <div className="bg-white py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="text-center mb-16">
                            <span className="inline-block px-5 py-2 bg-ocean-light rounded-full text-ocean text-sm font-semibold mb-5 tracking-wide">
                                Everything You Need
                            </span>
                            <TextAnimate
                                animation="fadeIn"
                                by="word"
                                className="font-display text-3xl md:text-4xl lg:text-5xl text-ocean-deep font-bold"
                            >
                                What This Place Offers
                            </TextAnimate>
                        </div>
                    </BlurFade>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                        {allAmenities.map((amenity, index) => {
                            const Icon = amenity.icon
                            const isFeatured = amenity.size === 'featured'
                            const accentColor = isFeatured ? '#1E4D5C' : '#1E4D5C'
                            const glowColor = isFeatured ? 'rgba(30, 77, 92, 0.3)' : 'rgba(30, 77, 92, 0.15)'

                            return (
                                <BlurFade key={amenity.title} delay={BASE_DELAY + STAGGER_DELAY * index * 0.3} inView>
                                    <MagicCard
                                        className={cn(
                                            "group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-default h-full",
                                            isFeatured
                                                ? "bg-white hover:!bg-ocean-deep text-ocean-deep hover:!text-white col-span-2 row-span-2 p-8 border-2 border-ocean/20 hover:border-white/30 shadow-lg hover:shadow-2xl"
                                                : "bg-sand-light hover:bg-white text-ocean-deep p-6 border border-sand-dark/20 hover:border-ocean/20"
                                        )}
                                        gradientColor={isFeatured ? "transparent" : "rgba(30, 77, 92, 0.1)"}
                                        gradientSize={isFeatured ? 0 : 150}
                                    >
                                        {/* Premium Icon Container */}
                                        <div className={cn(
                                            "flex items-center justify-center transition-transform duration-300 mb-4",
                                            isFeatured ? "mb-5" : ""
                                        )}>
                                            {isFeatured ? (
                                                <div
                                                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-ocean/5 group-hover:bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-ocean/20 group-hover:border-white/30 transition-all duration-500"
                                                    style={{ boxShadow: '0 8px 32px rgba(30, 77, 92, 0.1)' }}
                                                >
                                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-ocean-deep group-hover:text-white transition-colors duration-500" strokeWidth={1.5} aria-hidden="true" />
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-105"
                                                    style={{
                                                        borderColor: accentColor,
                                                        boxShadow: `0 4px 16px ${glowColor}`
                                                    }}
                                                >
                                                    <Icon
                                                        className="w-6 h-6"
                                                        style={{ color: accentColor }}
                                                        strokeWidth={1.5}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={isFeatured ? "space-y-2 relative z-10" : "space-y-1"}>
                                            <h4 className={cn(
                                                "font-semibold leading-tight transition-colors duration-500",
                                                isFeatured ? "text-xl md:text-2xl mb-2" : "text-sm md:text-base"
                                            )}>
                                                {amenity.title}
                                            </h4>
                                            <p className={cn(
                                                "leading-snug transition-colors duration-500",
                                                isFeatured ? "text-ocean/70 group-hover:text-white/90 text-base" : "text-ocean/60 text-xs md:text-sm"
                                            )}>
                                                {amenity.description}
                                            </p>
                                        </div>


                                    </MagicCard>
                                </BlurFade>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ================================ */}
            {/* SAFETY & SECURITY */}
            {/* ================================ */}
            <div className="bg-sand-light py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <MagicCard
                            className="bg-white rounded-3xl p-10 md:p-14 border border-sand-dark/10"
                            gradientColor="rgba(16, 185, 129, 0.1)"
                            gradientSize={400}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                                <div className="lg:w-1/3">
                                    <div
                                        className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 border-2"
                                        style={{
                                            borderColor: '#10B981',
                                            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
                                        }}
                                    >
                                        <Shield className="w-8 h-8" style={{ color: '#10B981' }} strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <h3 className="font-display text-2xl md:text-3xl text-ocean-deep mb-3 font-bold">
                                        Your Safety Matters
                                    </h3>
                                    <p className="text-ocean/70 leading-relaxed">
                                        Essential safety features for your peace of mind during your stay.
                                    </p>
                                </div>

                                <div className="lg:w-2/3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {safetyFeatures.map((feature, index) => (
                                            <BlurFade key={feature} delay={BASE_DELAY + STAGGER_DELAY * index * 0.5} inView>
                                                <div className="flex items-center gap-3 p-4 bg-sand-light hover:bg-emerald-50/50 rounded-xl transition-colors duration-300 border border-sand-dark/10">
                                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                                                    </div>
                                                    <span className="text-ocean-deep text-sm font-medium">{feature}</span>
                                                </div>
                                            </BlurFade>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </BlurFade>
                </div>
            </div>

            {/* ================================ */}
            {/* RESORT ACCESS PROMO */}
            {/* ================================ */}
            <div className="bg-white py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="text-center mb-14">
                            <AnimatedShinyText className="inline-block px-5 py-2 bg-coral/10 rounded-full text-coral text-sm font-semibold mb-5 tracking-wide">
                                <Sparkles className="w-4 h-4 inline mr-2" aria-hidden="true" />
                                Special Offer
                            </AnimatedShinyText>
                            <TextAnimate
                                animation="fadeIn"
                                by="word"
                                className="font-display text-3xl md:text-4xl lg:text-5xl text-ocean-deep font-bold"
                            >
                                Resort Amenities Access
                            </TextAnimate>
                        </div>
                    </BlurFade>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Extended Stay - Featured */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coral via-coral to-orange-500 p-10 md:p-12 text-white shadow-2xl shadow-coral/30">
                                <BorderBeam size={200} duration={10} colorFrom="#ffffff" colorTo="#ffffff" />

                                {/* Decorative circles */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                                <div className="relative">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
                                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                                        Best Value
                                    </div>
                                    <h4 className="text-3xl md:text-4xl font-display mb-4 font-bold">Extended Stay Promo</h4>
                                    <p className="text-white/95 text-lg mb-8 max-w-md leading-relaxed">
                                        Book for a <strong className="text-white font-bold">minimum of 3 weeks</strong> (negotiable) and enjoy <strong className="text-white font-bold">FREE access</strong> to all resort amenities!
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20">
                                        <Calendar className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                                        <span className="font-semibold text-base">3+ Weeks = FREE Resort Access</span>
                                    </div>
                                </div>
                            </div>
                        </BlurFade>

                        {/* Day Pass */}
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                            <MagicCard
                                className="relative overflow-hidden rounded-3xl bg-sand-light border-2 border-sand-dark/20 p-10 md:p-12 h-full"
                                gradientColor="rgba(30, 77, 92, 0.1)"
                                gradientSize={300}
                            >
                                <div className="flex items-start gap-5 mb-8">
                                    <div
                                        className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border-2"
                                        style={{
                                            borderColor: '#1E4D5C',
                                            boxShadow: '0 8px 32px rgba(30, 77, 92, 0.2)'
                                        }}
                                    >
                                        <Ticket className="w-8 h-8 text-ocean" strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-display text-ocean-deep mb-1 font-bold">Day Use Passes</h4>
                                        <p className="text-ocean/60 font-medium">For short-term stays</p>
                                    </div>
                                </div>
                                <p className="text-ocean/70 mb-8 leading-relaxed">
                                    Enjoy all resort amenities including pools, beach, and gym facilities with convenient day use passes.
                                </p>
                                <div className="flex items-baseline gap-2 p-6 bg-white rounded-2xl border border-sand-dark/20 shadow-sm">
                                    <span className="text-5xl font-display text-ocean-deep font-bold">
                                        ₱<NumberTicker value={900} className="text-ocean-deep" />
                                    </span>
                                    <span className="text-ocean/60 font-medium">/ person / day</span>
                                </div>
                            </MagicCard>
                        </BlurFade>
                    </div>
                </div>
            </div>

            {/* ================================ */}
            {/* PHOTO GALLERY */}
            {/* ================================ */}
            <div className="bg-ocean-deep py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-5 md:px-10">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="text-center mb-12">
                            <TextAnimate
                                animation="blurInUp"
                                by="word"
                                className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4 font-bold"
                            >
                                Photo Gallery
                            </TextAnimate>
                            <p className="text-white/70 text-lg max-w-2xl mx-auto">
                                Explore every corner of your future staycation
                            </p>
                        </div>
                    </BlurFade>

                    {/* Group Tabs */}
                    <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-1.5" role="tablist" aria-label="Gallery groups">
                                {galleryGroups.map((group) => (
                                    <button
                                        key={group.id}
                                        onClick={() => handleGroupChange(group.id)}
                                        role="tab"
                                        aria-selected={activeGroupId === group.id}
                                        className={cn(
                                            "px-6 py-2.5 md:px-8 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300",
                                            activeGroupId === group.id
                                                ? "bg-white text-ocean-deep shadow-lg shadow-white/20"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        {group.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </BlurFade>

                    {/* Category Pills */}
                    <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 1.5} inView>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" role="tablist" aria-label="Gallery categories">
                            {activeGroup.categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    role="tab"
                                    aria-selected={activeCategory === category.id}
                                    className={cn(
                                        "px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                        activeCategory === category.id
                                            ? "bg-coral text-white shadow-lg shadow-coral/30"
                                            : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                                    )}
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>
                    </BlurFade>

                    {/* Gallery Carousel */}
                    <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                        <div
                            className="relative rounded-3xl overflow-hidden group"
                            role="tabpanel"
                            id={`gallery-panel-${activeCategory}`}
                            aria-label={`${activeGallery.title} gallery`}
                        >
                            <div
                                className="aspect-[3/4] md:aspect-[16/9] relative bg-ocean"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <img
                                    key={`${activeCategory}-${currentImageIndex}`}
                                    src={activeGallery.images[currentImageIndex].src}
                                    alt={activeGallery.images[currentImageIndex].alt}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />

                                {/* Image info */}
                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                    <div>
                                        <h4 className="text-white font-semibold text-lg mb-1">{activeGallery.title}</h4>
                                        <p className="text-white/80 text-sm hidden md:block">{activeGallery.description}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/10 hidden md:block">
                                        {currentImageIndex + 1} / {activeGallery.images.length}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            {activeGallery.images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-xl focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white hidden md:flex"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm items-center justify-center text-ocean-deep opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-xl focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white hidden md:flex"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2" role="group" aria-label="Gallery image navigation">
                                        {activeGallery.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleDotClick(index)}
                                                aria-current={index === currentImageIndex ? 'true' : undefined}
                                                aria-label={`Image ${index + 1} of ${activeGallery.images.length}`}
                                                className={cn(
                                                    "h-2 rounded-full transition-all duration-300",
                                                    index === currentImageIndex
                                                        ? "bg-white w-8"
                                                        : "bg-white/40 hover:bg-white/60 w-2"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}