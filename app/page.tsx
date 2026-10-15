import LandingSection from '@/components/sections/landing-section'
import ExperienceSection from '@/components/sections/experience-section'
import HostSection from '@/components/sections/host-section'
import Navbar from '@/components/shared/navbar'
import StructuredData from '@/components/shared/structured-data'

export default function Home() {
    return (
        <main className="min-h-screen">
            <StructuredData />
            <Navbar />
            <LandingSection />
            <ExperienceSection />
            <HostSection />
        </main>
    )
}
