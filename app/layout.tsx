import './globals.css'

export const metadata = {
  title: 'Gulf Hiring Platform - Find Blue-Collar Workers',
  description: 'Connect with verified blue-collar workers across the Gulf region. Browse profiles, hire talent, and grow your business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
