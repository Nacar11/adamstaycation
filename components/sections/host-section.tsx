'use client'

import Image from 'next/image'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { AIRBNB_LISTING_URL, CONTACT_EMAIL } from '@/lib/constants'
import { BlurFade } from '@/components/ui/blur-fade'
import { TextAnimate } from '@/components/ui/text-animate'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { MagicCard } from '@/components/ui/magic-card'

const STAGGER_DELAY = 0.1
const BASE_DELAY = 0.2

// Contact information for business cards
const contactInfo = [
    { 
        icon: Mail, 
        label: 'Email', 
        value: 'nacariodale@gmail.com',
        href: 'mailto:nacariodale@gmail.com'
    },
    { 
        icon: Phone, 
        label: 'Phone', 
        value: '0926-003-2484',
        href: 'tel:09260032484'
    },
    { 
        icon: MapPin, 
        label: 'Location', 
        value: 'Tambuli Seaside Resort and Spa',
        href: 'https://www.google.com/maps/place/Tambuli+Seaside+Resort+and+Spa/@10.2899858,124.0020002,17z/data=!3m1!4b1!4m9!3m8!1s0x33a99732246dcbc5:0x61ef43a187a2080a!5m2!4m1!1i2!8m2!3d10.2899858!4d124.0068711!16s%2Fg%2F11h_3t257r?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D'
    },
]

export default function HostSection() {
    return (
        <section
            id="host"
            className="relative section-padding bg-sand-light overflow-hidden"
            aria-label="Meet the Owner"
        >
            <div className="relative max-w-5xl mx-auto">
                {/* Section Header */}
                <BlurFade delay={BASE_DELAY} inView>
                    <div className="text-center mb-16">
                        <TextAnimate
                            animation="blurInUp"
                            by="word"
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-ocean-deep mb-4"
                        >
                            Meet the Owner
                        </TextAnimate>
                        <p className="text-lg md:text-xl text-ocean/80">
                            Your comfort is my priority
                        </p>
                    </div>
                </BlurFade>

                {/* Host Profile Card */}
                <BlurFade delay={BASE_DELAY + STAGGER_DELAY} inView>
                    <NeonGradientCard
                        className="relative"
                        neonColors={{
                            firstColor: "#E07A5F",
                            secondColor: "#1E4D5C"
                        }}
                        borderSize={2}
                        borderRadius={24}
                    >
                        <div className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white to-sand-light">
                            {/* Profile Image - High Quality */}
                            <div className="relative flex-shrink-0">
                                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl shadow-ocean/20">
                                    {/* Gradient border ring */}
                                    <div
                                        className="absolute -inset-1 rounded-full z-0"
                                        style={{
                                            background: 'linear-gradient(135deg, #E07A5F 0%, #1E4D5C 50%, #E6F2F5 100%)',
                                            padding: '3px'
                                        }}
                                    />
                                    <div className="absolute inset-0 rounded-full overflow-hidden z-10 bg-white m-[3px]">
                                        <Image
                                            src="/images/owner.jpg"
                                            alt="Dale Nacario - Property Owner"
                                            width={224}
                                            height={224}
                                            className="w-full h-full object-cover scale-150"
                                            style={{ objectPosition: 'center 100%' }}
                                            priority
                                            quality={100}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center lg:text-left">
                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 2} inView>
                                    <h3 className="font-display text-3xl md:text-4xl text-ocean-deep mb-2">
                                        Dale Nacario
                                    </h3>
                                </BlurFade>

                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 3} inView>
                                    <p className="text-lg text-ocean mb-4 font-medium">
                                        Property Owner & Developer
                                    </p>
                                </BlurFade>

                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 4} inView>
                                    <div className="flex items-center justify-center lg:justify-start gap-2 text-ocean/70 mb-6">
                                        <MapPin className="w-4 h-4" aria-hidden="true" />
                                        <span>Based in Cebu, Philippines</span>
                                    </div>
                                </BlurFade>

                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 5} inView>
                                    <p className="text-ocean-deep/80 leading-relaxed mb-8 max-w-xl">
                                        I am the Property Owner and the Web Designer.
                                        I have personally ensured that every detail of your staycation is designed for your comfort and relaxation.
                                        Your satisfaction is my passion. For rental inquiries or business proposals, please feel free to reach out to me directly via email.
                                    </p>
                                </BlurFade>

                                {/* CTA Buttons */}
                                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 6} inView>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        <a
                                            href={AIRBNB_LISTING_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Book your stay on Airbnb (opens in new tab)"
                                        >
                                            <ShimmerButton
                                                className="h-14 px-8 text-base font-medium"
                                                shimmerColor="rgba(255, 255, 255, 0.2)"
                                                shimmerSize="0.1em"
                                                background="linear-gradient(135deg, #E07A5F 0%, #c96a52 100%)"
                                            >
                                                <span className="flex items-center gap-2 whitespace-pre-wrap text-center leading-none tracking-tight text-white">
                                                    Book on Airbnb
                                                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                                </span>
                                            </ShimmerButton>
                                        </a>

                                        <a
                                            href={`mailto:${CONTACT_EMAIL}`}
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ocean-light text-ocean font-medium rounded-full transition-all duration-300 hover:bg-ocean hover:text-white focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
                                            aria-label="Send email to property owner"
                                        >
                                            <Mail className="w-4 h-4" aria-hidden="true" />
                                            <span>Email Me</span>
                                        </a>
                                    </div>
                                </BlurFade>
                            </div>
                        </div>
                    </NeonGradientCard>
                </BlurFade>

                {/* Contact Information Cards */}
                <BlurFade delay={BASE_DELAY + STAGGER_DELAY * 7} inView>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {contactInfo.map((contact, index) => {
                            const Icon = contact.icon
                            return (
                                <BlurFade key={contact.label} delay={BASE_DELAY + STAGGER_DELAY * (8 + index)} inView>
                                    <MagicCard
                                        className="text-center p-6 rounded-2xl bg-white border border-sand-dark/10 hover:shadow-lg transition-all duration-300"
                                        gradientColor="rgba(30, 77, 92, 0.08)"
                                        gradientSize={150}
                                    >
                                        <a
                                            href={contact.href}
                                            className="block group"
                                            aria-label={`Contact via ${contact.label}`}
                                        >
                                            <div className="flex justify-center mb-4">
                                                <div className="p-3 rounded-full bg-ocean-light group-hover:bg-ocean transition-colors duration-300">
                                                    <Icon className="w-6 h-6 text-ocean group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <h3 className="font-semibold text-ocean-deep mb-2 group-hover:text-coral transition-colors duration-300">
                                                {contact.label}
                                            </h3>
                                            <p className="text-ocean/80 text-sm leading-relaxed">
                                                {contact.value}
                                            </p>
                                        </a>
                                    </MagicCard>
                                </BlurFade>
                            )
                        })}
                    </div>
                </BlurFade>
            </div>

            {/* Footer - Professional & Minimal */}
            <footer className="relative mt-24 pt-10 pb-6 border-t border-sand-dark/20">
                <div className="max-w-7xl mx-auto">
                    <BlurFade delay={BASE_DELAY} inView>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Brand */}
                            <span className="font-display text-xl text-ocean-deep">
                                Adam&apos;s Staycation
                            </span>

                            {/* Copyright */}
                            <p className="text-ocean/50 text-sm">
                                © {new Date().getFullYear()} All rights reserved.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </footer>
        </section>
    )
}
