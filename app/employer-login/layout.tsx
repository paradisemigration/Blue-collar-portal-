import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Employer Login - GoGetHires',
  description: 'Login to your GoGetHires employer account. Access premium features, browse worker profiles, and hire verified candidates.',
  keywords: 'employer login, business account, hire workers, employer dashboard',
  openGraph: {
    title: 'Employer Login - GoGetHires',
    description: 'Login to your employer account and hire verified workers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Employer Login',
      },
    ],
    type: 'website',
    url: 'https://www.gogethires.com/employer-login',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employer Login - GoGetHires',
    description: 'Access your employer account and hire verified workers.',
    images: ['/twitter-image.jpg'],
  },
}

export default function EmployerLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
