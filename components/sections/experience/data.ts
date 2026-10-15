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
    accent: 'ocean' | 'coral'
}

export interface Amenity {
    icon: LucideIcon
    title: string
}

export interface RoomSpec {
    icon: LucideIcon
    value: number
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

export const featuredHighlights: FeaturedHighlight[] = [
    {
        image: '/images/experience/pool-beach-access.jpg',
        title: 'Pool & Beach Access',
        description: 'Multiple resort pools and private beach',
        accent: 'ocean'
    },
    {
        image: '/images/experience/luxury-amneties.jpg',
        title: 'Luxury Amenities',
        description: 'Fully equipped modern studio',
        accent: 'coral'
    },
    {
        image: '/images/experience/resort-living.jpg',
        title: 'Resort Living',
        description: '11-hectare seaside community',
        accent: 'ocean'
    },
    {
        image: '/images/experience/gym-access.jpg',
        title: 'Gym & Fitness',
        description: 'State-of-the-art fitness facilities',
        accent: 'coral'
    }
]

export const amenities: Amenity[] = [
    { icon: Wifi, title: 'High-Speed WiFi' },
    { icon: Waves, title: 'Pool Access' },
    { icon: Snowflake, title: 'Air Conditioning' },
    { icon: Palmtree, title: 'Beach Access' },
    { icon: ChefHat, title: 'Full Kitchen' },
    { icon: Tv, title: 'Smart TV' },
    { icon: Car, title: 'Free Parking' },
    { icon: Monitor, title: 'Workspace' },
    { icon: WashingMachine, title: 'Washer' },
    { icon: Dumbbell, title: 'Fitness Gym' },
]

export const safetyFeatures: string[] = [
    'Lock on bedroom door',
    'Security cameras (exterior)',
    'Smoke alarm',
    'Fire extinguisher',
    'First aid kit',
    'Noise monitors'
]

// Single source for room facts — rendered in the Dita grid and the JSON-LD listing
export const ROOM = { maxGuests: 3, queenBeds: 1, floorSizeSqm: 35 }

export const roomSpecs: RoomSpec[] = [
    { icon: Users, value: ROOM.maxGuests, label: 'Guests Max' },
    { icon: BedDouble, value: ROOM.queenBeds, label: 'Queen Bed' },
    { icon: Maximize, value: ROOM.floorSizeSqm, label: 'sqm Space' },
]

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
