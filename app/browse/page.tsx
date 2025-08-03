'use client'

import { useState, useMemo, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon, 
  BriefcaseIcon,
  StarIcon,
  EyeIcon,
  LockClosedIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City, FilterOptions } from '../../types'
import { generateDummyWorkers } from '../../utils/dummyData'

// Load real worker data from localStorage and combine with dummy data
const loadAllWorkers = (): Worker[] => {
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

const jobTitles: JobTitle[] = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 
  'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic', 
  'Construction Worker', 'Delivery Driver', 'Warehouse Worker', 'Office Boy'
]

const cities: City[] = [
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
  'Doha', 'Al Rayyan', 'Al Wakrah', 'Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina',
  'Muscat', 'Salalah', 'Sohar', 'Kuwait City', 'Hawalli', 'Manama', 'Riffa'
]

export default function BrowseWorkers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(true) // Enable all profiles for testing
  const [filters, setFilters] = useState<FilterOptions>({})
  const [workers, setWorkers] = useState<Worker[]>([])
  const [displayCount, setDisplayCount] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)

  useEffect(() => {
    // Load all workers (real + dummy data)
    const allWorkers = loadAllWorkers()
    setWorkers(allWorkers)
  }, [])

  const filteredWorkers = useMemo(() => {
    return workers.filter(worker => {
      // Search term filter
      if (searchTerm) {
        const searchMatch =
          worker.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.city.toLowerCase().includes(searchTerm.toLowerCase())
        if (!searchMatch) return false
      }

      // Filters
      if (filters.jobTitle && worker.jobTitle !== filters.jobTitle) return false
      if (filters.city && worker.city !== filters.city) return false
      if (filters.minExperience && worker.yearsExperience < filters.minExperience) return false
      if (filters.maxExperience && worker.yearsExperience > filters.maxExperience) return false
      if (filters.minSalary && worker.expectedSalary < filters.minSalary) return false
      if (filters.maxSalary && worker.expectedSalary > filters.maxSalary) return false
      if (filters.visaStatus && worker.visaStatus !== filters.visaStatus) return false

      return true
    })
  }, [workers, searchTerm, filters])

  const displayedWorkers = useMemo(() => {
    return filteredWorkers.slice(0, displayCount)
  }, [filteredWorkers, displayCount])

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm('')
    setDisplayCount(30)
  }

  const loadMoreWorkers = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => prev + 30)
      setIsLoading(false)
    }, 500)
  }

  const handleUnlockProfile = (workerId: string) => {
    if (!isSubscribed) {
      alert('Please subscribe to view contact details. Visit our pricing page to get started!')
      return
    }
    // Handle profile unlock logic here
    alert('Profile unlocked! Contact details are now visible.')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Browse Skilled Workers
          </h1>
          <p className="text-gray-600 text-lg">
            Find the perfect candidate for your business needs
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, job title, or city..."
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 text-sm sm:text-base whitespace-nowrap"
            >
              <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <select
                    value={filters.jobTitle || ''}
                    onChange={(e) => handleFilterChange('jobTitle', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Jobs</option>
                    {jobTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    value={filters.city || ''}
                    onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minExperience || ''}
                      onChange={(e) => handleFilterChange('minExperience', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxExperience || ''}
                      onChange={(e) => handleFilterChange('maxExperience', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary (Local Currency)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minSalary || ''}
                      onChange={(e) => handleFilterChange('minSalary', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxSalary || ''}
                      onChange={(e) => handleFilterChange('maxSalary', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Clear all filters
                </button>
                <span className="text-sm text-gray-600">
                  Showing {displayedWorkers.length} of {filteredWorkers.length} workers
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedWorkers.map((worker) => (
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
                  <div className="text-gray-600 text-sm">Local Currency/Month</div>
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
                  {worker.languagesSpoken.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      +{worker.languagesSpoken.length - 3} more
                    </span>
                  )}
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
                <button
                  onClick={() => handleUnlockProfile(worker.id)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <LockClosedIcon className="h-4 w-4" />
                  Unlock Contact
                </button>
              </div>

              {/* Subscription Notice */}
              {!isSubscribed && (
                <div className="mt-3 p-3 bg-gold-50 border border-gold-200 rounded-lg">
                  <p className="text-gold-800 text-xs text-center">
                    Subscribe to view contact details and unlock profiles
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedWorkers.length < filteredWorkers.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreWorkers}
              disabled={isLoading}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                `Load More Workers (${filteredWorkers.length - displayedWorkers.length} remaining)`
              )}
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BriefcaseIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}

        {/* Subscription CTA */}
        {!isSubscribed && displayedWorkers.length > 0 && (
          <div className="mt-12 bg-primary-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Unlock Full Access</h3>
            <p className="text-lg mb-6 text-gray-200">
              Subscribe to view contact details and connect with workers directly
            </p>
            <button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              View Pricing Plans
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
