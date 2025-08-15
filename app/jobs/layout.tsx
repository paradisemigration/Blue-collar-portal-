import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Job Categories in UAE & Saudi Arabia | Apply Online',
  description: 'Browse all job categories across UAE and Saudi Arabia cities. From drivers to housemaids, construction to technical jobs - find your perfect opportunity and apply online.',
  keywords: 'UAE jobs, Saudi Arabia jobs, all job categories, Gulf jobs, apply online jobs, job listings Gulf region',
  openGraph: {
    title: 'All Job Categories in UAE & Saudi Arabia | Apply Online',
    description: 'Browse all job categories across UAE and Saudi Arabia cities. Find your perfect opportunity and apply online.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Go Get Hires Now',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Job Categories in UAE & Saudi Arabia | Apply Online',
    description: 'Browse all job categories across UAE and Saudi Arabia cities. Find your perfect opportunity and apply online.',
  },
  alternates: {
    canonical: 'https://www.gogethires.com/jobs'
  }
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
