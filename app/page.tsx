import LandingSection from '@/components/sections/landing-section'
import ExperienceSection from '@/components/sections/experience-section'
import HostSection from '@/components/sections/host-section'
import Navbar from '@/components/shared/navbar'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <LandingSection />
            <ExperienceSection />
            <HostSection />
        </main>
    )
}
