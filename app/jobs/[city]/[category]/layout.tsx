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
  const title = `Latest ${displayName} Jobs Opening in ${cityDisplay} | Apply online`
  const description = `Find the latest ${displayName?.toLowerCase()} job openings in ${cityDisplay}. Apply online to top companies hiring now. Start your career today with verified employers.`
  
  return {
    title,
    description,
    keywords: `${displayName} jobs ${cityDisplay}, job openings ${cityDisplay}, ${displayName?.toLowerCase()} careers, apply online jobs Gulf, latest jobs ${cityDisplay}`,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'Go Get Hires Now',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://www.gogethires.com/jobs/${params.city}/${params.category}`
    }
  }
}

export default function JobListingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
