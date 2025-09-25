import { Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

function LoadingSection({ title }: { title: string }) {
  return (
    <section className="min-h-screen bg-black py-20 flex items-center justify-center">
      <div className="text-white text-xl">Loading {title}...</div>
    </section>
  );
}
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      <Suspense fallback={<LoadingSection title="experiences" />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<LoadingSection title="projects" />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<LoadingSection title="education" />}>
        <EducationSection />
      </Suspense>
      {/* <Suspense fallback={<LoadingSection title="skills" />}>
        <SkillsSection />
      </Suspense> */}
      <Suspense fallback={<LoadingSection title="contact" />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </main>
  );
}