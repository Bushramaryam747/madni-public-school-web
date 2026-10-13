import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TopBar } from '../components/TopBar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingActions } from '../components/FloatingActions';
import { SCHOOL_INFO } from '../lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://madnipublicschool.edu.pk'),
  title: {
    default: 'Madni Public School | Classes 1 to 8 | D.I. Khan, KPK, Pakistan',
    template: '%s | Madni Public School D.I. Khan',
  },
  description:
    'Madni Public School in Madni Town, near Shah Alam Abad, D.I. Khan (KPK, Pakistan). 23 Years of Educational Excellence providing quality education, discipline, and character building for Classes 1 to 8.',
  keywords: [
    'Madni Public School',
    'Madni Public School DI Khan',
    'Schools in D.I. Khan',
    'Best school in Madni Town Dera Ismail Khan',
    'Schools in Dera Ismail Khan KPK',
    'Classes 1 to 8 admissions D.I. Khan',
    'Madni Town near Shah Alam Abad school',
    'Quality education D.I. Khan',
  ],
  authors: [{ name: 'Madni Public School Administration' }],
  creator: 'Madni Public School',
  publisher: 'Madni Public School',
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
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://madnipublicschool.edu.pk',
    siteName: 'Madni Public School',
    title: 'Madni Public School | 23 Years of Excellence | D.I. Khan',
    description:
      'Nurturing confident, disciplined, and responsible students from Classes 1 to 8 in Madni Town, D.I. Khan, KPK, Pakistan. Contact us for admissions at 0318-9969994.',
    images: [
      {
        url: '/images/hero/school-building.svg',
        width: 1200,
        height: 700,
        alt: 'Madni Public School Campus Building in D.I. Khan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madni Public School | Classes 1-8 Admissions D.I. Khan',
    description:
      '23 Years of Educational Excellence in Madni Town, near Shah Alam Abad, D.I. Khan. Classes 1 to 8.',
    images: ['/images/hero/school-building.svg'],
  },
  alternates: {
    canonical: 'https://madnipublicschool.edu.pk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['School', 'EducationalOrganization'],
    name: SCHOOL_INFO.name,
    description: SCHOOL_INFO.description,
    url: 'https://madnipublicschool.edu.pk',
    logo: 'https://madnipublicschool.edu.pk/images/logo/madni-logo.svg',
    image: 'https://madnipublicschool.edu.pk/images/hero/school-building.svg',
    telephone: '+92-318-9969994',
    foundingDate: '2001',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHOOL_INFO.address.street,
      addressLocality: 'Dera Ismail Khan',
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.8315',
      longitude: '70.8872',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Dera Ismail Khan (D.I. Khan)',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Educational Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Primary Classes (Classes 1 to 5)',
            description: 'Foundational education in English, Urdu, Mathematics, and Sciences.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Middle Classes (Classes 6 to 8)',
            description: 'Comprehensive academic curriculum preparing students for secondary schooling.',
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-16 md:pb-0">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
