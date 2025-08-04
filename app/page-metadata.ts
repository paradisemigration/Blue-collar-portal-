import { Metadata } from 'next'

export const homeMetadata: Metadata = {
  title: 'GoGetHires - Find Jobs in UAE in 7 Days | Gulf Region Worker Platform',
  description: 'Find jobs in UAE in 7 days! Join 15,000+ verified blue-collar workers. Create your profile and get hired by top employers across the Gulf region.',
  keywords: 'UAE jobs, Gulf jobs, blue collar jobs, find jobs fast, worker platform, hire workers, Dubai jobs, construction jobs',
  openGraph: {
    title: 'GoGetHires - Find Jobs in UAE in 7 Days',
    description: 'Find jobs in UAE in 7 days! Create your profile and get hired by top employers.',
    images: [
      {
        url: 'https://www.gogethires.com/og-image.jpg?v=2024',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Find jobs in UAE in 7 days. Create your profile.',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com',
    siteName: 'GoGetHires',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoGetHires - Find Jobs in UAE in 7 Days',
    description: 'Find jobs in UAE in 7 days! Create your profile and get hired.',
    images: ['https://www.gogethires.com/twitter-image.jpg?v=2024'],
    creator: '@GoGetHire',
  },
}
