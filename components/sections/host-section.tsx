import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin, type LucideIcon } from 'lucide-react'
import { CONTACT_EMAIL, MAPS_URL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import AirbnbLink from '@/components/shared/airbnb-link'
import { SectionEyebrow, SectionHeading } from '@/components/shared/section-heading'
import { RUST_CTA_SHIMMER } from '@/lib/theme'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2

interface ContactItem {
    icon: LucideIcon
    label: string
    value: string
    href: string
    ariaLabel: string
    external?: boolean
}

const contactInfo: ContactItem[] = [
    {
        icon: Mail,
        label: 'Email',
        value: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
        ariaLabel: `Email ${CONTACT_EMAIL}`,
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '0926-003-2484',
        href: 'tel:09260032484',
        ariaLabel: 'Call 0926-003-2484',
    },
    {
        icon: MapPin,
        label: 'Location',
        external: true,
        ariaLabel: 'Open Tambuli Seaside Living in Google Maps (opens in new tab)',
        value: 'Tambuli Seaside Living, Lapu-Lapu City, Cebu',
        href: MAPS_URL,
    },
]

const HostSection = () => {
    return (
        <section
            id="host"
            className="relative bg-sand-light overflow-hidden"
            aria-label="Meet the Owner"
        >
            <div className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24">
                <div className="grid lg:grid-cols-[minmax(0,26rem)_1fr] xl:grid-cols-[minmax(0,32rem)_1fr] gap-12 lg:gap-20 items-center">

                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-xl shadow-ocean-deep/10">
                            <Image
                                src="/images/studio/owner.jpg"
                                alt="Dale Nacario, property owner, standing in front of Taipei 101"
                                fill
                                sizes="(max-width: 1024px) 28rem, 32rem"
                                className="object-cover object-[50%_50%] bg-sand"
                            />
                        </div>
                    </BlurFade>

                    <div className="min-w-0">
                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                            <SectionEyebrow className="mb-6">Meet the Owner&nbsp;·&nbsp;Adam&apos;s Staycation</SectionEyebrow>
                        </BlurFade>

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                            <SectionHeading
                                lead="Your host,"
                                accent="Dale Nacario."
                                className="text-[2.75rem] md:text-6xl lg:text-[4rem] leading-[1.05] mb-8"
                            />
                        </BlurFade>

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 3} inView>
                            <p className="text-ocean/80 text-base md:text-[17px] leading-[1.75] max-w-lg mb-10">
                                Property owner and web designer, based in Cebu. Every detail of your stay has been personally curated for your comfort and relaxation. For rental inquiries or business proposals, reach out directly.
                            </p>
                        </BlurFade>

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 4} inView>
                            <ul className="border-t border-sand-dark/50 mb-10">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon
                                    const Arrow = item.external ? ArrowUpRight : ArrowRight
                                    return (
                                        <li key={item.label} className="border-b border-sand-dark/50">
                                            <a
                                                href={item.href}
                                                target={item.external ? '_blank' : undefined}
                                                rel={item.external ? 'noopener noreferrer' : undefined}
                                                className="group grid grid-cols-[1.25rem_1fr_auto] items-center gap-4 min-h-[56px] py-4 px-1 transition-colors duration-200 hover:bg-sand/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust/60 rounded-sm"
                                                aria-label={item.ariaLabel}
                                            >
                                                <span className="flex items-center justify-center">
                                                    <Icon
                                                        className="w-[18px] h-[18px] text-ocean transition-colors duration-200 group-hover:text-rust"
                                                        strokeWidth={1.75}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="sr-only">{item.label}</span>
                                                </span>
                                                <span className="text-ocean-deep text-[15px] md:text-base leading-snug break-words transition-colors duration-200 group-hover:text-rust">
                                                    {item.value}
                                                </span>
                                                <Arrow
                                                    className="w-4 h-4 text-rust transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                                                    strokeWidth={1.75}
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </BlurFade>

                        <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 5} inView>
                            <div className="flex flex-wrap items-center gap-3">
                                <AirbnbLink className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-sand-light">
                                    <ShimmerButton
                                        className="h-12 px-7 text-[15px] font-semibold border-transparent hover:brightness-110 transition-[filter] duration-200"
                                        shimmerColor={RUST_CTA_SHIMMER}
                                        shimmerSize="0.08em"
                                        background="var(--rust)"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                    >
                                        <span className="flex items-center gap-2 leading-none text-white">
                                            Book on Airbnb
                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </span>
                                    </ShimmerButton>
                                </AirbnbLink>

                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-ocean-deep/80 text-ocean-deep text-[15px] font-semibold transition-colors duration-200 hover:bg-ocean-deep hover:text-sand-light focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-sand-light"
                                    aria-label="Send email to property owner"
                                >
                                    Email me
                                </a>
                            </div>
                        </BlurFade>
                    </div>

                </div>
            </div>

            <footer className="border-t border-sand-dark/20 py-6 px-4 md:px-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="font-display text-xl text-ocean-deep">
                        Adam&apos;s Staycation
                    </span>
                    <p className="text-ocean/80 text-sm">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </footer>
        </section>
    )
}

export default HostSection
