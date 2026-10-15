import Image from 'next/image'
import { Camera } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { cn } from '@/lib/utils'
import { featuredHighlights, type FeaturedHighlight } from './data'
import { BASE_DELAY, HIGHLIGHT_SIZES, STAGGER_DELAY } from './constants'

// Full class strings so Tailwind can see them
const ACCENT_BAR_CLASS: Record<FeaturedHighlight['accent'], string> = {
    ocean: 'bg-ocean',
    coral: 'bg-coral',
}

// Experience intro + 2×2 full-bleed highlight cards
const ExperienceHighlights = () => (
    <div className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
            <BlurFade delay={BASE_DELAY} inView>
                <div className="max-w-4xl mb-14">
                    <p className="text-rust text-xs uppercase tracking-[0.22em] mb-5 font-semibold">
                        The Experience&nbsp;·&nbsp;Tambuli Seaside Living, Cebu
                    </p>
                    <h2 className="font-display text-ocean-deep text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight mb-6">
                        Your luxury{' '}
                        <em className="text-rust whitespace-nowrap">escape at Tambuli.</em>
                    </h2>
                    <p className="text-ocean/80 text-base md:text-[17px] leading-[1.75] max-w-2xl">
                        An 11-hectare residential resort community on the shores of Cebu — every amenity, every comfort, within reach.
                    </p>
                </div>
            </BlurFade>

            {/* Featured Highlights - Full-Bleed Image Cards (2×2 grid) */}
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {featuredHighlights.map((highlight, index) => {
                    const isPersonalPhoto = index >= 2
                    return (
                        <BlurFade key={highlight.title} delay={BASE_DELAY + STAGGER_DELAY * (index + 2)} inView>
                            <div
                                className={cn(
                                    "group relative overflow-hidden rounded-3xl cursor-default",
                                    "shadow-xl hover:shadow-2xl transition-shadow duration-500",
                                    isPersonalPhoto
                                        ? "h-[380px] md:h-[500px]"
                                        : "h-[300px] md:h-[400px]"
                                )}
                            >
                                {/* Full-bleed image */}
                                <Image
                                    src={highlight.image}
                                    alt={highlight.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes={HIGHLIGHT_SIZES}
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 group-hover:from-black/70 transition-all duration-500" />

                                {/* Personal collection badge */}
                                {isPersonalPhoto && (
                                    <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/25">
                                        <Camera className="w-3.5 h-3.5 text-white" strokeWidth={2} aria-hidden="true" />
                                        <span className="text-white text-xs font-medium tracking-wide">Personal Collection</span>
                                    </div>
                                )}

                                {/* Accent underline */}
                                <div className={cn("absolute bottom-0 left-0 right-0 h-[3px]", ACCENT_BAR_CLASS[highlight.accent])} />

                                {/* Text content */}
                                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                                    <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-2 drop-shadow-lg leading-tight">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-white/75 text-sm md:text-base leading-relaxed">
                                        {highlight.description}
                                    </p>
                                </div>
                            </div>
                        </BlurFade>
                    )
                })}
            </div>
        </div>
    </div>
)

export default ExperienceHighlights
