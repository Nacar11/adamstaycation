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
    WashingMachine,
    Dumbbell,
    Monitor,
    type LucideIcon,
} from 'lucide-react'

export interface FeaturedHighlight {
    image: string
    title: string
    description: string
    accentColor: string
}

export interface Amenity {
    icon: LucideIcon
    title: string
    description: string
    size: 'normal' | 'featured'
    category: string
}

export interface RoomSpec {
    icon: LucideIcon
    value: string
    numericValue?: number
    label: string
}

export interface GalleryImage {
    src: string
    alt: string
}

export interface GalleryCategory {
    id: string
    title: string
    description: string
    images: GalleryImage[]
}

export interface GalleryGroup {
    id: string
    title: string
    categories: GalleryCategory[]
}

// Featured highlights - the "wow" factors with premium styling
export const featuredHighlights: FeaturedHighlight[] = [
    {
        image: '/images/experience/pool-beach-access.jpg',
        title: 'Pool & Beach Access',
        description: 'Multiple resort pools and private beach',
        accentColor: '#1E4D5C'
    },
    {
        image: '/images/experience/luxury-amneties.jpg',
        title: 'Luxury Amenities',
        description: 'Fully equipped modern studio',
        accentColor: '#E07A5F'
    },
    {
        image: '/images/experience/resort-living.jpg',
        title: 'Resort Living',
        description: '11-hectare seaside community',
        accentColor: '#1E4D5C'
    },
    {
        image: '/images/experience/gym-access.jpg',
        title: 'Gym & Fitness',
        description: 'State-of-the-art fitness facilities',
        accentColor: '#E07A5F'
    }
]

// Amenities shown in the "Everything Included" strip
export const allAmenities: Amenity[] = [
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
export const safetyFeatures: string[] = [
    'Lock on bedroom door',
    'Security cameras (exterior)',
    'Smoke alarm',
    'Fire extinguisher',
    'First aid kit',
    'Noise monitors'
]

// Room specifications
export const roomSpecs: RoomSpec[] = [
    { icon: Users, value: '3', numericValue: 3, label: 'Guests Max' },
    { icon: BedDouble, value: '1', numericValue: 1, label: 'Queen Bed' },
    { icon: Maximize, value: '35', numericValue: 35, label: 'sqm Space' },
]

// Gallery groups
export const galleryGroups: GalleryGroup[] = [
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
export const allCategories = galleryGroups.flatMap((group) => group.categories)

export const resortAccessImages: GalleryImage[] = [
    { src: '/images/pool/photo-gallery-pool-1.jpg', alt: 'Resort swimming pool at Tambuli Seaside Living' },
    { src: '/images/beach/photo-gallery-beach-1.jpg', alt: 'Private beach access at Tambuli Seaside Living' },
    { src: '/images/pool/photo-gallery-pool-3.jpg', alt: 'Outdoor pool with sea view' },
    { src: '/images/beach/photo-gallery-beach-3.jpg', alt: 'Beachfront shoreline at Tambuli' },
    { src: '/images/gym/photo-gallery-gym-1.jpg', alt: 'Fully equipped fitness gym' },
    { src: '/images/pool/photo-gallery-pool-5.jpg', alt: 'Pool lounge area at the resort' },
    { src: '/images/beach/photo-gallery-beach-5.jpg', alt: 'Beach view from Tambuli Seaside Living' },
    { src: '/images/gym/photo-gallery-gym-2.jpg', alt: 'Gym facilities and equipment' },
]

export const aboutGridImages: GalleryImage[] = [
    { src: '/images/studio/photo-gallery-studio-1.jpg', alt: 'Studio living space with floor-to-ceiling curtains' },
    { src: '/images/studio/photo-gallery-studio-2.jpg', alt: 'Cozy queen bed with wooden headboard' },
    { src: '/images/studio/photo-gallery-studio-4.jpg', alt: 'Studio interior with natural lighting' },
    { src: '/images/studio/photo-gallery-studio-5.jpg', alt: 'Studio sleeping area' },
]

// Dita Building intro — bolded lead + supporting detail
export const aboutHighlights = [
    {
        highlight: 'Fully furnished & move-in ready.',
        detail: 'Queen bed, full kitchen, smart TV, washer — nothing missing.',
    },
    {
        highlight: 'Resort pools, beach & gym.',
        detail: "Step outside and it's all yours — no drive, no hassle.",
    },
    {
        highlight: 'Warm, private, and personal.',
        detail: 'Curated touches that make it feel like home.',
    },
]

// Arrival steps shown under the Dita Building intro
export const arrivalSteps = [
    {
        title: 'Arrive at Tambuli',
        body: "Head to the Dita Building entrance. Let the security guard know you're a booked guest for your scheduled stay.",
    },
    {
        title: 'Settle Into Your Suite',
        body: "Head up to your fully-furnished studio — it's open and ready for you. Make yourself at home!",
    },
]
