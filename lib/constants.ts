/**
 * Application Constants
 * Centralized location for all application-wide constant values
 */

/**
 * Official Airbnb listing URL for Adam's Staycation
 * @see https://www.airbnb.com/rooms/1231044487009153160
 */
export const AIRBNB_LISTING_URL = 'https://www.airbnb.com/h/adamsstaycation'

/**
 * Contact email for property inquiries
 */
export const CONTACT_EMAIL = 'nacariodale@gmail.com'

/**
 * Canonical production origin — used for metadataBase, canonical URLs, sitemap, robots and JSON-LD
 */
export const SITE_URL = 'https://adamstaycation.business'

export const SITE_NAME = "Adam's Staycation"

export const SITE_DESCRIPTION =
    'Book your luxury staycation at Tambuli Seaside Living in Lapu-Lapu City, Cebu. A fully furnished studio with resort pool, private beach and gym access.'

/**
 * Browser UI colour (address bar on mobile) — matches the `ocean-deep` design token
 */
export const THEME_COLOR = '#0D2B33'

/**
 * Google Maps place link for Tambuli Seaside Living
 */
export const MAPS_URL =
    'https://www.google.com/maps/place/Tambuli+Seaside+Resort+and+Spa/@10.2899858,124.0020002,17z/data=!3m1!4b1!4m9!3m8!1s0x33a99732246dcbc5:0x61ef43a187a2080a!5m2!4m1!1i2!8m2!3d10.2899858!4d124.0068711!16s%2Fg%2F11h_3t257r?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D'

/**
 * Property location — used by the Host section and JSON-LD structured data
 */
export const PROPERTY_ADDRESS = {
    streetAddress: 'Tambuli Seaside Living, Dita Building, Buyong, Maribago',
    addressLocality: 'Lapu-Lapu City',
    addressRegion: 'Cebu',
    postalCode: '6015',
    addressCountry: 'PH',
}

// Taken from the Maps place link above
export const PROPERTY_GEO = { latitude: 10.2899858, longitude: 124.0068711 }
