import Link from 'next/link'
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  ChevronRightIcon,
  HomeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import {
  ALL_CITIES,
  JOB_CATEGORIES_URL_MAP,
  getCityDisplayName,
  getCategoryDisplayName,
  getCityCountry,
  getCompaniesForCity
} from '../../utils/companiesData'
import { getJobProfilesForCity } from '../../utils/jobProfiles'

export const metadata = {
  title: 'Latest Jobs in Gulf Region - UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain | Apply Online',
  description: 'Find latest job opportunities across 29 Gulf cities. Browse 500+ companies hiring drivers, domestic workers, construction, technical, and hospitality jobs. Apply online today.',
  keywords: 'jobs gulf region, UAE jobs, Saudi Arabia employment, Qatar jobs, Oman careers, Kuwait jobs, Bahrain employment, driver jobs, maid jobs, construction workers, apply online jobs',
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
    canonical: '/jobs',
  },
  openGraph: {
    title: 'Latest Jobs in Gulf Region - Apply Online Today',
    description: 'Find job opportunities in UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain. 500+ companies hiring across 29 cities.',
    url: '/jobs',
    siteName: 'Go Get Hires',
    images: [
      {
        url: '/og-jobs.png',
        width: 1200,
        height: 630,
        alt: 'Latest Jobs in Gulf Region',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest Jobs in Gulf Region - Apply Online',
    description: 'Find job opportunities in UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain. Apply online today.',
    images: ['/og-jobs.png'],
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

// Popular job combinations for quick access
const POPULAR_SEARCHES = [
  { city: 'dubai', category: 'driver', country: 'UAE' },
  { city: 'abu-dhabi', category: 'domestic-workers', country: 'UAE' },
  { city: 'riyadh', category: 'construction-workers', country: 'Saudi Arabia' },
  { city: 'doha', category: 'office-workers', country: 'Qatar' },
  { city: 'sharjah', category: 'retail-workers', country: 'UAE' },
  { city: 'jeddah', category: 'driver', country: 'Saudi Arabia' }
]

// Stats for the platform
const PLATFORM_STATS = [
  { number: '500+', label: 'Active Companies', icon: BuildingOfficeIcon },
  { number: '13', label: 'Cities', icon: MapPinIcon },
  { number: '15+', label: 'Job Categories', icon: BriefcaseIcon },
  { number: '10K+', label: 'Job Seekers', icon: UserGroupIcon }
]

export default function JobsPage() {
  // Calculate total companies across all cities
  const totalCompanies = ALL_CITIES.reduce((total, city) => {
    const companies = getCompaniesForCity(city)
    return total + companies.length
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm items-center">
            <Link href="/" className="text-gray-500 hover:text-primary-600 flex items-center">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">Latest Jobs</span>
          </nav>
        </div>
      </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Next Job in the Gulf
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Discover thousands of job opportunities across UAE, Saudi Arabia, and Qatar. 
              Connect with top employers and advance your career today.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              {PLATFORM_STATS.map((stat, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 lg:p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-gold-400" />
                  <div className="text-2xl lg:text-3xl font-bold text-gold-400">{stat.number}</div>
                  <div className="text-gray-200 text-sm lg:text-base">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link 
              href="/create-profile"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Popular Job Searches</h2>
            <p className="text-gray-600 text-lg">
              Quick access to the most in-demand positions across the Gulf region
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_SEARCHES.map((search, index) => {
              const cityDisplay = getCityDisplayName(search.city)
              const categoryDisplay = getCategoryDisplayName(search.category)
              const companies = getCompaniesForCity(cityDisplay)
              
              return (
                <Link 
                  key={index}
                  href={`/jobs/${search.city}/${search.category}`}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                      <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {search.country}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {categoryDisplay} Jobs in {cityDisplay}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                    <span>{companies.length} companies hiring</span>
                  </div>
                  
                  <div className="flex items-center text-primary-600 text-sm font-medium">
                    <span>View all positions</span>
                    <svg className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Browse by City with Job Profiles */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Browse Jobs by City</h2>
            <p className="text-gray-600 text-lg">
              Explore opportunities in major Gulf cities with featured job listings
            </p>
          </div>

          <div className="space-y-12">
            {ALL_CITIES.map((city, index) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, '-')
              const companies = getCompaniesForCity(city)
              const country = getCityCountry(city)
              const jobProfiles = getJobProfilesForCity(city)

              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  {/* City Header */}
                  <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-primary-100 p-3 rounded-lg mr-4">
                          <MapPinIcon className="h-8 w-8 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-navy-900">{city}</h3>
                          <p className="text-gray-600">{country}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                              <span>{companies.length} companies</span>
                            </div>
                            <div className="flex items-center">
                              <BriefcaseIcon className="h-4 w-4 mr-1" />
                              <span>{jobProfiles.length} featured jobs</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/jobs/${citySlug}/driver`}
                          className="text-sm bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded text-center transition-colors"
                        >
                          Driver Jobs
                        </Link>
                        <Link
                          href={`/jobs/${citySlug}/domestic-workers`}
                          className="text-sm bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-center transition-colors"
                        >
                          Domestic Jobs
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Job Profiles Grid */}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-navy-900 mb-4">Featured Job Opportunities in {city}</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {jobProfiles.slice(0, 10).map((job, jobIndex) => (
                        <Link
                          key={job.id}
                          href="/create-profile"
                          className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-primary-300 rounded-lg p-4 transition-all group hover:shadow-md"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                              <BriefcaseIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            {job.urgent && (
                              <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                                Urgent
                              </span>
                            )}
                          </div>

                          <h5 className="font-semibold text-navy-900 mb-1 group-hover:text-primary-600 transition-colors">
                            {job.title}
                          </h5>

                          <p className="text-sm text-gray-600 mb-2">{job.company}</p>

                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            <span>{job.salary}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{job.type}</span>
                            <span>{job.posted}</span>
                          </div>

                          <div className="mt-3 text-primary-600 text-sm font-medium">
                            Apply Now →
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* View All Jobs Link */}
                    <div className="text-center mt-6">
                      <Link
                        href={`/jobs/${citySlug}/driver`}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all jobs in {city}
                        <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Browse by Category */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Browse by Job Category</h2>
            <p className="text-gray-600 text-lg">
              Find opportunities in your field of expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(JOB_CATEGORIES_URL_MAP).map(([key, value]) => {
              const categoryDisplay = getCategoryDisplayName(value)
              
              return (
                <div key={key} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group">
                  <div className="bg-primary-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary-200 transition-colors">
                    <BriefcaseIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-navy-900 mb-3">
                    {categoryDisplay}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Available in {ALL_CITIES.length} cities across the Gulf region
                  </p>

                  {/* Popular cities for this category */}
                  <div className="space-y-2 mb-4">
                    {ALL_CITIES.slice(0, 3).map((city) => {
                      const citySlug = city.toLowerCase().replace(/\s+/g, '-')
                      const companies = getCompaniesForCity(city)
                      
                      return (
                        <Link
                          key={city}
                          href={`/jobs/${citySlug}/${value}`}
                          className="flex items-center justify-between text-sm text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          <span>{city}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {companies.length} companies
                          </span>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/jobs/dubai/${value}`}
                      className="text-xs bg-primary-600 hover:bg-primary-700 text-white py-1.5 px-2 rounded text-center transition-colors"
                    >
                      Dubai
                    </Link>
                    <Link
                      href={`/jobs/riyadh/${value}`}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white py-1.5 px-2 rounded text-center transition-colors"
                    >
                      Riyadh
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Related Job Opportunities */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Popular Job Opportunities</h2>
            <p className="text-gray-600 text-lg">
              Trending job searches across the Gulf region
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Driver Jobs in Dubai', href: '/jobs/dubai/driver', companies: '150+', urgent: true },
              { title: 'Domestic Workers in Abu Dhabi', href: '/jobs/abu-dhabi/domestic-workers', companies: '200+' },
              { title: 'Construction Workers in Riyadh', href: '/jobs/riyadh/construction-workers', companies: '180+', urgent: true },
              { title: 'Technical Workers in Doha', href: '/jobs/doha/technical-workers', companies: '120+' },
              { title: 'Hospitality Workers in Kuwait City', href: '/jobs/kuwait-city/hospitality-workers', companies: '90+' },
              { title: 'Factory Workers in Manama', href: '/jobs/manama/factory-workers', companies: '110+', urgent: true }
            ].map((job, index) => (
              <Link
                key={index}
                href={job.href}
                className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <BriefcaseIcon className="h-6 w-6 text-primary-600 mt-1" />
                  {job.urgent && (
                    <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                  <span>{job.companies} companies hiring</span>
                </div>
                <div className="flex items-center text-primary-600 text-sm font-medium">
                  <span>View opportunities</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-12 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg">
              Real people who found their dream jobs through our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I found my driver job in Dubai within 3 days of creating my profile. 
                The process was smooth and the company contacted me directly."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-navy-900">Ahmad K.</div>
                <div className="text-gray-600">Driver in Dubai</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Amazing platform! I got multiple offers for housekeeping positions 
                in Abu Dhabi. Very professional companies and good salaries."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-navy-900">Maria L.</div>
                <div className="text-gray-600">Domestic Worker in Abu Dhabi</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Quick response from construction companies in Qatar. 
                Got hired for a major project in Doha with excellent benefits."
              </p>
              <div className="text-sm">
                <div className="font-semibold text-navy-900">Hassan M.</div>
                <div className="text-gray-600">Construction Worker in Doha</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-primary-600 to-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of successful job seekers who found their dream jobs through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/create-profile"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Create Your Profile
            </Link>
            <Link
              href="/jobs/dubai/driver"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-white/20"
            >
              View Driver Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
