import { Providers } from './providers';
import './globals.css';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { Public_Sans } from 'next/font/google';
import type { Metadata } from 'next';

const public_sans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lovable Posting Portal',
  description: 'Manage your vacancies efficiently',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={public_sans.className}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
