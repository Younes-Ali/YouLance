
import AboutHero from '../components/about/AboutHero'
import ContactCTA from '../components/about/ContactCTA'
import MissionVision from '../components/about/MissionVision'
import OriginStory from '../components/about/OriginStory'
import Recognition from '../components/about/Recognition'
import Stats from '../components/about/Stats'
import Team from '../components/about/Team'

export default function About() {
  return (
    <div>
        <AboutHero />
        <Stats />
        <MissionVision />
        <OriginStory />
        <Team />
        <Recognition />
        <ContactCTA />
    </div>
  )
}
