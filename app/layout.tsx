import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DebugMetaTags from '../components/DebugMetaTags'
import PageLoader from '../components/PageLoader'
import ErrorBoundary from '../components/ErrorBoundary'
import SafeScriptManager from '../components/SafeScriptManager'
import BottomCTAPopup from '../components/BottomCTAPopup'

export const metadata = {
  title: 'Go Get Hires Now - Premier Blue-Collar Worker Platform | Gulf Region',
  description: 'Go Get Hires Now connects employers with 15,000+ verified blue-collar workers across 43 cities in Gulf region. Browse 49 job categories including drivers, maids, electricians, construction workers. Fast hiring, verified profiles, instant contact access.',
  keywords: 'Gulf workers, blue collar jobs, hire workers Gulf, UAE workers, Qatar workers, Saudi Arabia workers, Kuwait workers, Bahrain workers, Oman workers, drivers Gulf, maids Gulf, electricians Gulf, construction workers Gulf, skilled workers Middle East, Go Get Hires Now',
  authors: [{ name: 'Go Get Hires Now' }],
  creator: 'Go Get Hires Now',
  publisher: 'Go Get Hires Now',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.gogethires.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.gogethires.com',
    siteName: 'Go Get Hires Now',
    title: 'Go Get Hires Now - Premier Blue-Collar Worker Platform | Gulf Region',
    description: 'Connect with 15,000+ verified blue-collar workers across 43 Gulf cities. Browse 49 job categories, hire instantly with verified profiles and direct contact access.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Go Get Hires Now - Gulf Region Worker Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go Get Hires Now - Premier Blue-Collar Worker Platform',
    description: 'Connect with 15,000+ verified workers across Gulf region. 43 cities, 49 job categories.',
    images: ['/twitter-image.jpg'],
    creator: '@GoGetHire',
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Block FullStory in development */}
        {process.env.NODE_ENV === 'development' && (
          <meta httpEquiv="Content-Security-Policy" content="connect-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';" />
        )}
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Go Get Hires Now",
              "url": "https://www.gogethires.com",
              "logo": "https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fae655e15f41d4e2a843beb5ac79ab8d2?format=webp&width=400",
              "description": "Go Get Hires Now connects employers with verified blue-collar workers across the Gulf region",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Gulf Region",
                "addressCountry": "AE"
              },
              "sameAs": [
                "https://www.facebook.com/gogethire",
                "https://www.linkedin.com/company/gogethire",
                "https://twitter.com/gogethire"
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
              "name": "Go Get Hires Now",
              "url": "https://www.gogethires.com",
              "description": "Premier blue-collar worker platform connecting employers with verified workers across Gulf region",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.gogethires.com/browse?q={search_term_string}"
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
          <BottomCTAPopup />
          <DebugMetaTags />
        </ErrorBoundary>
      </body>
    </html>
  )
}
