import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
),
  title: {
    default: 'Sacrament Meeting Planner',
    template: '%s | Sacrament Meeting Planner',
  },
  description:
    'Plan, manage, and review sacrament meeting programs for your ward.',
  openGraph: {
    title: 'Sacrament Meeting Planner',
    description:
      'Plan, manage, and review sacrament meeting programs for your ward.',
    siteName: 'Sacrament Meeting Planner',
    type: 'website',
    images: [
      {
        url: '/mormon-church-meeting1.jpg',
        width: 1200,
        height: 630,
        alt: 'Sacrament meeting',
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />

        <div className="border-b bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <NavLinks />
          </div>
        </div>

        <main className="min-h-screen bg-gray-100">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}