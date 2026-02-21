import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPersonSchema, getWebSiteSchema } from '../utils/structuredData';
import Hero from '../components/Hero';
import About from '../components/About';
import StatsSection from '../components/StatsSection';
import ResearchSection from '../components/ResearchSection';
import PublicationsSection from '../components/PublicationsSection';
import ProjectsSection from '../components/ProjectsSection';
import AwardsSection from '../components/AwardsSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        return () => clearTimeout(t);
      }
    }  
  }, [location.pathname, location.hash]);

  const structuredData = [getPersonSchema(), getWebSiteSchema()];

  return (
    <>
      <SEO
        title="Dr. Haruna Gado Yakubu | Lecturer, University of Cape Coast"
        description="Dr. Haruna Gado Yakubu - Lecturer and researcher at the University of Cape Coast (UCC). Explore research publications, academic projects, awards, and professional achievements. Expert in UCC lectures and academic excellence."
        keywords="Dr. Haruna Gado Yakubu, Haruna Gado, Dr. Gado, Dr Haruna Gado, Yakubu Haruna Gado, University of Cape Coast, UCC Lecturer, UCC lectures, UCC faculty, Cape Coast University, Ghana lecturer, academic researcher"
        url="/"
        structuredData={structuredData}
      />
      <Hero />
      <About />
      <StatsSection />
      <ResearchSection />
      <PublicationsSection />
      <ProjectsSection />
      <AwardsSection />
      <ContactSection />
    </>
  );
}
