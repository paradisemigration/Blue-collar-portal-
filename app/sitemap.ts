import { MetadataRoute } from 'next'
import { GULF_REGIONS } from '../utils/dummyData'

// All job titles available in the platform
const JOB_TITLES = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 
  'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic', 
  'Construction Worker', 'Delivery Driver', 'Warehouse Worker', 'Office Boy',
  'AC Technician', 'Welder', 'Mason', 'Tile Setter', 'Roofer', 'Glazier',
  'Heavy Equipment Operator', 'Crane Operator', 'Forklift Operator', 'Steel Fixer',
  'Pipe Fitter', 'HVAC Technician', 'Concrete Mixer', 'Excavator Operator',
  'Road Worker', 'Building Maintenance', 'Pool Cleaner', 'Landscaper',
  'Window Cleaner', 'Pest Control Technician', 'Laundry Worker', 'Dishwasher',
  'Food Preparation Worker', 'Kitchen Helper', 'Waiter', 'Barista', 'Cashier',
  'Shop Assistant', 'Inventory Clerk', 'Packer', 'Loading Worker', 'Moving Helper',
  'Cleaning Supervisor', 'Maintenance Supervisor'
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
  const baseUrl = 'https://gogethire.com'
  const currentDate = new Date()
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/create-profile`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employer-dashboard`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
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

  // Generate all city/job combination pages (43 cities × 49 jobs = 2,107 pages)
  const cityJobPages = []
  
  // Get all cities from GULF_REGIONS
  const allCities = Object.values(GULF_REGIONS).flatMap(region => region.cities)
  
  for (const city of allCities) {
    for (const job of JOB_TITLES) {
      const citySlug = cityToSlug(city)
      const jobSlug = jobToSlug(job)
      
      cityJobPages.push({
        url: `${baseUrl}/${citySlug}/${jobSlug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    }
  }

  console.log(`Generated sitemap with ${mainPages.length + cityJobPages.length} pages (${cityJobPages.length} city/job combinations)`)
  
  return [...mainPages, ...cityJobPages]
}
