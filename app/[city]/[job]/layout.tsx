import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Get data from utils
import { GULF_REGIONS } from '../../../utils/dummyData'

interface Props {
  params: {
    city: string
    job: string
  }
  children: React.ReactNode
}

// Helper function to format city name from slug
function formatCityName(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Helper function to format job title from slug
function formatJobTitle(slug: string): string {
  const formatted = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  // Handle special mappings
  const jobMap: Record<string, string> = {
    'Chef': 'Cook',
    'Ac Technician': 'AC Technician',
    'Heavy Equipment Operator': 'Heavy Equipment Operator',
    'Crane Operator': 'Crane Operator',
    'Forklift Operator': 'Forklift Operator',
    'Steel Fixer': 'Steel Fixer',
    'Pipe Fitter': 'Pipe Fitter',
    'Hvac Technician': 'HVAC Technician',
    'Concrete Mixer': 'Concrete Mixer',
    'Excavator Operator': 'Excavator Operator',
    'Road Worker': 'Road Worker',
    'Building Maintenance': 'Building Maintenance',
    'Pool Cleaner': 'Pool Cleaner',
    'Window Cleaner': 'Window Cleaner',
    'Pest Control Technician': 'Pest Control Technician',
    'Laundry Worker': 'Laundry Worker',
    'Food Preparation Worker': 'Food Preparation Worker',
    'Kitchen Helper': 'Kitchen Helper',
    'Shop Assistant': 'Shop Assistant',
    'Inventory Clerk': 'Inventory Clerk',
    'Loading Worker': 'Loading Worker',
    'Moving Helper': 'Moving Helper',
    'Cleaning Supervisor': 'Cleaning Supervisor',
    'Maintenance Supervisor': 'Maintenance Supervisor',
    'Tile Setter': 'Tile Setter'
  }
  
  return jobMap[formatted] || formatted
}

// Get country for city
function getCountryForCity(cityName: string): string {
  for (const [country, data] of Object.entries(GULF_REGIONS)) {
    if (data.cities.some(city => 
      city.toLowerCase().replace(/\s+/g, '-') === cityName.toLowerCase()
    )) {
      return country
    }
  }
  return 'Gulf Region'
}

// Generate metadata for each city/job combination
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityDisplay = formatCityName(params.city)
  const jobDisplay = formatJobTitle(params.job)
  const country = getCountryForCity(params.city)
  
  const title = `Hire ${jobDisplay}s in ${cityDisplay}, ${country} | Go Get Hires Now`
  const description = `Find and hire verified ${jobDisplay.toLowerCase()}s in ${cityDisplay}, ${country}. Browse professional profiles, view experience, and connect instantly. Go Get Hires Now - your trusted platform for skilled workers in the Gulf region.`
  
  const cityJobUrl = `https://www.gogethires.com/${params.city}/${params.job}`
  
  return {
    title,
    description,
    keywords: `${jobDisplay} ${cityDisplay}, hire ${jobDisplay.toLowerCase()} ${country}, ${jobDisplay.toLowerCase()} jobs ${cityDisplay}, skilled ${jobDisplay.toLowerCase()} ${country}, verified ${jobDisplay.toLowerCase()}s ${cityDisplay}, ${jobDisplay.toLowerCase()} recruitment ${country}, Go Get Hires Now`,
    alternates: {
      canonical: cityJobUrl,
    },
    openGraph: {
      title,
      description,
      url: cityJobUrl,
      type: 'website',
      locale: 'en_US',
      siteName: 'Go Get Hires Now',
      images: [
        {
          url: `/og-images/${params.city}-${params.job}.jpg`,
          width: 1200,
          height: 630,
          alt: `${jobDisplay}s in ${cityDisplay}, ${country}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Hire ${jobDisplay}s in ${cityDisplay}`,
      description: `Find verified ${jobDisplay.toLowerCase()}s in ${cityDisplay}, ${country}. Connect instantly!`,
      images: [`/twitter-images/${params.city}-${params.job}.jpg`],
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
  }
}

export default function CityJobLayout({ children, params }: Props) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": `${formatJobTitle(params.job)} positions in ${formatCityName(params.city)}`,
            "description": `Multiple ${formatJobTitle(params.job).toLowerCase()} positions available in ${formatCityName(params.city)}, ${getCountryForCity(params.city)}`,
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Go Get Hires Now",
              "sameAs": "https://www.gogethires.com"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": formatCityName(params.city),
                "addressCountry": getCountryForCity(params.city)
              }
            },
            "employmentType": "FULL_TIME",
            "datePosted": new Date().toISOString().split('T')[0],
            "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          })
        }}
      />
      {children}
    </>
  )
}
