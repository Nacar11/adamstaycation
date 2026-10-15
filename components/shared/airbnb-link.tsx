import type { ReactNode } from 'react'
import { AIRBNB_LISTING_URL } from '@/lib/constants'

interface AirbnbLinkProps {
    children: ReactNode
    className?: string
    ariaLabel?: string
}

// External link to the Airbnb listing (new tab, safe rel, descriptive label)
const AirbnbLink = ({ children, className, ariaLabel = 'Book your stay on Airbnb (opens in new tab)' }: AirbnbLinkProps) => (
    <a href={AIRBNB_LISTING_URL} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={className}>
        {children}
    </a>
)

export default AirbnbLink
