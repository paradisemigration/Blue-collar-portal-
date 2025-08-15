'use client'

import Link from 'next/link'
import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { ALL_CITIES, INDIVIDUAL_JOBS_URL_MAP } from '../../utils/companiesData'

export default function AllJobsPage() {
  // Convert cities to URL-friendly format
  const cityUrls = ALL_CITIES.map(city => ({
    name: city,
    slug: city.toLowerCase().replace(/\s+/g, '-')
  }))

  // Group jobs by category for better organization
  const jobsByCategory = {
    'Domestic & Personal Care': [
      'Nanny (Childcare Worker)', 'Housemaid', 'Cook (Home-based)', 'Elderly Caregiver', 
      'Babysitter', 'Domestic Helper', 'Governess (Live-in Tutor/Nanny)', 
      'Housekeeper (Residential)', 'Personal Attendant', 'Live-in Maid', 'Maid'
    ],
    'Construction & Infrastructure': [
      'Construction Laborer', 'Mason', 'Carpenter', 'Electrician', 'Plumber', 
      'Welder', 'Painter', 'Steel Fixer', 'Scaffold Worker', 'Tile Setter', 
      'HVAC Technician', 'Crane Operator', 'Heavy Equipment Operator', 
      'Site Supervisor', 'Road Construction Worker', 'Construction Worker'
    ],
    'Transport & Logistics': [
      'Truck Driver', 'Delivery Driver', 'Bus Driver', 'Light Vehicle Driver', 
      'Logistics Assistant', 'Dispatch Coordinator', 'Heavy Vehicle Driver', 'Driver'
    ],
    'Technical & Mechanical': [
      'Auto Mechanic', 'Diesel Mechanic', 'Machine Operator', 'CNC Machine Operator', 
      'Fitter', 'Maintenance Technician', 'Elevator Technician', 'AC Technician', 
      'Forklift Operator', 'Lathe Machine Operator', 'Mechanic'
    ],
    'Manufacturing & Factory': [
      'Factory Worker', 'Assembly Line Worker', 'Packer', 'Warehouse Associate', 
      'Quality Checker', 'Production Supervisor', 'Fabricator', 'Loader/Unloader', 
      'Warehouse Worker'
    ],
    'Hospitality & Food Service': [
      'Cook', 'Kitchen Helper', 'Waiter', 'Dishwasher', 'Restaurant Cleaner', 
      'Barista', 'Food Delivery Rider'
    ],
    'Security & Services': [
      'Security Guard', 'Watchman', 'Lifeguard', 'Maintenance Helper', 'General Helper'
    ],
    'Cleaning & Maintenance': [
      'Cleaner', 'Housekeeping Staff', 'Janitor', 'Building Maintenance Worker', 
      'Car Wash Attendant', 'Office Cleaner'
    ],
    'Specialized Services': [
      'Tailor', 'Ironing Staff', 'Textile Factory Worker', 'Farm Worker', 
      'Livestock Handler', 'Greenhouse Worker', 'Gardener', 'Petrol Pump Attendant', 
      'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker'
    ]
  }

  const totalJobs = Object.values(INDIVIDUAL_JOBS_URL_MAP).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              All Job Categories in Gulf Region
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Browse all {totalJobs} job types across {ALL_CITIES.length} cities in UAE, Saudi Arabia & Qatar.
              Find specific job opportunities and apply directly to top companies.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{totalJobs}</div>
                <div className="text-gray-200 text-sm">Job Types</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{ALL_CITIES.length}</div>
                <div className="text-gray-200 text-sm">Cities</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">1000+</div>
                <div className="text-gray-200 text-sm">Companies</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">Free</div>
                <div className="text-gray-200 text-sm">Application</div>
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
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900">All Jobs</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Apply Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Apply to Multiple Companies at Once
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Create your profile once and apply to hundreds of companies across the Gulf region. 
              Get hired faster with our streamlined application process.
            </p>
            <Link 
              href="/create-profile"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
            >
              Create Profile & Start Applying
            </Link>
          </div>
        </div>

        {/* Job Categories */}
        <div className="space-y-8">
          {Object.entries(jobsByCategory).map(([category, jobs]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <BriefcaseIcon className="h-8 w-8 text-primary-600" />
                <h3 className="text-2xl font-bold text-navy-900">{category}</h3>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {jobs.length} Jobs
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => {
                  const jobSlug = INDIVIDUAL_JOBS_URL_MAP[job]
                  if (!jobSlug) return null
                  
                  return (
                    <div key={job} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-navy-900 mb-3">{job}</h4>
                      <div className="space-y-2">
                        {cityUrls.slice(0, 4).map((city) => (
                          <Link
                            key={`${jobSlug}-${city.slug}`}
                            href={`/jobs/${city.slug}/${jobSlug}`}
                            className="block text-sm text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {city.name} Jobs →
                          </Link>
                        ))}
                        {cityUrls.length > 4 && (
                          <details className="mt-2">
                            <summary className="text-sm text-gray-500 cursor-pointer hover:text-primary-600">
                              Show more cities...
                            </summary>
                            <div className="mt-2 space-y-1">
                              {cityUrls.slice(4).map((city) => (
                                <Link
                                  key={`${jobSlug}-${city.slug}`}
                                  href={`/jobs/${city.slug}/${jobSlug}`}
                                  className="block text-sm text-primary-600 hover:text-primary-700 hover:underline pl-4"
                                >
                                  {city.name} Jobs →
                                </Link>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mt-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Popular Job Destinations
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityUrls.map((city) => (
              <div key={city.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-navy-900">{city.name}</h4>
                  <MapPinIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="space-y-2 mb-4">
                  <Link href={`/jobs/${city.slug}/light-vehicle-driver`} className="block text-sm text-primary-600 hover:underline">
                    Driver Jobs →
                  </Link>
                  <Link href={`/jobs/${city.slug}/housemaid`} className="block text-sm text-primary-600 hover:underline">
                    Housemaid Jobs →
                  </Link>
                  <Link href={`/jobs/${city.slug}/construction-laborer`} className="block text-sm text-primary-600 hover:underline">
                    Construction Jobs →
                  </Link>
                  <Link href={`/jobs/${city.slug}/security-guard`} className="block text-sm text-primary-600 hover:underline">
                    Security Jobs →
                  </Link>
                </div>
                <Link 
                  href={`/jobs/${city.slug}/housemaid`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View All {city.name} Jobs
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Search Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 sm:p-8 mt-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">
            Tips for Finding the Right Job
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Be Specific</h4>
              <p className="text-gray-700 text-sm">
                Use specific job titles like "Light Vehicle Driver" instead of just "Driver" 
                to find the most relevant opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">📍</div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Choose Your City</h4>
              <p className="text-gray-700 text-sm">
                Different cities offer different opportunities and benefits. 
                Research each location to find the best fit for you.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">📄</div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Complete Profile</h4>
              <p className="text-gray-700 text-sm">
                A complete profile with experience and documents increases 
                your chances of getting hired quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
