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
  
  // Handle special mappings for all new job titles
  const jobMap: Record<string, string> = {
    // Domestic & Personal Care Workers
    'Nanny Childcare Worker': 'Nanny (Childcare Worker)',
    'Nanny': 'Nanny (Childcare Worker)',
    'Childcare Worker': 'Nanny (Childcare Worker)',
    'Housemaid': 'Housemaid',
    'Maid': 'Housemaid',
    'Cook Home Based': 'Cook (Home-based)',
    'Home Cook': 'Cook (Home-based)',
    'Elderly Caregiver': 'Elderly Caregiver',
    'Babysitter': 'Babysitter',
    'Domestic Helper': 'Domestic Helper',
    'Governess Live In Tutor Nanny': 'Governess (Live-in Tutor/Nanny)',
    'Governess': 'Governess (Live-in Tutor/Nanny)',
    'Housekeeper Residential': 'Housekeeper (Residential)',
    'Housekeeper': 'Housekeeper (Residential)',
    'Personal Attendant': 'Personal Attendant',
    'Live In Maid': 'Live-in Maid',

    // Construction & Infrastructure
    'Construction Laborer': 'Construction Laborer',
    'Construction Worker': 'Construction Laborer',
    'Mason': 'Mason',
    'Carpenter': 'Carpenter',
    'Electrician': 'Electrician',
    'Plumber': 'Plumber',
    'Welder': 'Welder',
    'Painter': 'Painter',
    'Steel Fixer': 'Steel Fixer',
    'Scaffold Worker': 'Scaffold Worker',
    'Tile Setter': 'Tile Setter',
    'Hvac Technician': 'HVAC Technician',
    'HVAC Technician': 'HVAC Technician',
    'Crane Operator': 'Crane Operator',
    'Heavy Equipment Operator': 'Heavy Equipment Operator',
    'Site Supervisor': 'Site Supervisor',
    'Road Construction Worker': 'Road Construction Worker',

    // Mechanical & Technical
    'Auto Mechanic': 'Auto Mechanic',
    'Mechanic': 'Auto Mechanic',
    'Diesel Mechanic': 'Diesel Mechanic',
    'Machine Operator': 'Machine Operator',
    'Cnc Machine Operator': 'CNC Machine Operator',
    'CNC Machine Operator': 'CNC Machine Operator',
    'Fitter': 'Fitter',
    'Maintenance Technician': 'Maintenance Technician',
    'Elevator Technician': 'Elevator Technician',
    'Ac Technician': 'AC Technician',
    'AC Technician': 'AC Technician',
    'Forklift Operator': 'Forklift Operator',
    'Lathe Machine Operator': 'Lathe Machine Operator',

    // Manufacturing & Factory
    'Factory Worker': 'Factory Worker',
    'Assembly Line Worker': 'Assembly Line Worker',
    'Packer': 'Packer',
    'Warehouse Associate': 'Warehouse Associate',
    'Warehouse Worker': 'Warehouse Associate',
    'Quality Checker': 'Quality Checker',
    'Production Supervisor': 'Production Supervisor',
    'Fabricator': 'Fabricator',
    'Loader Unloader': 'Loader/Unloader',

    // Transport & Logistics
    'Truck Driver': 'Truck Driver',
    'Driver': 'Truck Driver',
    'Delivery Driver': 'Delivery Driver',
    'Bus Driver': 'Bus Driver',
    'Light Vehicle Driver': 'Light Vehicle Driver',
    'Logistics Assistant': 'Logistics Assistant',
    'Dispatch Coordinator': 'Dispatch Coordinator',
    'Heavy Vehicle Driver': 'Heavy Vehicle Driver',

    // Cleaning & Maintenance
    'Cleaner': 'Cleaner',
    'Housekeeping Staff': 'Housekeeping Staff',
    'Janitor': 'Janitor',
    'Building Maintenance Worker': 'Building Maintenance Worker',
    'Car Wash Attendant': 'Car Wash Attendant',
    'Office Cleaner': 'Office Cleaner',

    // Hospitality & Food
    'Cook': 'Cook',
    'Chef': 'Cook',
    'Kitchen Helper': 'Kitchen Helper',
    'Waiter': 'Waiter',
    'Dishwasher': 'Dishwasher',
    'Restaurant Cleaner': 'Restaurant Cleaner',
    'Barista Basic': 'Barista',
    'Barista': 'Barista',
    'Food Delivery Rider': 'Food Delivery Rider',

    // Security & General Services
    'Security Guard': 'Security Guard',
    'Watchman': 'Watchman',
    'Lifeguard': 'Lifeguard',
    'Maintenance Helper': 'Maintenance Helper',
    'General Helper': 'General Helper',

    // Garments & Tailoring
    'Tailor': 'Tailor',
    'Ironing Staff': 'Ironing Staff',
    'Textile Factory Worker': 'Textile Factory Worker',

    // Agriculture & Farming
    'Farm Worker': 'Farm Worker',
    'Farmer': 'Farm Worker',
    'Livestock Handler': 'Livestock Handler',
    'Greenhouse Worker': 'Greenhouse Worker',

    // Other Common Jobs
    'Petrol Pump Attendant': 'Petrol Pump Attendant',
    'Gas Station Attendant': 'Petrol Pump Attendant',
    'Office Boy': 'Office Boy',
    'Tea Boy': 'Tea Boy',
    'Baggage Handler': 'Baggage Handler',
    'Laundry Worker': 'Laundry Worker',
    'Pest Control Worker': 'Pest Control Worker'
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
