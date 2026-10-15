import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

type ShimmerTone = 'light' | 'dark'

interface ImageShimmerProps {
    visible: boolean
    tone?: ShimmerTone
    className?: string
}

// Skeleton sweep (sand on light sections, ocean on dark) that fades out once the image is ready
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

interface ShimmerImageProps extends ImageProps {
    loaded: boolean
    tone?: ShimmerTone
}

// next/image that shows ImageShimmer until `loaded`, then fades the photo in
export const ShimmerImage = ({ loaded, tone, alt, className, ...props }: ShimmerImageProps) => (
    <>
        <ImageShimmer visible={!loaded} tone={tone} />
        <Image
            {...props}
            alt={alt}
            className={cn('transition-opacity duration-300 ease-out', loaded ? 'opacity-100' : 'opacity-0', className)}
        />
    </>
)
