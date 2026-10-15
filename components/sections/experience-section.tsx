import ExperienceHighlights from './experience/highlights'
import DitaAbout from './experience/dita-about'
import EssentialsStrip from './experience/essentials-strip'
import ResortAccess from './experience/resort-access'
import PhotoGallery from './experience/photo-gallery'

// Experience section — composes the subsections in page order
const ExperienceSection = () => (
    <section id="experience" className="relative overflow-hidden" aria-label="Experience Section">
        <ExperienceHighlights />
        <DitaAbout />
        <EssentialsStrip />
        <ResortAccess />
        <PhotoGallery />
    </section>
)

export default ExperienceSection
