import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rabeeh PK - Full Stack Developer | Web, Mobile & Desktop Apps",
    template: "%s | Rabeeh PK",
  },
  description: "Rabeeh PK is a skilled full-stack developer from Kerala, India. Specializing in web applications, mobile apps, desktop applications, and backend systems. Expert in React, Next.js, Node.js, Python, and modern development technologies.",
  keywords: ['Rabeeh PK',
    'Muhammed Rabeeh PK',
    'muhammed rabeeh',
    'muhammed',
    'rabeeh',
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
    'Backend Development',
    'web development',
    'app development',
    'graphic design',
    'poster design',
    'video editing',
    'digital marketing',
    'seo',
    'branding agency'],
  authors: [{ name: "Rabeeh PK", url: "https://rabeeh.vercel.app" }],
  creator: "Rabeeh PK",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rabeeh.vercel.app",
    title: "rabeeh pk - Full Stack Developer | Web, Mobile & Desktop Apps",
    description: "Rabeeh PK is a skilled full-stack developer from Kerala, India. Specializing in web applications, mobile apps, desktop applications, and backend systems. Expert in React, Next.js, Node.js, Python, and modern development technologies.",
    siteName: "rabeeh pk",
    images: [
      {
        url: "/images/rabeeh.png",
        width: 1200,
        height: 630,
        alt: "rabeeh pk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rabeeh pk - Full Stack Developer | Web, Mobile & Desktop Apps",
    description: "Rabeeh PK is a skilled full-stack developer from Kerala, India. Specializing in web applications, mobile apps, desktop applications, and backend systems. Expert in React, Next.js, Node.js, Python, and modern development technologies.",
    images: ["/images/rabeeh.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white`}
      >
        <NavbarComponent />
        {children}
      </body>
    </html>
  );
}
