import { MetadataRoute } from 'next'
import {
  ALL_CITIES,
  JOB_CATEGORIES_URL_MAP,
  INDIVIDUAL_JOBS_URL_MAP
} from '../utils/companiesData'

// All job titles available in the platform (complete list of 70+ jobs)
const JOB_TITLES = [
  // Domestic & Personal Care Workers
  'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
  'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid',

  // Construction & Infrastructure
  'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
  'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
  'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker',

  // Mechanical & Technical
  'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
  'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator',

  // Manufacturing & Factory
  'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
  'Production Supervisor', 'Fabricator', 'Loader/Unloader',

  // Transport & Logistics
  'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
  'Dispatch Coordinator', 'Heavy Vehicle Driver',

  // Cleaning & Maintenance
  'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 'Car Wash Attendant', 'Office Cleaner',

  // Hospitality & Food
  'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 'Barista', 'Food Delivery Rider',

  // Security & General Services
  'Security Guard', 'Watchman', 'Lifeguard', 'Maintenance Helper', 'General Helper',

  // Garments & Tailoring
  'Tailor', 'Ironing Staff', 'Textile Factory Worker',

  // Agriculture & Farming
  'Farm Worker', 'Livestock Handler', 'Greenhouse Worker',

  // Other Common Jobs
  'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker',

  // Legacy job titles for backward compatibility
  'Driver', 'Maid', 'Gardener', 'Mechanic', 'Construction Worker', 'Warehouse Worker'
]

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
      url: `${baseUrl}/browse`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const,
      priority: 0.95,
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

  // Generate all city/job combination pages (43 cities × 70+ jobs = 3,000+ pages)
  const cityJobPages = []

  // High priority cities (major economic centers)
  const majorCities = ['Dubai', 'Riyadh', 'Doha', 'Kuwait City', 'Abu Dhabi', 'Muscat', 'Manama']
  // High demand jobs
  const popularJobs = ['Driver', 'Maid', 'Housemaid', 'Security Guard', 'Cook', 'Cleaner', 'Housekeeping Staff', 'Construction Worker', 'Construction Laborer', 'Auto Mechanic', 'Nanny (Childcare Worker)']

  // Get all cities from GULF_REGIONS
  const allCities = Object.values(GULF_REGIONS).flatMap(region => region.cities)

  for (const city of allCities) {
    for (const job of JOB_TITLES) {
      const citySlug = cityToSlug(city)
      const jobSlug = jobToSlug(job)

      // Determine priority based on city and job popularity
      let priority = 0.6 // Base priority
      if (majorCities.includes(city)) priority += 0.15
      if (popularJobs.includes(job)) priority += 0.1

      // Cap at 0.9 to keep homepage and browse as highest priority
      priority = Math.min(priority, 0.9)

      cityJobPages.push({
        url: `${baseUrl}/${citySlug}/${jobSlug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: Math.round(priority * 100) / 100, // Round to 2 decimal places
      })
    }
  }

  console.log(`Generated sitemap with ${mainPages.length + cityJobPages.length} pages (${cityJobPages.length} city/job combinations)`)
  
  return [...mainPages, ...cityJobPages]
}
