'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  BriefcaseIcon,
  StarIcon,
  EyeIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  HomeIcon,
  CreditCardIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon
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
  'Petrol Pump Attendant', 'Office Boy', 'Tea Boy', 'Baggage Handler', 'Laundry Worker', 'Pest Control Worker'
]

const cities: City[] = [
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

export default function BrowseWorkers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false) // Set to false to show payment flow
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
      if (filters.availability !== undefined && worker.availability !== filters.availability) return false

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

  const handleViewProfile = (worker: Worker) => {
    setSelectedWorker(worker)
  }

  const closeProfileModal = () => {
    setSelectedWorker(null)
  }

  // Function to get verification badge color based on visa status
  const getVerificationColor = (visaStatus: string) => {
    switch (visaStatus) {
      case 'Work Visa':
        return 'text-green-500'
      case 'Freelance Visa':
        return 'text-blue-500'
      case 'Visit Visa':
        return 'text-yellow-500'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600 flex items-center transition-colors">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">Browse Workers</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Find Your Perfect 
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent"> Worker</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Connect with skilled professionals across the Gulf region. Browse verified profiles and find the ideal candidate for your needs.
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center items-center gap-6 sm:gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-primary-500" />
                <span>{workers.length}+ Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                <span>Verified Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-blue-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, job title, or location..."
                className="block w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                showFilters 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Category</label>
                  <select
                    value={filters.jobTitle || ''}
                    onChange={(e) => handleFilterChange('jobTitle', e.target.value || undefined)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Jobs</option>
                    {jobTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.city || ''}
                    onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (Years)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minExperience || ''}
                      onChange={(e) => handleFilterChange('minExperience', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxExperience || ''}
                      onChange={(e) => handleFilterChange('maxExperience', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Visa Status</label>
                  <select
                    value={filters.visaStatus || ''}
                    onChange={(e) => handleFilterChange('visaStatus', e.target.value || undefined)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Visa Types</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Visit Visa">Visit Visa</option>
                    <option value="Freelance Visa">Freelance Visa</option>
                    <option value="Expired Visa">Expired Visa</option>
                    <option value="No Visa">No Visa</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Clear all filters
                </button>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Showing {displayedWorkers.length} of {filteredWorkers.length} workers
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {displayedWorkers.map((worker) => (
            <div key={worker.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
              {/* Profile Header with Fixed Layout */}
              <div className="relative p-6 pb-4">
                {/* Background Gradient */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-t-2xl"></div>

                {/* Visa Status Badge - Positioned to avoid overlap */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                    worker.visaStatus === 'Work Visa' ? 'bg-green-100 text-green-800 border border-green-200' :
                    worker.visaStatus === 'Freelance Visa' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    worker.visaStatus === 'Visit Visa' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {worker.visaStatus}
                  </span>
                </div>

                <div className="relative flex items-start gap-4 mt-2">
                  <div className="relative">
                    <div className="relative">
                      <img
                        src={worker.profilePicture}
                        alt={worker.fullName}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-4 border-white shadow-lg transition-all duration-300 ${
                          !isSubscribed ? 'filter blur-md' : ''
                        }`}
                      />
                      {/* Blur overlay for non-premium users */}
                      {!isSubscribed && (
                        <div className="absolute inset-0 bg-gray-200/30 rounded-2xl border-4 border-white flex items-center justify-center">
                          <LockClosedIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      )}
                    </div>
                    {/* Online Status Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pr-20">
                    {/* Name and Job Title */}
                    <div className="mb-3">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate leading-tight">
                            {worker.fullName}
                          </h3>
                          <p className="text-primary-600 font-semibold text-sm sm:text-base truncate mt-1">
                            {worker.jobTitle}
                          </p>
                        </div>
                        {/* Verification Icon - Positioned clearly */}
                        <div className="flex-shrink-0 mt-1">
                          <CheckBadgeIcon className={`h-6 w-6 ${getVerificationColor(worker.visaStatus)}`} />
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{worker.city}, {worker.country}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-blue-600">{worker.yearsExperience}</div>
                    <div className="text-blue-500 text-xs font-medium">Years Exp.</div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-green-600">{worker.expectedSalary}</div>
                    <div className="text-green-500 text-xs font-medium">Expected/Month</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Languages */}
              <div className="px-6 pb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Languages</div>
                <div className="flex flex-wrap gap-1.5">
                  {worker.languagesSpoken.slice(0, 2).map((lang) => (
                    <span key={lang} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {lang}
                    </span>
                  ))}
                  {worker.languagesSpoken.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      +{worker.languagesSpoken.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Enhanced About Preview */}
              <div className="px-6 pb-6">
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {worker.aboutMe}
                </p>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="px-6 pb-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewProfile(worker)}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <Link
                    href="/pricing"
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                    <span className="text-sm">Unlock</span>
                  </Link>
                </div>
                
                {/* Premium Notice */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-500">
                    💎 <span className="font-medium">Unlock contact details</span> with premium access
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Load More Button */}
        {displayedWorkers.length < filteredWorkers.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreWorkers}
              disabled={isLoading}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center gap-3 mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading more workers...
                </>
              ) : (
                <>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  Load More Workers ({filteredWorkers.length - displayedWorkers.length} remaining)
                </>
              )}
            </button>
          </div>
        )}

        {/* Enhanced No Results */}
        {filteredWorkers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-3xl p-8 max-w-md mx-auto">
              <BriefcaseIcon className="h-20 w-20 mx-auto text-primary-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No workers found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all available workers</p>
              <button onClick={clearFilters} className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Premium CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Unlock Premium Access</h3>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get instant access to contact details, verified profiles, and priority support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-green-300" />
                <span>Direct Contact Access</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-green-300" />
                <span>Verified Profiles Only</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckBadgeIcon className="h-5 w-5 text-green-300" />
                <span>24/7 Support</span>
              </div>
            </div>

            <Link 
              href="/pricing"
              className="inline-flex items-center gap-3 bg-white text-primary-600 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <CreditCardIcon className="h-6 w-6" />
              View Pricing Plans
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Profile Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-6 py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <EyeIcon className="h-6 w-6" />
                  </div>
                  Worker Profile
                </h2>
                <button
                  onClick={closeProfileModal}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Enhanced Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <img
                    src={selectedWorker.profilePicture}
                    alt={selectedWorker.fullName}
                    className="w-24 h-24 rounded-3xl object-cover border-4 border-gray-100 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white">
                    <CheckBadgeIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedWorker.fullName}</h3>
                  <p className="text-xl text-primary-600 font-semibold mb-3">{selectedWorker.jobTitle}</p>
                  <div className="flex items-center justify-center sm:justify-start text-gray-600 mb-3">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    {selectedWorker.city}, {selectedWorker.country}
                  </div>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedWorker.visaStatus === 'Work Visa' ? 'bg-green-100 text-green-800' :
                    selectedWorker.visaStatus === 'Freelance Visa' ? 'bg-blue-100 text-blue-800' :
                    selectedWorker.visaStatus === 'Visit Visa' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedWorker.visaStatus}
                  </span>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{selectedWorker.yearsExperience}</div>
                  <div className="text-blue-500 font-medium">Years Experience</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{selectedWorker.expectedSalary}</div>
                  <div className="text-green-500 font-medium">Expected Salary</div>
                </div>
              </div>

              {/* Enhanced Languages */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  Languages
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedWorker.languagesSpoken.map((lang) => (
                    <span key={lang} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-xl text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced About */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  About
                </h4>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed">{selectedWorker.aboutMe}</p>
                </div>
              </div>

              {/* Contact Premium Notice */}
              <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border-2 border-gold-200 rounded-2xl p-6 mb-6">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                      <LockClosedIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gold-800 mb-2">Premium Contact Information</h4>
                  <p className="text-gold-700 mb-4">Unlock direct contact details including phone number and email to connect instantly</p>
                  <div className="flex gap-2 text-sm text-gold-600 mb-4">
                    <span>📱 Phone Number</span>
                    <span>•</span>
                    <span>📧 Email Address</span>
                    <span>•</span>
                    <span>✅ Verified Contact</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <CreditCardIcon className="h-5 w-5" />
                  Unlock Contact Details
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </Link>
                <button
                  onClick={closeProfileModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
