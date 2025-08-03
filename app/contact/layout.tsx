import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Go Get Hire',
  description: 'Contact Go Get Hire support team. Get in touch for assistance, partnerships, or business inquiries.',
  keywords: 'contact, support, help, business, partnership, go get hire'
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
