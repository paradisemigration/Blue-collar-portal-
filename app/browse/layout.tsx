import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Workers - GoGetHires',
  description: 'Browse 15,000+ verified blue-collar workers across the Gulf region. Find drivers, maids, electricians, cleaners and more. Filter by location, experience and salary.',
  keywords: 'browse workers, hire workers Gulf, verified workers, blue collar jobs, drivers maids electricians',
  openGraph: {
    title: 'Browse Workers - GoGetHires',
    description: 'Browse 15,000+ verified blue-collar workers across the Gulf region. Find the perfect candidate for your business.',
    images: [
      {
        url: 'https://www.gogethires.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Browse Workers',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com/browse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Workers - GoGetHires',
    description: 'Browse 15,000+ verified workers across Gulf region.',
    images: ['https://www.gogethires.com/twitter-image.jpg'],
  },
}

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
