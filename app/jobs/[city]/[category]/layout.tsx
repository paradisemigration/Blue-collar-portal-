import { Metadata } from 'next'
import {
  getCityDisplayName,
  getCategoryDisplayName,
  JOB_CATEGORIES_URL_MAP,
  INDIVIDUAL_JOBS_URL_MAP
} from '../../../../utils/companiesData'

// Function to get job display name
function getJobDisplayName(jobSlug: string): string {
  for (const [displayName, slug] of Object.entries(INDIVIDUAL_JOBS_URL_MAP)) {
    if (slug === jobSlug) {
      return displayName
    }
  }
  return jobSlug
}

// Function to get category from job title
function getCategoryFromJob(jobSlug: string): string {
  const jobCategories: Record<string, string> = {
    'cook': 'hospitality-workers',
    'driver': 'driver',
    'maid': 'domestic-workers',
    'cleaner': 'cleaning-workers',
    'security-guard': 'security-workers',
    'construction-worker': 'construction-workers',
    'electrician': 'construction-workers',
    'plumber': 'construction-workers',
    'mechanic': 'technical-workers',
    'factory-worker': 'factory-workers'
    // Add more mappings as needed
  }
  return jobCategories[jobSlug] || 'general-workers'
}

interface Props {
  params: {
    category: string
    city: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityDisplay = getCityDisplayName(params.city)

  // Determine if this is a category or individual job
  const validCategories = Object.values(JOB_CATEGORIES_URL_MAP)
  const validJobs = Object.values(INDIVIDUAL_JOBS_URL_MAP)
  const isJobSlug = validJobs.includes(params.category)

  // Get appropriate display names
  const jobDisplay = isJobSlug ? getJobDisplayName(params.category) : null
  const categorySlug = isJobSlug ? getCategoryFromJob(params.category) : params.category
  const categoryDisplay = getCategoryDisplayName(categorySlug)

  const displayName = isJobSlug ? jobDisplay : categoryDisplay
  const jobType = isJobSlug ? 'job' : 'jobs'

  const title = `${displayName} ${jobType.charAt(0).toUpperCase() + jobType.slice(1)} in ${cityDisplay} - Apply Online | Go Get Hires`
  const description = `Find ${displayName?.toLowerCase()} ${jobType} in ${cityDisplay}. Apply to verified companies with competitive salaries, benefits, and visa sponsorship. Quick application process.`

  // Enhanced keywords with location and job type variations
  const keywords = [
    `${displayName?.toLowerCase()} jobs ${cityDisplay}`,
    `${displayName?.toLowerCase()} ${cityDisplay}`,
    `jobs in ${cityDisplay}`,
    `${cityDisplay} employment`,
    `apply online ${cityDisplay}`,
    `work in ${cityDisplay}`,
    `careers ${cityDisplay}`,
    `hiring ${cityDisplay}`,
    `visa sponsorship ${cityDisplay}`,
    `gulf jobs`,
    `middle east jobs`
  ].join(', ')

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Go Get Hires' }],
    creator: 'Go Get Hires',
    publisher: 'Go Get Hires',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://www.gogethires.com'),
    alternates: {
      canonical: `/jobs/${params.city}/${params.category}`,
    },
    openGraph: {
      title,
      description,
      url: `/jobs/${params.city}/${params.category}`,
      siteName: 'Go Get Hires',
      images: [
        {
          url: `/og-jobs-${params.city}.png`,
          width: 1200,
          height: 630,
          alt: `${displayName} Jobs in ${cityDisplay}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-jobs-${params.city}.png`],
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
    other: {
      'geo.region': cityDisplay,
      'geo.placename': cityDisplay,
      'geo.position': getLocationCoords(cityDisplay),
    },
  }
}

// Helper function to get coordinates for cities (helps with local SEO)
function getLocationCoords(city: string): string {
  const coords: Record<string, string> = {
    'Dubai': '25.2048;55.2708',
    'Abu Dhabi': '24.4539;54.3773',
    'Sharjah': '25.3463;55.4209',
    'Riyadh': '24.7136;46.6753',
    'Jeddah': '21.4858;39.1925',
    'Doha': '25.2854;51.5310',
    'Kuwait City': '29.3117;47.4818',
    'Manama': '26.0667;50.5577',
    'Muscat': '23.5859;58.4059',
    'Salalah': '17.0150;54.0924',
    'Sohar': '24.3477;56.7508',
    'Nizwa': '22.9333;57.5333',
    'Sur': '22.5667;59.5289',
    'Riffa': '26.1300;50.5550',
    'Saar': '26.1967;50.4833',
    'Sitra': '26.1500;50.6167',
    'Tubli': '26.1833;50.5833',
  }
  return coords[city] || '25.2048;55.2708' // Default to Dubai
}

export default function JobListingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
