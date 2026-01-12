import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - RABEEH PK | Software Developer | Get In Touch',
  description: 'Contact RABEEH PK, a skilled Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Available for freelance projects and collaborations. Get in touch via email, phone, or social media.',
  keywords: 'contact, RABEEH PK, full stack developer, web developer, React developer, Next.js developer, freelance developer, hire developer, web development services, mobile app development, software development, Kerala, India',
  authors: [{ name: 'RABEEH PK' }],
  creator: 'RABEEH PK',
  publisher: 'RABEEH PK',
  robots: 'index, follow',
  openGraph: {
    title: 'Contact - RABEEH PK | Full Stack Developer',
    description: 'Get in touch with RABEEH PK for web development, mobile app development, and software solutions. Professional developer based in Kerala, India.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RABEEH PK Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - RABEEH PK | Full Stack Developer',
    description: 'Get in touch with RABEEH PK for professional web and mobile development services.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
