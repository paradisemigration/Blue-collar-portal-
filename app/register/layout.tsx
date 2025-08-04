import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - GoGetHires',
  description: 'Create your account on GoGetHires. Join thousands of employers and workers connecting across the Gulf region.',
  keywords: 'register, sign up, create account, join GoGetHires, worker registration, employer registration',
  openGraph: {
    title: 'Register - GoGetHires',
    description: 'Create your account and join the Gulf region\'s leading worker platform.',
    images: [
      {
        url: 'https://www.gogethires.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Register Account',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com/register',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register - GoGetHires',
    description: 'Create your account on the Gulf region\'s leading worker platform.',
    images: ['https://www.gogethires.com/twitter-image.jpg'],
  },
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
