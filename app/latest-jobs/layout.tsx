import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest Job Openings in UAE | Apply Online to Top Companies',
  description: 'Find the latest job openings across all UAE cities and industries. Apply online to verified companies hiring now. Free registration and quick application process.',
  keywords: 'UAE jobs, job openings UAE, latest jobs Dubai, Abu Dhabi jobs, apply online jobs, UAE careers, Gulf jobs',
  openGraph: {
    title: 'Latest Job Openings in UAE | Apply Online to Top Companies',
    description: 'Find the latest job openings across all UAE cities and industries. Apply online to verified companies hiring now.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Go Get Hires Now',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Job Openings in UAE | Apply Online to Top Companies',
    description: 'Find the latest job openings across all UAE cities and industries. Apply online to verified companies hiring now.',
  },
  alternates: {
    canonical: 'https://www.gogethires.com/latest-jobs'
  }
}

export default function LatestJobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
