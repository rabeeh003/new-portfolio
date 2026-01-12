import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Rabeeh PK - Full Stack Developer | Web, Mobile & Desktop Apps',
    template: '%s | Rabeeh PK - Full Stack Developer'
  },


  description: 'Rabeeh PK is a skilled full-stack developer from Kerala, India. Specializing in web applications, mobile apps, desktop applications, and backend systems. Expert in React, Next.js, Node.js, Python, and modern development technologies.',
  keywords: [
    'Rabeeh PK',
    'Full Stack Developer',
    'Web Developer',
    'Mobile App Developer',
    'Desktop App Developer',
    'Backend Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Python Developer',
    'Kerala Developer',
    'India Developer',
    'Software Engineer',
    'Portfolio',
    'Web Applications',
    'Mobile Applications',
    'Desktop Applications',
    'Backend Systems',
    'API Development',
    'Database Design',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Frontend Development',
    'Backend Development'
  ],
  authors: [{ name: 'Rabeeh PK' }],
  creator: 'Rabeeh PK',
  publisher: 'Rabeeh PK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rabeehpk.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rabeehpk.dev',
    title: 'Rabeeh PK - Full Stack Developer | Web, Mobile & Desktop Apps',
    description: 'Rabeeh PK is a skilled full-stack developer from Kerala, India. Specializing in web applications, mobile apps, desktop applications, and backend systems.',
    siteName: 'Rabeeh PK Portfolio',
    images: [
      {
        url: '/rabeeh.png',
        width: 1200,
        height: 630,
        alt: 'Rabeeh PK - Full Stack Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rabeeh PK - Full Stack Developer | Web, Mobile & Desktop Apps',
    description: 'Rabeeh PK is a skilled full-stack developer from Kerala, India. Specializing in web applications, mobile apps, desktop applications, and backend systems.',
    images: ['/rabeeh.png'],
    creator: '@rabeehpk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rabeeh PK Portfolio" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rabeeh PK",
              "jobTitle": "Full Stack Developer",
              "description": "Skilled full-stack developer from Kerala, India specializing in web applications, mobile apps, desktop applications, and backend systems.",
              "url": "https://rabeehpk.dev",
              "image": "https://rabeehpk.dev/rabeeh.png",
              "sameAs": [
                "https://github.com/rabeehpk",
                "https://linkedin.com/in/rabeehpk",
                "https://twitter.com/rabeehpk"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kerala",
                "addressCountry": "India"
              },
              "knowsAbout": [
                "Web Development",
                "Mobile App Development",
                "Desktop Application Development",
                "Backend Development",
                "Frontend Development",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "JavaScript",
                "TypeScript",
                "Database Design",
                "API Development",
                "Cloud Computing",
                "DevOps",
                "UI/UX Design"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Full Stack Developer",
                "description": "Develops web applications, mobile apps, desktop applications, and backend systems using modern technologies."
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Computer Science Education"
              }
            })
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rabeeh PK Portfolio",
              "url": "https://rabeehpk.dev",
              "description": "Portfolio website of Rabeeh PK, a full-stack developer from Kerala, India.",
              "author": {
                "@type": "Person",
                "name": "Rabeeh PK"
              },
              "publisher": {
                "@type": "Person",
                "name": "Rabeeh PK"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://rabeehpk.dev/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Professional Service Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Rabeeh PK Development Services",
              "description": "Professional web development, mobile app development, desktop application development, and backend system services.",
              "provider": {
                "@type": "Person",
                "name": "Rabeeh PK"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "serviceType": [
                "Web Development",
                "Mobile App Development",
                "Desktop Application Development",
                "Backend Development",
                "API Development",
                "Database Design",
                "Cloud Computing Solutions"
              ],
              "url": "https://rabeehpk.dev"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
