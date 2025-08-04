import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Postings - GoGetHires',
  description: 'Find jobs in UAE in 7 days! Browse the latest job opportunities for blue-collar workers across the Gulf region. Create your profile and get hired.',
  openGraph: {
    title: 'Job Postings - GoGetHires',
    description: 'Find jobs in UAE in 7 days! Browse latest opportunities for drivers, maids, electricians, and more.',
    images: [
      {
        url: 'https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=630&quality=85',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Find jobs in UAE in 7 days',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com/jobs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Postings - GoGetHires',
    description: 'Find jobs in UAE in 7 days! Browse opportunities for blue-collar workers.',
    images: ['https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=600&quality=85'],
  },
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
