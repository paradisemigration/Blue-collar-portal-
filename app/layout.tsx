import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebugMetaTags from '../components/DebugMetaTags'
import PageLoader from '../components/PageLoader'
import ErrorBoundary from '../components/ErrorBoundary'
import SafeScriptManager from '../components/SafeScriptManager'

export const metadata = {
  title: 'Go Get Hire - Premier Blue-Collar Worker Platform | Gulf Region',
  description: 'Go Get Hire connects employers with 15,000+ verified blue-collar workers across 43 cities in Gulf region. Browse 49 job categories including drivers, maids, electricians, construction workers. Fast hiring, verified profiles, instant contact access.',
  keywords: 'Gulf workers, blue collar jobs, hire workers Gulf, UAE workers, Qatar workers, Saudi Arabia workers, Kuwait workers, Bahrain workers, Oman workers, drivers Gulf, maids Gulf, electricians Gulf, construction workers Gulf, skilled workers Middle East, Go Get Hire',
  authors: [{ name: 'Go Get Hire' }],
  creator: 'Go Get Hire',
  publisher: 'Go Get Hire',
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
      <head>
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Paradise Workers Hub",
              "url": "https://paradiseworkershub.com",
              "logo": "https://paradiseworkershub.com/logo.png",
              "description": "Paradise Workers Hub connects employers with verified blue-collar workers across the Gulf region",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Gulf Region",
                "addressCountry": "AE"
              },
              "sameAs": [
                "https://www.facebook.com/paradiseworkershub",
                "https://www.linkedin.com/company/paradiseworkershub",
                "https://twitter.com/paradiseworkers"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-XXX-XXXX",
                "contactType": "customer service",
                "areaServed": ["AE", "QA", "SA", "OM", "KW", "BH"],
                "availableLanguage": ["English", "Arabic"]
              }
            })
          }}
        />
        
        {/* JSON-LD for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Paradise Workers Hub",
              "url": "https://paradiseworkershub.com",
              "description": "Premier blue-collar worker platform connecting employers with verified workers across Gulf region",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://paradiseworkershub.com/browse?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <SafeScriptManager />
        <PageLoader />
        <ErrorBoundary>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <DebugMetaTags />
        </ErrorBoundary>
      </body>
    </html>
  )
}
