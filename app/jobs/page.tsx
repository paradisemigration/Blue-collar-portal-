import Link from 'next/link'
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  ChevronRightIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { 
  ALL_CITIES, 
  JOB_CATEGORIES_URL_MAP, 
  getCityDisplayName,
  getCategoryDisplayName,
  getCityCountry,
  getCompaniesForCity
} from '../../utils/companiesData'

export const metadata = {
  title: 'Latest Jobs - Find Work Opportunities in UAE, Saudi Arabia & Qatar',
  description: 'Browse the latest job opportunities for blue-collar workers across the Gulf region. Find driver, maid, construction, and other skilled worker positions.',
  keywords: 'jobs gulf, work opportunities UAE, Saudi jobs, Qatar employment, driver jobs, maid jobs, construction workers',
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

      {/* Browse by City */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Browse Jobs by City</h2>
            <p className="text-gray-600 text-lg">
              Explore opportunities in major Gulf cities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ALL_CITIES.map((city, index) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, '-')
              const companies = getCompaniesForCity(city)
              const country = getCityCountry(city)
              
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900">{city}</h3>
                      <p className="text-gray-600 text-sm">{country}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                      <span>{companies.length} companies</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <BriefcaseIcon className="h-4 w-4 mr-2" />
                      <span>15+ job categories</span>
                    </div>
                  </div>

                  {/* Popular categories for this city */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(JOB_CATEGORIES_URL_MAP).slice(0, 4).map(([key, value]) => (
                      <Link
                        key={key}
                        href={`/jobs/${citySlug}/${value}`}
                        className="text-xs bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-2 py-1 rounded text-center transition-colors"
                      >
                        {getCategoryDisplayName(value)}
                      </Link>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/jobs/${citySlug}/driver`}
                      className="text-xs bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded text-center transition-colors"
                    >
                      Driver Jobs
                    </Link>
                    <Link
                      href={`/jobs/${citySlug}/domestic-workers`}
                      className="text-xs bg-secondary-600 hover:bg-secondary-700 text-white py-2 px-3 rounded text-center transition-colors"
                    >
                      Domestic Jobs
                    </Link>
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
                      className="text-xs bg-secondary-600 hover:bg-secondary-700 text-white py-1.5 px-2 rounded text-center transition-colors"
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
              href="/browse"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors border border-white/20"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
