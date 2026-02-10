import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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

export const metadata: Metadata = {
    title: 'Dale\'s Staycation | Luxury Condo Rental at Tambuli Seaside Living, Cebu',
    description: 'Book your luxury staycation at Tambuli Seaside Living in Lapu-Lapu City, Cebu. One bedroom condo with pool access, beach access, and resort amenities.',
    keywords: 'Cebu staycation, Tambuli resort rental, Lapu-Lapu condo, Mactan accommodation, beach resort Cebu, luxury condo rental Philippines',
    openGraph: {
        title: 'Dale\'s Staycation | Luxury Cebu Staycation',
        description: 'Your luxury escape at Tambuli Seaside Living',
        url: 'https://dalestaycation.com',
        siteName: 'Dale\'s Staycation',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dale\'s Staycation | Luxury Cebu Staycation',
        description: 'Your luxury escape at Tambuli Seaside Living',
    },
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
            </body>
        </html>
    )
}
