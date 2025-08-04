import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employer Dashboard - GoGetHires',
  description: 'Manage your business account, browse worker profiles, track hiring progress, and access premium employer features.',
  keywords: 'employer dashboard, business account, hire workers, recruitment platform',
  robots: {
    index: false, // Dashboard pages should not be indexed
    follow: true,
  },
  openGraph: {
    title: 'Employer Dashboard - GoGetHires',
    description: 'Manage your hiring and access premium employer features.',
    type: 'website',
    url: 'https://www.gogethires.com/employer-dashboard',
  },
}

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
