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
    default: "Brandso - Digital Solutions | Web, App, Graphics & Marketing",
    template: "%s | Brandso",
  },
  description: "Brandso provides top-tier digital solutions including custom web & app development, creative poster designs, video production, UI/UX, and strategic digital marketing to grow your business.",
  keywords: ["web development", "app development", "graphic design", "poster design", "video editing", "digital marketing", "seo", "branding agency", "brandso"],
  authors: [{ name: "Brandso Team", url: "https://brandso.vercel.app" }],
  creator: "Brandso",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brandso.vercel.app",
    title: "Brandso - Transform Your Digital Presence",
    description: "From stunning visuals to powerful code, we build brands that stand out.",
    siteName: "Brandso",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Brandso Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandso - Digital Solutions",
    description: "Web, App, Graphics, Video, and Marketing.",
    images: ["/images/logo.png"],
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
