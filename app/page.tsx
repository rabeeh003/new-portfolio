import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

// Dynamic imports for better code splitting
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'), {
  loading: () => <LoadingSection title="projects" />,
  ssr: false
});

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  loading: () => <LoadingSection title="experiences" />,
  ssr: false
});

const EducationSection = dynamic(() => import('@/components/EducationSection'), {
  loading: () => <LoadingSection title="education" />,
  ssr: false
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <LoadingSection title="contact" />,
  ssr: false
});

// Optimized loading component
function LoadingSection({ title }: { title: string }) {
  return (
    <section className="min-h-screen bg-black py-20 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-lightblue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-xl font-medium">Loading {title}...</div>
        <div className="text-gray-400 text-sm mt-2">Please wait while we prepare your content</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <HeroSection />
      
      {/* Optimized section loading with better fallbacks */}
      <Suspense fallback={<LoadingSection title="experiences" />}>
        <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSection title="projects" />}>
        <FeaturedProjects />
      </Suspense>
      
      <Suspense fallback={<LoadingSection title="education" />}>
        <EducationSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSection title="contact" />}>
        <ContactSection />
      </Suspense>
      
      <Footer />
    </main>
  );
}