import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Image from 'next/image';
import marvelLogo from './Images/logo.png';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: 'Marvel Universe Hub',
  description: 'Discover your favorite Marvel heroes, comics, and epic moments in HD.',
  metadataBase: new URL('https://marvel-kappa-three.vercel.app'), // ✅ Add https://
  openGraph: {
    title: 'Marvel Universe Hub',
    description: 'Discover your favorite Marvel heroes, comics, and epic moments in HD.',
    url: 'https://marvel-kappa-three.vercel.app',
    siteName: 'Marvel Universe Hub',
    images: [
      {
        url: '/og-marvel.png', // <-- This should exist in /public folder
        width: 1200,
        height: 630,
        alt: 'Marvel Universe Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvel Universe Hub',
    description: 'Your ultimate destination for all things Marvel. Explore now.',
    images: ['/og-marvel.png'], // Same image as OG
    creator: '@YourTwitterHandle', // Optional
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container text-center mt-4">
          <Image
            src={marvelLogo}
            alt="Marvel Logo"
            width={200}
            height={100}
            priority
          />
          <p className="lead mt-3">
            <strong>Welcome to the Marvel Universe Hub 🔥</strong><br />
            Dive into legendary characters, HD art, and epic lore!
          </p>
        </div>

        {children}
      </body>
    </html>
  );
}
