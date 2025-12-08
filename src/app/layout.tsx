import { Providers } from './providers';
import './globals.css';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { Manrope } from 'next/font/google';
import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n-provider';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: {
    default: 'Posting Portal - Vacancy Management System',
    template: 'Posting Portal',
  },
  description:
    'Comprehensive vacancy management system for HR recruiters. Track job postings, manage ATS statuses, and streamline your recruitment process.',
  keywords: [
    'vacancy management',
    'recruitment',
    'hr software',
    'job posting',
    'ats system',
    'hiring platform',
  ],
  authors: [{ name: 'Posting Portal Team' }],
  creator: 'Posting Portal',
  publisher: 'Posting Portal',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Posting Portal - Vacancy Management System',
    description:
      'Comprehensive vacancy management system for HR recruiters. Track job postings, manage ATS statuses, and streamline your recruitment process.',
    siteName: 'Posting Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posting Portal - Vacancy Management System',
    description:
      'Comprehensive vacancy management system for HR recruiters. Track job postings, manage ATS statuses, and streamline your recruitment process.',
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
    // Add your verification codes when available
    // google: 'your-google-verification-code'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <I18nProvider>
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
