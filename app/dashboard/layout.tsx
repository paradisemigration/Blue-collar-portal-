import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Worker Dashboard - GoGetHires',
  description: 'Manage your worker profile, view job opportunities, and track your applications on GoGetHires platform.',
  keywords: 'worker dashboard, profile management, job applications, worker account',
  robots: {
    index: false, // Dashboard pages should not be indexed
    follow: true,
  },
  openGraph: {
    title: 'Worker Dashboard - GoGetHires',
    description: 'Manage your worker profile and track job opportunities.',
    type: 'website',
    url: 'https://www.gogethires.com/dashboard',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
