import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Worker Login - GoGetHires',
  description: 'Login to your GoGetHires worker account. Access your profile, view job matches, and manage your employment opportunities.',
  keywords: 'worker login, sign in, worker account, profile access',
  openGraph: {
    title: 'Worker Login - GoGetHires',
    description: 'Login to your worker account and access job opportunities.',
    images: [
      {
        url: 'https://www.gogethires.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Worker Login',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com/login',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Worker Login - GoGetHires',
    description: 'Access your worker account and job opportunities.',
    images: ['https://www.gogethires.com/twitter-image.jpg'],
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
