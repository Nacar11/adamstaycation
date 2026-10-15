import { cn } from '@/lib/utils'

interface ImageShimmerProps {
    visible: boolean
    /** `light` sweeps over sand (light sections); `dark` sweeps over ocean (dark sections) */
    tone?: 'light' | 'dark'
    className?: string
}

// Skeleton placeholder for images: a soft light sweep over sand, cross-fading out once the image is ready
export const ImageShimmer = ({ visible, tone = 'light', className }: ImageShimmerProps) => (
    <div
        aria-hidden="true"
        className={cn(
            'absolute inset-0 overflow-hidden transition-opacity duration-300 ease-out pointer-events-none',
            tone === 'light' ? 'bg-sand' : 'bg-ocean',
            visible ? 'opacity-100' : 'opacity-0',
            className
        )}
    >
        <div
            className={cn(
                'absolute inset-0 -translate-x-full animate-skeleton-shimmer bg-gradient-to-r from-transparent to-transparent motion-reduce:hidden',
                tone === 'light' ? 'via-sand-light/70' : 'via-sand-light/10'
            )}
        />
    </div>
)
