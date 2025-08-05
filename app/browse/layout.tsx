import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find Workers - GoGetHires',
  description: 'Find 15,000+ verified blue-collar workers across the Gulf region. Discover drivers, maids, electricians, cleaners and 70+ job categories. Filter by location, experience and salary.',
  keywords: 'find workers, hire workers Gulf, verified workers, blue collar jobs, drivers maids electricians, 70 job categories',
  openGraph: {
    title: 'Find Workers - GoGetHires',
    description: 'Find 15,000+ verified blue-collar workers across the Gulf region. Discover the perfect candidate from 70+ job categories.',
    images: [
      {
        url: 'https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=630&quality=85',
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
    images: ['https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=600&quality=85'],
  },
}

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
