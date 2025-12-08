import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Sign in to Posting Portal. Access your vacancy management dashboard and recruitment tools.',
  robots: {
    index: false, // Don't index login page for privacy
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
