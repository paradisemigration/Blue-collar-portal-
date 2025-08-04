import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Your Worker Profile - GoGetHires',
  description: 'Join 15,000+ verified workers on GoGetHires. Create your professional profile in minutes and connect with top employers across the Gulf region.',
  keywords: 'create profile, worker registration, Gulf jobs, blue collar jobs, GoGetHires',
  openGraph: {
    title: 'Create Your Worker Profile - GoGetHires',
    description: 'Join 15,000+ verified workers. Create your professional profile and get hired by top employers across the Gulf region.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Create Worker Profile',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com/create-profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Worker Profile - GoGetHires',
    description: 'Join 15,000+ verified workers. Get hired by top Gulf employers.',
    images: ['/twitter-image.jpg'],
  },
}

export default function CreateProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
