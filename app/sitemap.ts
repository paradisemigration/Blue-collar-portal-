import { MetadataRoute } from 'next'
import {
  ALL_CITIES,
  JOB_CATEGORIES_URL_MAP,
  INDIVIDUAL_JOBS_URL_MAP
} from '../utils/companiesData'

// Get job categories and individual jobs from the system
const JOB_CATEGORIES = Object.values(JOB_CATEGORIES_URL_MAP)
const INDIVIDUAL_JOBS = Object.values(INDIVIDUAL_JOBS_URL_MAP)

// Convert city name to URL slug
function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-')
}

// Convert job title to URL slug
function jobToSlug(job: string): string {
  return job.toLowerCase().replace(/\s+/g, '-')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.gogethires.com'
  const currentDate = new Date()
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/create-profile`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employer-login`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    }
  ]

  // Generate job pages for the new routing structure
  const jobPages = []

  // High priority cities (major economic centers)
  const majorCities = ['Dubai', 'Riyadh', 'Doha', 'Kuwait City', 'Abu Dhabi', 'Muscat', 'Manama']
  // High demand job categories
  const popularCategories = ['driver', 'domestic-workers', 'construction-workers', 'hospitality-workers', 'cleaning-workers']
  // High demand individual jobs
  const popularJobs = ['cook', 'driver', 'maid', 'security-guard', 'cleaner', 'electrician', 'mechanic']

  // Generate city/category combination pages
  for (const city of ALL_CITIES) {
    const citySlug = cityToSlug(city)

    // Add job category pages
    for (const category of JOB_CATEGORIES) {
      let priority = 0.7 // Base priority for category pages
      if (majorCities.includes(city)) priority += 0.1
      if (popularCategories.includes(category)) priority += 0.1
      priority = Math.min(priority, 0.85)

      jobPages.push({
        url: `${baseUrl}/jobs/${citySlug}/${category}`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: Math.round(priority * 100) / 100,
      })
    }

    // Add individual job pages (higher priority for popular jobs)
    for (const job of INDIVIDUAL_JOBS) {
      let priority = 0.65 // Base priority for individual jobs
      if (majorCities.includes(city)) priority += 0.1
      if (popularJobs.includes(job)) priority += 0.15
      priority = Math.min(priority, 0.8)

      jobPages.push({
        url: `${baseUrl}/jobs/${citySlug}/${job}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: Math.round(priority * 100) / 100,
      })
    }
  }

  console.log(`Generated sitemap with ${mainPages.length + jobPages.length} pages:`)
  console.log(`- Main pages: ${mainPages.length}`)
  console.log(`- Job pages: ${jobPages.length} (${ALL_CITIES.length} cities × ${JOB_CATEGORIES.length + INDIVIDUAL_JOBS.length} job types)`)

  return [...mainPages, ...jobPages]
}
