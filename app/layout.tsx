import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, THEME_COLOR } from '@/lib/constants'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

const OG_IMAGE = {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: "Resort pool at Tambuli Seaside Living — Adam's Staycation, Lapu-Lapu City, Cebu",
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Adam's Staycation | Luxury Condo Rental at Tambuli Seaside Living, Cebu",
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
        'Cebu staycation',
        'Tambuli Seaside Living',
        'Tambuli resort rental',
        'Lapu-Lapu condo rental',
        'Mactan accommodation',
        'beach resort Cebu',
        'luxury condo rental Philippines',
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Adam's Staycation | Luxury Cebu Staycation",
        description: 'Your luxury escape at Tambuli Seaside Living — resort pool, private beach and gym access.',
        url: '/',
        siteName: SITE_NAME,
        type: 'website',
        locale: 'en_US',
        images: [OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Adam's Staycation | Luxury Cebu Staycation",
        description: 'Your luxury escape at Tambuli Seaside Living — resort pool, private beach and gym access.',
        images: [OG_IMAGE.url],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export const viewport: Viewport = {
    themeColor: THEME_COLOR,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="font-sans antialiased">
                {children}
                <Analytics />
            </body>
        </html>
    )
}
