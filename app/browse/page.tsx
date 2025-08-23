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

// Load real worker data from localStorage and combine with dummy data
const loadAllWorkers = (): Worker[] => {
  try {
    const workers: Worker[] = []

    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      console.log('🔍 Browse Page - Loading workers from localStorage...')

      // Load individual profile
      const userProfile = localStorage.getItem('userProfile')
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile)
          // Convert date strings back to Date objects
          if (profile.createdAt) profile.createdAt = new Date(profile.createdAt)
          if (profile.updatedAt) profile.updatedAt = new Date(profile.updatedAt)
          workers.push(profile)
          console.log('📋 Browse - Found userProfile:', profile.fullName)
        } catch (e) {
          console.warn('Browse - Error parsing userProfile:', e)
        }
      }

      // Load all profiles
      const allProfiles = localStorage.getItem('allUserProfiles')
      if (allProfiles) {
        try {
          const profiles = JSON.parse(allProfiles)
          console.log('📋 Browse - Raw allUserProfiles count:', profiles.length)

          profiles.forEach((profile: Worker) => {
            if (!workers.find(w => w.id === profile.id)) {
              // Convert date strings back to Date objects
              if (profile.createdAt) profile.createdAt = new Date(profile.createdAt)
              if (profile.updatedAt) profile.updatedAt = new Date(profile.updatedAt)
              workers.push(profile)
              console.log('📋 Browse - Added profile:', profile.fullName)
            }
          })
        } catch (e) {
          console.warn('Browse - Error parsing allUserProfiles:', e)
        }
      }

      console.log(`✅ Browse - Loaded ${workers.length} real user profiles`)
    }

    console.log(`✅ Browse - Total real workers loaded: ${workers.length}`)
    return workers
  } catch (error) {
    console.error('Error loading workers:', error)
    return [] // Return empty array instead of dummy data
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

        {/* Professional Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedWorkers.map((worker) => (
            <div key={worker.id} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-300">
              {/* Premium Badge */}
              {!isSubscribed && (
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                    <LockClosedIcon className="h-3 w-3" />
                    PREMIUM
                  </div>
                </div>
              )}

              {/* Visa Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${
                  worker.visaStatus === 'Work Visa' ? 'bg-green-100 text-green-800 border border-green-200' :
                  worker.visaStatus === 'Freelance Visa' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  worker.visaStatus === 'Visit Visa' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {worker.visaStatus}
                </div>
              </div>

              {/* Header Section */}
              <div className="px-6 pt-8 pb-4 bg-gray-50 border-b border-gray-100">
                {/* Profile Photo */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="relative w-20 h-20">
                      <img
                        src={worker.profilePicture}
                        alt={worker.fullName}
                        className={`w-full h-full rounded-full object-cover border-3 border-white shadow-md transition-all duration-300 ${
                          !isSubscribed ? 'filter blur-sm' : ''
                        }`}
                      />
                      {!isSubscribed && (
                        <div className="absolute inset-0 bg-black/20 rounded-full border-3 border-white flex items-center justify-center">
                          <LockClosedIcon className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </div>
                    {/* Verification Badge */}
                    <div className="absolute -bottom-1 -right-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 border-white ${
                        worker.visaStatus === 'Work Visa' ? 'bg-green-500' :
                        worker.visaStatus === 'Freelance Visa' ? 'bg-blue-500' :
                        worker.visaStatus === 'Visit Visa' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}>
                        <CheckBadgeIcon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name and Title */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {worker.fullName}
                  </h3>
                  <p className="text-primary-600 font-medium text-sm mb-2">
                    {worker.jobTitle}
                  </p>
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{worker.city}, {worker.country}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Stats Row */}
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{worker.yearsExperience}</div>
                    <div className="text-xs text-gray-500 font-medium">Years Exp.</div>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{worker.expectedSalary}</div>
                    <div className="text-xs text-gray-500 font-medium">Expected</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Languages</div>
                  <div className="flex flex-wrap gap-1">
                    {worker.languagesSpoken.slice(0, 3).map((lang) => (
                      <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {lang}
                      </span>
                    ))}
                    {worker.languagesSpoken.length > 3 && (
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        +{worker.languagesSpoken.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* About Preview */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Summary</div>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {worker.aboutMe}
                  </p>
                </div>
              </div>

              {/* Action Section */}
              <div className="px-6 pb-6">
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => handleViewProfile(worker)}
                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span className="text-sm">View Profile</span>
                  </button>
                  <Link
                    href="/pricing"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                    <span className="text-sm">Contact</span>
                  </Link>
                </div>

                {/* Premium Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-center">
                  <p className="text-xs text-amber-700 font-medium">
                    🔒 Unlock contact details with Premium
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

      {/* Professional Profile Modal - Mobile Optimized */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-gray-300">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <EyeIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Worker Profile</h2>
                    <p className="text-sm text-gray-500">Professional Details</p>
                  </div>
                </div>
                <button
                  onClick={closeProfileModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-6 overflow-y-auto max-h-[calc(95vh-120px)]">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <img
                      src={selectedWorker.profilePicture}
                      alt={selectedWorker.fullName}
                      className={`w-full h-full rounded-full object-cover border-3 border-white shadow-lg transition-all duration-300 ${
                        !isSubscribed ? 'filter blur-md' : ''
                      }`}
                    />
                    {!isSubscribed && (
                      <div className="absolute inset-0 bg-black/20 rounded-full border-3 border-white flex items-center justify-center">
                        <LockClosedIcon className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                  {/* Verification Badge */}
                  <div className="absolute -top-1 -right-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white ${
                      selectedWorker.visaStatus === 'Work Visa' ? 'bg-green-500' :
                      selectedWorker.visaStatus === 'Freelance Visa' ? 'bg-blue-500' :
                      selectedWorker.visaStatus === 'Visit Visa' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}>
                      <CheckBadgeIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">{selectedWorker.fullName}</h3>
                <p className="text-primary-600 font-medium mb-2">{selectedWorker.jobTitle}</p>

                <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{selectedWorker.city}, {selectedWorker.country}</span>
                </div>

                <div className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${
                  selectedWorker.visaStatus === 'Work Visa' ? 'bg-green-100 text-green-800 border border-green-200' :
                  selectedWorker.visaStatus === 'Freelance Visa' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  selectedWorker.visaStatus === 'Visit Visa' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {selectedWorker.visaStatus}
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedWorker.yearsExperience}</div>
                    <div className="text-sm text-gray-500 font-medium">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedWorker.expectedSalary}</div>
                    <div className="text-sm text-gray-500 font-medium">Expected Salary</div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-900 mb-3">Languages Spoken</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.languagesSpoken.map((lang) => (
                    <span key={lang} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-900 mb-3">About Professional</h4>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-sm">{selectedWorker.aboutMe}</p>
                </div>
              </div>

              {/* Premium Benefits Notice - Mobile Optimized */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                      <LockClosedIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-base font-semibold text-amber-800 mb-2">Premium Access Benefits</h4>
                  <p className="text-amber-700 mb-4 text-sm">Unlock complete profile access with contact details and high-quality photos</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-amber-200">
                      <div className="text-lg mb-1">📱</div>
                      <div className="font-medium text-amber-800 text-xs">Direct Contact</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-200">
                      <div className="text-lg mb-1">📸</div>
                      <div className="font-medium text-amber-800 text-xs">Clear Photos</div>
                    </div>
                  </div>

                  {!isSubscribed && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-800 text-xs font-medium">
                        🔒 Contact details hidden. Upgrade to Premium for full access.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="space-y-3">
                <Link
                  href="/pricing"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <CreditCardIcon className="h-5 w-5" />
                  <span>Unlock Premium Access</span>
                </Link>
                <button
                  onClick={closeProfileModal}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
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
