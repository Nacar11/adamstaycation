import LandingSection from '@/components/sections/landing-section'
import ExperienceSection from '@/components/sections/experience-section'
import HostSection from '@/components/sections/host-section'
import Navbar from '@/components/shared/navbar'
import StructuredData from '@/components/shared/structured-data'

export default function Home() {
    return (
        <>
            {/* First Tab stop: lets keyboard users jump past the navigation */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-5 focus:py-3 focus:rounded-full focus:bg-ocean-deep focus:text-sand-light focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-peach"
            >
                Skip to content
            </a>
            <StructuredData />
            <Navbar />
            <main id="main" tabIndex={-1} className="min-h-svh focus:outline-none">
                <LandingSection />
                <ExperienceSection />
                <HostSection />
            </main>
        </>
    )
}
