import {
    AIRBNB_LISTING_URL,
    PROPERTY_ADDRESS,
    PROPERTY_GEO,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_URL,
} from '@/lib/constants'
import { ROOM, amenities, galleryGroups } from '@/components/sections/experience/data'

// Studio + resort photos as absolute URLs (schema.org consumers require absolute image URLs)
const listingImages = galleryGroups
    .flatMap((group) => group.categories.flatMap((category) => category.images))
    .slice(0, 12)
    .map((image) => `${SITE_URL}${image.src}`)

const vacationRental = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    '@id': `${SITE_URL}/#listing`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: listingImages,
    sameAs: [AIRBNB_LISTING_URL],
    address: {
        '@type': 'PostalAddress',
        ...PROPERTY_ADDRESS,
    },
    geo: {
        '@type': 'GeoCoordinates',
        ...PROPERTY_GEO,
    },
    containsPlace: {
        '@type': 'Accommodation',
        additionalType: 'EntirePlace',
        occupancy: {
            '@type': 'QuantitativeValue',
            maxValue: ROOM.maxGuests,
        },
        numberOfRooms: 1,
        bed: {
            '@type': 'BedDetails',
            numberOfBeds: ROOM.queenBeds,
            typeOfBed: 'Queen',
        },
        floorSize: {
            '@type': 'QuantitativeValue',
            value: ROOM.floorSizeSqm,
            unitCode: 'MTK',
        },
        amenityFeature: amenities.map((amenity) => ({
            '@type': 'LocationFeatureSpecification',
            name: amenity.title,
            value: true,
        })),
    },
}

// Escape `<` so listing text can never close the script tag early
const serialize = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')

// Server-rendered JSON-LD describing the listing for search engines
const StructuredData = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(vacationRental) }}
    />
)

export default StructuredData
