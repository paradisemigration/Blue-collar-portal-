import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans - Go Get Hires Now | Blue-Collar Hiring Platform',
  description: 'Choose the perfect plan for your hiring needs with Go Get Hires Now. Access verified blue-collar worker profiles across the Gulf region.',
  keywords: 'pricing, hiring plans, blue collar workers, Gulf region, Go Get Hires Now'
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
