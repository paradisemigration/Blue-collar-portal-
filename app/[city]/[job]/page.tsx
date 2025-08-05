'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  MapPinIcon,
  BriefcaseIcon,
  StarIcon,
  CheckBadgeIcon,
  EyeIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City } from '../../../types'
import { generateDummyWorkers, getCurrencyDisplayForCity, GULF_REGIONS } from '../../../utils/dummyData'

// Helper function to get country for city
function getCountryForCity(city: City): string {
  for (const [country, data] of Object.entries(GULF_REGIONS)) {
    if (data.cities.includes(city)) {
      return country
    }
  }
  return 'UAE' // fallback
}
import { generateCityJobFAQs } from '../../../utils/faqData'

// Ultra-fast worker generation for specific city and job category
const generateCategoryWorkers = (city: string, jobTitle: JobTitle): Worker[] => {
  const workers: Worker[] = []
  const categoryJobs = getJobsInSameCategory(jobTitle)

  // Expanded name pool for better variety
  const quickNames = [
    'Ahmed Hassan', 'Mohammed Ali', 'Omar Al-Rashid', 'Hassan Abdullah', 'Fatima Al-Zahra',
    'Aisha Abdullah', 'Zainab Hassan', 'Priya Sharma', 'Sunita Devi', 'Rajesh Kumar',
    'Maria Santos', 'Jose Reyes', 'Grace Wanjiku', 'Samuel Mwangi', 'David Kimani',
    'Anita Singh', 'Carlos Santos', 'Anna Dela Cruz', 'Michael Otieno', 'Sarah Wanjiru',
    'Tariq Al-Mahmoud', 'Geeta Sharma', 'Roberto Silva', 'Joyce Wangari', 'Khalid Al-Otaibi'
  ]

  const quickPictures = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  ]

  let workerCount = 0

  // Ensure the searched job gets priority and more workers
  const prioritizedJobs = [jobTitle, ...categoryJobs.filter(job => job !== jobTitle)]

  prioritizedJobs.forEach((categoryJob, jobIndex) => {
    // Give the searched job more workers (6-8), others get fewer (3-4)
    const isSearchedJob = categoryJob === jobTitle
    const workersPerJob = isSearchedJob ? Math.min(8, Math.max(6, 25 - workerCount)) : Math.min(4, Math.max(2, 35 - workerCount))

    for (let i = 0; i < workersPerJob && workerCount < 35; i++) {
      const nameIndex = (jobIndex * 10 + i) % quickNames.length
      const pictureIndex = (jobIndex * 5 + i) % quickPictures.length

      // Job-specific salary ranges
      const getSalaryRange = (job: JobTitle) => {
        if (job.includes('Supervisor') || job.includes('Manager')) return { min: 3500, max: 6000 }
        if (job.includes('Technician') || job.includes('Mechanic')) return { min: 2800, max: 5000 }
        if (job.includes('Driver') || job.includes('Operator')) return { min: 2200, max: 4000 }
        if (job.includes('Cook') || job.includes('Chef')) return { min: 2000, max: 4000 }
        if (job.includes('Cleaner') || job.includes('Helper')) return { min: 1500, max: 2800 }
        return { min: 1800, max: 3500 } // Default range
      }

      const salaryRange = getSalaryRange(categoryJob)
      const salary = Math.floor(Math.random() * (salaryRange.max - salaryRange.min)) + salaryRange.min

      workers.push({
        id: `fast_${workerCount + 1}`,
        fullName: quickNames[nameIndex],
        profilePicture: quickPictures[pictureIndex],
        jobTitle: categoryJob,
        yearsExperience: Math.floor(Math.random() * 8) + 1,
        city: city as City,
        country: getCountryForCity(city as City),
        languagesSpoken: ['English', 'Arabic'],
        expectedSalary: salary,
        visaStatus: Math.random() > 0.3 ? 'Work Visa' : 'Visit Visa',
        availability: true,
        aboutMe: `Experienced ${categoryJob.toLowerCase()} with excellent skills and reliability.`,
        phoneNumber: `+971${50000000 + workerCount}`,
        email: `${quickNames[nameIndex].toLowerCase().replace(' ', '.')}@email.com`,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      workerCount++
    }
  })

  return workers
}

// Super-fast worker loading for specific city and job category
const loadWorkersForCityJob = (city: string, jobTitle: string): Worker[] => {
  try {
    const workers: Worker[] = []

    // Quickly check localStorage without heavy processing
    if (typeof window !== 'undefined') {
      try {
        const userProfile = localStorage.getItem('userProfile')
        if (userProfile) {
          const profile = JSON.parse(userProfile)
          const categoryJobs = getJobsInSameCategory(jobTitle)
          if (profile.city === city && categoryJobs.includes(profile.jobTitle)) {
            workers.push(profile)
          }
        }
      } catch (e) {
        // Ignore localStorage errors to prevent blocking
      }
    }

    // Add fast generated category workers (this is the main source)
    const categoryWorkers = generateCategoryWorkers(city, jobTitle)
    workers.push(...categoryWorkers)

    return workers
  } catch (error) {
    console.error('Error loading workers:', error)
    // Return minimal fallback data
    return generateCategoryWorkers(city, jobTitle)
  }
}

const validCities: City[] = [
  // UAE
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain',
  // Qatar
  'Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen',
  // Saudi Arabia
  'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif',
  // Oman
  'Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi',
  // Kuwait
  'Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya',
  // Bahrain
  'Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra'
]

// Job categories for showing related workers
const JOB_CATEGORIES: Record<string, JobTitle[]> = {
  'Domestic & Personal Care Workers': [
    'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 'Babysitter',
    'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid',
    'Maid' // Legacy
  ],
  'Construction & Infrastructure': [
    'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 'Welder', 'Painter',
    'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 'HVAC Technician', 'Crane Operator',
    'Heavy Equipment Operator', 'Site Supervisor', 'Road Construction Worker',
    'Construction Worker' // Legacy
  ],
  'Mechanical & Technical': [
    'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 'Fitter',
    'Maintenance Technician', 'Elevator Technician', 'AC Technician', 'Forklift Operator', 'Lathe Machine Operator',
    'Mechanic' // Legacy
  ],
  'Manufacturing & Factory': [
    'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 'Quality Checker',
    'Production Supervisor', 'Fabricator', 'Loader/Unloader',
    'Warehouse Worker' // Legacy
  ],
  'Transport & Logistics': [
    'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 'Logistics Assistant',
    'Dispatch Coordinator', 'Heavy Vehicle Driver',
    'Driver' // Legacy
  ],
  'Cleaning & Maintenance': [
    'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 'Car Wash Attendant', 'Office Cleaner'
  ],
  'Hospitality & Food': [
    'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 'Barista', 'Food Delivery Rider'
  ],
  'Security & General Services': [
    'Security Guard', 'Watchman', 'Lifeguard', 'Maintenance Helper', 'General Helper'
  ],
  'Garments & Tailoring': [
    'Tailor', 'Ironing Staff', 'Textile Factory Worker'
  ],
  'Agriculture & Farming': [
    'Farm Worker', 'Livestock Handler', 'Greenhouse Worker',
    'Gardener' // Legacy
  ],
  'Other Common Jobs': [
    'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker'
  ]
}

// Flatten all jobs for validation
const validJobs: JobTitle[] = Object.values(JOB_CATEGORIES).flat()

// Function to get all jobs in the same category
function getJobsInSameCategory(jobTitle: JobTitle): JobTitle[] {
  for (const [category, jobs] of Object.entries(JOB_CATEGORIES)) {
    if (jobs.includes(jobTitle)) {
      return jobs
    }
  }
  return [jobTitle] // Fallback to just the single job
}

// Function to get category name for a job
function getCategoryForJob(jobTitle: JobTitle): string {
  for (const [category, jobs] of Object.entries(JOB_CATEGORIES)) {
    if (jobs.includes(jobTitle)) {
      return category
    }
  }
  return 'Other Jobs'
}

function formatCityName(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function formatJobTitle(slug: string): string {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function citySlugToDisplayName(slug: string): City {
  const formatted = formatCityName(slug)
  // Handle special cases
  const cityMap: Record<string, City> = {
    'Ras Al Khaimah': 'Ras Al Khaimah',
    'Umm Al Quwain': 'Umm Al Quwain',
    'Al Rayyan': 'Al Rayyan',
    'Al Wakrah': 'Al Wakrah',
    'Kuwait City': 'Kuwait City'
  }
  return (cityMap[formatted] as City) || (formatted as City)
}

function jobSlugToDisplayName(slug: string): JobTitle {
  const formatted = formatJobTitle(slug)
  // Handle special cases and aliases for all job titles
  const jobMap: Record<string, JobTitle> = {
    // Domestic & Personal Care Workers
    'Nanny Childcare Worker': 'Nanny (Childcare Worker)',
    'Nanny': 'Nanny (Childcare Worker)',
    'Childcare Worker': 'Nanny (Childcare Worker)',
    'Housemaid': 'Housemaid',
    'Maid': 'Housemaid', // Legacy mapping
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
    'Construction Worker': 'Construction Laborer', // Legacy mapping
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
    'Mechanic': 'Auto Mechanic', // Legacy mapping
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
    'Warehouse Worker': 'Warehouse Associate', // Legacy mapping
    'Quality Checker': 'Quality Checker',
    'Production Supervisor': 'Production Supervisor',
    'Fabricator': 'Fabricator',
    'Loader Unloader': 'Loader/Unloader',
    'Loader': 'Loader/Unloader',
    'Unloader': 'Loader/Unloader',

    // Transport & Logistics
    'Truck Driver': 'Truck Driver',
    'Driver': 'Truck Driver', // Legacy mapping
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
    'Chef': 'Cook', // Legacy mapping
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
  return (jobMap[formatted] as JobTitle) || (formatted as JobTitle)
}

interface PageProps {
  params: {
    city: string
    job: string
  }
}

// Metadata will be handled by layout or parent component

export default function CityJobPage({ params }: PageProps) {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  // Validate URL parameters
  useEffect(() => {
    const cityDisplay = citySlugToDisplayName(params.city)
    const jobDisplay = jobSlugToDisplayName(params.job)

    if (!validCities.includes(cityDisplay) ||
        !validJobs.includes(jobDisplay)) {
      router.push('/browse')
    }
  }, [params.city, params.job, router])

  const cityDisplay = citySlugToDisplayName(params.city)
  const jobDisplay = jobSlugToDisplayName(params.job)
  const localCurrency = getCurrencyDisplayForCity(params.city)

  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true)
        // Instant loading with fast generated workers
        const workers = loadWorkersForCityJob(cityDisplay, jobDisplay)
        setWorkers(workers)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading workers:', error)
        setWorkers([])
        setIsLoading(false)
      }
    }

    // Small delay to allow page to render first
    const timeoutId = setTimeout(loadData, 50)
    return () => clearTimeout(timeoutId)
  }, [cityDisplay, jobDisplay])

  // Show all workers from the same category (not just the specific job)
  const categoryJobs = getJobsInSameCategory(jobDisplay)
  const filteredWorkers = workers.filter(worker => {
    try {
      return worker.city === cityDisplay && categoryJobs.includes(worker.jobTitle)
    } catch (error) {
      console.error('Error filtering worker:', error)
      return false
    }
  })

  const categoryName = getCategoryForJob(jobDisplay)
  const specificJobWorkers = filteredWorkers.filter(w => w.jobTitle === jobDisplay).length

  const averageSalary = filteredWorkers.length > 0
    ? Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.expectedSalary, 0) / filteredWorkers.length)
    : 0

  // Generate unique FAQs for this city and job combination
  let faqs = []
  try {
    faqs = generateCityJobFAQs(params.city, jobDisplay)
  } catch (error) {
    console.error('Error generating FAQs:', error)
    // Fallback FAQ data
    faqs = [
      {
        question: `How much does it cost to hire a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `The average salary for ${jobDisplay.toLowerCase()}s in ${cityDisplay} varies based on experience and qualifications. Most employers also provide accommodation and transportation.`
      },
      {
        question: `How quickly can I hire a ${jobDisplay.toLowerCase()} in ${cityDisplay}?`,
        answer: `Most employers connect with suitable ${jobDisplay.toLowerCase()} candidates within 24-48 hours. The complete hiring process typically takes 2-6 weeks.`
      }
    ]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {jobDisplay}s in {cityDisplay}...</p>
        </div>
      </div>
    )
  }

  // Error boundary wrapper
  if (!validCities.includes(cityDisplay) || !validJobs.includes(jobDisplay)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-4">The job or city you're looking for doesn't exist.</p>
          <Link href="/browse" className="btn-primary">
            Find All Workers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hire Verified {jobDisplay}s in {cityDisplay}
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
              Connect with skilled and experienced {jobDisplay.toLowerCase()}s in {cityDisplay}.
              All profiles are verified and ready to work.
            </p>
            <div className="bg-white/10 rounded-lg p-3 mb-8 inline-block">
              <p className="text-sm text-gray-200">
                Showing workers from <span className="font-semibold text-gold-400">{categoryName}</span> category
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{specificJobWorkers}</div>
                <div className="text-gray-200 text-sm">{jobDisplay}s</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{filteredWorkers.length}</div>
                <div className="text-gray-200 text-sm">Category Total</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{localCurrency} {averageSalary}</div>
                <div className="text-gray-200 text-sm">Average Salary</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">24h</div>
                <div className="text-gray-200 text-sm">Average Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/browse" className="text-gray-500 hover:text-primary-600">Find Workers</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{cityDisplay} {jobDisplay}s</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredWorkers.length > 0 ? (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredWorkers.map((worker) => (
                <div key={worker.id} className="card hover:shadow-lg transition-shadow">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={worker.profilePicture}
                      alt={worker.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-navy-900">{worker.fullName}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-primary-600 font-medium">{worker.jobTitle}</p>
                        {worker.jobTitle === jobDisplay && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                            Exact Match
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {worker.city}, {worker.country}
                      </div>
                    </div>
                    {(worker.visaStatus === 'Work Visa' || worker.visaStatus === 'Freelance Visa') && (
                      <CheckBadgeIcon className="h-5 w-5 text-green-500" title={worker.visaStatus} />
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-900">{worker.yearsExperience}</div>
                      <div className="text-gray-600 text-sm">Years Exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-navy-900">{worker.expectedSalary}</div>
                      <div className="text-gray-600 text-sm">{localCurrency}/Month</div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-700 mb-2">Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {worker.languagesSpoken.slice(0, 3).map((lang) => (
                        <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* About Me Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {worker.aboutMe}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <EyeIcon className="h-4 w-4" />
                      View Profile
                    </button>
                    <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <LockClosedIcon className="h-4 w-4" />
                      Unlock Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-primary-600 text-white rounded-lg p-8 text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Hire?</h3>
              <p className="text-lg mb-6 text-gray-200">
                Subscribe now to unlock contact details and connect with {jobDisplay.toLowerCase()}s directly
              </p>
              <Link href="/pricing" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block">
                View Pricing Plans
              </Link>
            </div>
          </>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <BriefcaseIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {jobDisplay}s found in {cityDisplay}
            </h3>
            <p className="text-gray-600 mb-6">
              We're constantly adding new profiles. Check back soon or browse other locations.
            </p>
            <Link href="/browse" className="btn-primary">
              Find All Workers
            </Link>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Frequently Asked Questions About {jobDisplay}s in {cityDisplay}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-navy-900 mb-3 leading-tight">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Note: Removed generateStaticParams to prevent SSG issues with client-side data loading
