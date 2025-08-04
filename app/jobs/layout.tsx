import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Postings - GoGetHires',
  description: 'Browse the latest job opportunities for blue-collar workers across the Gulf region. Find your next career opportunity.',
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
