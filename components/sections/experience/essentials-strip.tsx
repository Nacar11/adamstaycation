import { Shield } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { allAmenities, safetyFeatures } from './data'
import { BASE_DELAY } from './constants'

// "Everything Included" amenity pills + safety row
const EssentialsStrip = () => (
    <div className="bg-white border-t border-sand-dark/10">
        <BlurFade delay={BASE_DELAY} inView>

            {/* — Section label — */}
            <div className="pt-8 pb-5 text-center">
                <span className="text-[10px] uppercase tracking-[0.35em] text-ocean/30 font-medium">Everything Included</span>
            </div>

            {/* — Amenities scrollable row — */}
            <div className="pb-7 relative">
                {/* Fade masks — desktop only */}
                <div className="absolute inset-y-0 left-0 w-10 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-10 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="overflow-x-auto px-5 md:px-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    {/* w-max + mx-auto: centred when the row fits, scrolls from the first pill when it doesn't */}
                    <div
                        className="flex flex-nowrap gap-0 w-max mx-auto"
                        role="list"
                        aria-label="Included amenities"
                    >
                        {allAmenities.map((amenity) => {
                            const Icon = amenity.icon
                            return (
                                <div
                                    key={amenity.title}
                                    role="listitem"
                                    className="flex-shrink-0 flex items-center gap-2 mx-2 px-4 py-2 rounded-full bg-sand-light border border-sand-dark/20 hover:bg-sand hover:border-sand-dark/35 transition-all duration-200 cursor-default"
                                >
                                    <Icon className="w-3.5 h-3.5 flex-shrink-0 text-coral/70" strokeWidth={1.5} aria-hidden="true" />
                                    <span className="text-xs font-medium tracking-wide whitespace-nowrap text-ocean/70">{amenity.title}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* — Safety row — */}
            <div className="border-t border-sand-dark/10 py-4 px-5 md:px-10">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Shield className="w-3.5 h-3.5 text-ocean/35" strokeWidth={1.5} aria-hidden="true" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-ocean/30 font-medium">Safety</span>
                    </div>
                    {safetyFeatures.map((feature, i) => (
                        <span key={feature} className="text-[11px] text-ocean/40 whitespace-nowrap">
                            {feature}{i < safetyFeatures.length - 1 && (
                                <span className="ml-6 text-ocean/20" aria-hidden="true">·</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>

        </BlurFade>
    </div>
)

export default EssentialsStrip
