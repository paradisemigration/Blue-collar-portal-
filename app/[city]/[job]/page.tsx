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
import { generateDummyWorkers, getCurrencyDisplayForCity } from '../../../utils/dummyData'
import { generateCityJobFAQs } from '../../../utils/faqData'

// Load actual user data from localStorage and combine with dummy data
const loadWorkers = (): Worker[] => {
  try {
    const workers: Worker[] = []

    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      // Load individual profile
      const userProfile = localStorage.getItem('userProfile')
      if (userProfile) {
        workers.push(JSON.parse(userProfile))
      }

      // Load all profiles
      const allProfiles = localStorage.getItem('allUserProfiles')
      if (allProfiles) {
        const profiles = JSON.parse(allProfiles)
        profiles.forEach((profile: Worker) => {
          if (!workers.find(w => w.id === profile.id)) {
            workers.push(profile)
          }
        })
      }
    }

    // Add comprehensive dummy data
    const dummyWorkers = generateDummyWorkers()
    dummyWorkers.forEach((dummyWorker) => {
      if (!workers.find(w => w.id === dummyWorker.id)) {
        workers.push(dummyWorker)
      }
    })

    return workers
  } catch (error) {
    console.error('Error loading workers:', error)
    return generateDummyWorkers() // Fallback to dummy data
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

const validJobs: JobTitle[] = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter',
  'Painter', 'Security Guard', 'Cook', 'Cook', 'Gardener', 'Mechanic',
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
  // Handle special cases and aliases
  const jobMap: Record<string, JobTitle> = {
    'Security Guard': 'Security Guard',
    'Construction Worker': 'Construction Worker',
    'Delivery Driver': 'Delivery Driver',
    'Warehouse Worker': 'Warehouse Worker',
    'Office Boy': 'Office Boy',
    'Chef': 'Cook', // Map chef to cook
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
    if (!validCities.includes(params.city.toLowerCase() as City) ||
        !validJobs.includes(params.job.toLowerCase() as JobTitle)) {
      router.push('/browse')
    }
  }, [params.city, params.job, router])

  const cityDisplay = citySlugToDisplayName(params.city)
  const jobDisplay = jobSlugToDisplayName(params.job)
  const localCurrency = getCurrencyDisplayForCity(params.city)

  useEffect(() => {
    const loadData = async () => {
      try {
        const allWorkers = loadWorkers()
        setWorkers(allWorkers)
      } catch (error) {
        console.error('Error loading workers:', error)
        setWorkers(generateDummyWorkers())
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter workers by city and job (handle job title mapping)
  const targetJobTitle = jobSlugToDisplayName(params.job)
  const filteredWorkers = workers.filter(worker =>
    worker.city.toLowerCase().replace(/\s+/g, '-') === params.city.toLowerCase() &&
    worker.jobTitle === targetJobTitle
  )

  const averageSalary = filteredWorkers.length > 0
    ? Math.round(filteredWorkers.reduce((sum, worker) => sum + worker.expectedSalary, 0) / filteredWorkers.length)
    : 0

  // Generate unique FAQs for this city and job combination
  const faqs = generateCityJobFAQs(params.city, jobDisplay)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hire Verified {jobDisplay}s in {cityDisplay}
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Connect with skilled and experienced {jobDisplay.toLowerCase()}s in {cityDisplay}. 
              All profiles are verified and ready to work.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{filteredWorkers.length}</div>
                <div className="text-gray-200">Available {jobDisplay}s</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{localCurrency} {averageSalary}</div>
                <div className="text-gray-200">Average Salary</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">24h</div>
                <div className="text-gray-200">Average Response</div>
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
            <Link href="/browse" className="text-gray-500 hover:text-primary-600">Browse Workers</Link>
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
                      <p className="text-primary-600 font-medium">{worker.jobTitle}</p>
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
              Browse All Workers
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
