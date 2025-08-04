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
  description: 'Find jobs in UAE in 7 days! GoGetHires connects employers with 15,000+ verified blue-collar workers across 43 Gulf cities. Browse 49 job categories including drivers, maids, electricians, construction workers.',
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
    siteName: 'GoGetHires',
    title: 'GoGetHires - Premier Blue-Collar Worker Platform | Gulf Region',
    description: 'Find jobs in UAE in 7 days! Connect with 15,000+ verified blue-collar workers across the Gulf region. Create your profile and get hired instantly.',
    images: [
      {
        url: 'https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=630&quality=85',
        width: 1200,
        height: 630,
        alt: 'GoGetHires - Gulf Region Worker Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoGetHires - Premier Blue-Collar Worker Platform',
    description: 'Connect with 15,000+ verified workers across Gulf region. 43 cities, 49 job categories.',
    images: ['https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=600&quality=85'],
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
        <link rel="manifest" href="/manifest.json" />

        {/* Additional Social Media Meta Tags */}
        <meta property="og:image" content="https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=630&quality=85" />
        <meta property="og:image:secure_url" content="https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=630&quality=85" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="GoGetHires - Find jobs in UAE in 7 days. Create your profile." />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content="https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fbc77aeea733640da8c2887deb8768828?format=jpeg&width=1200&height=600&quality=85" />
        <meta name="twitter:image:alt" content="GoGetHires - Gulf Region Worker Platform" />

        {/* Facebook specific */}
        <meta property="fb:app_id" content="your-facebook-app-id" />
        <meta property="article:publisher" content="https://www.facebook.com/gogethires" />

        {/* Additional meta for better indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://www.gogethires.com" />

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
