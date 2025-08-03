import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebugMetaTags from '../components/DebugMetaTags'
import PageLoader from '../components/PageLoader'

export const metadata = {
  title: 'Paradise Workers Hub - Premier Blue-Collar Worker Platform | Gulf Region',
  description: 'Paradise Workers Hub connects employers with 15,000+ verified blue-collar workers across 43 cities in Gulf region. Browse 49 job categories including drivers, maids, electricians, construction workers. Fast hiring, verified profiles, instant contact access.',
  keywords: 'Gulf workers, blue collar jobs, hire workers Gulf, UAE workers, Qatar workers, Saudi Arabia workers, Kuwait workers, Bahrain workers, Oman workers, drivers Gulf, maids Gulf, electricians Gulf, construction workers Gulf, skilled workers Middle East, Paradise Workers Hub',
  authors: [{ name: 'Paradise Workers Hub' }],
  creator: 'Paradise Workers Hub',
  publisher: 'Paradise Workers Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://paradiseworkershub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paradiseworkershub.com',
    siteName: 'Paradise Workers Hub',
    title: 'Paradise Workers Hub - Premier Blue-Collar Worker Platform | Gulf Region',
    description: 'Connect with 15,000+ verified blue-collar workers across 43 Gulf cities. Browse 49 job categories, hire instantly with verified profiles and direct contact access.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Paradise Workers Hub - Gulf Region Worker Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paradise Workers Hub - Premier Blue-Collar Worker Platform',
    description: 'Connect with 15,000+ verified workers across Gulf region. 43 cities, 49 job categories.',
    images: ['/twitter-image.jpg'],
    creator: '@ParadiseWorkers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <PageLoader />
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
