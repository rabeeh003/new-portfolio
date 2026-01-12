import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import { section } from 'motion/react-client';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Lazy load heavy components below the fold
const RecentPosters = dynamic(() => import('@/components/home/RecentPosters'), {
  ssr: true, // Keep SSR for SEO content, but code-split the JS
});
const Footer = dynamic(() => import('@/components/home/Footer'));

export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rabeeh PK",
    "url": "https://rabeeh.vercel.app",
    "logo": "/images/logo/logo.png",
    "sameAs": [
      "https://facebook.com/rabeeh_pk",
      "https://instagram.com/rabeeh_pk",
      "https://twitter.com/rabeeh_pk"
    ],
    "description": "Rabeeh PK is a full-stack developer specializing in web development, app development, graphics, hosting, publishing apps, and digital marketing.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7994779605",
      "contactType": "customer service"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id="json-ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow">
        {/* Hero Section - LCP Candidate, load eager */}
        <section className="relative w-full max-w-7xl mx-auto">
          <Hero />
        </section>

        {/* Services Section */}
        <section id="services" className="relative w-full">
          <Services />
        </section>

        {/* Recent Posters Section - Lazy loaded */}
        <section id="portfolio" className="relative w-full bg-black">
          <RecentPosters />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}