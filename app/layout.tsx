import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebugMetaTags from '../components/DebugMetaTags'
import PageLoader from '../components/PageLoader'

export const metadata = {
  title: 'Go Get Hire - Find Blue-Collar Workers Across Gulf Region',
  description: 'Go Get Hire connects employers with verified blue-collar workers across the Gulf region. Browse profiles, hire skilled talent, and grow your business with trusted professionals.',
  keywords: 'Gulf hiring, blue collar workers, Gulf jobs, hire workers, skilled workers, UAE jobs, Qatar jobs, Saudi Arabia jobs'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <DebugMetaTags />
      </body>
    </html>
  )
}
