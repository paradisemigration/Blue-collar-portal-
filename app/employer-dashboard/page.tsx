'use client'

import { useState, useEffect, useMemo } from 'react'
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
  UserGroupIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City, FilterOptions } from '../../types'
import { generateDummyWorkers } from '../../utils/dummyData'

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

export default function EmployerDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({})
  const [workers, setWorkers] = useState<Worker[]>([])
  const [displayCount, setDisplayCount] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [employerData, setEmployerData] = useState<any>(null)
  const [showContactPopup, setShowContactPopup] = useState<Worker | null>(null)
  const [unlockedProfiles, setUnlockedProfiles] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'search' | 'plan' | 'history' | 'saved'>('search')
  const [savedProfiles, setSavedProfiles] = useState<Worker[]>([])

  useEffect(() => {
    // Check if employer is logged in
    const isLoggedIn = localStorage.getItem('isEmployerLoggedIn')
    if (!isLoggedIn) {
      window.location.href = '/pricing'
      return
    }

    // Load employer data
    const employerInfo = localStorage.getItem('employerData')
    if (employerInfo) {
      setEmployerData(JSON.parse(employerInfo))
    }

    // Load all workers
    const allWorkers = generateDummyWorkers()
    setWorkers(allWorkers)

    // Load unlocked profiles
    const unlocked = localStorage.getItem('unlockedProfiles')
    if (unlocked) {
      setUnlockedProfiles(JSON.parse(unlocked))
    }
  }, [])

  const filteredWorkers = useMemo(() => {
    return workers.filter(worker => {
      if (searchTerm) {
        const searchMatch =
          worker.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          worker.city.toLowerCase().includes(searchTerm.toLowerCase())
        if (!searchMatch) return false
      }

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
    setTimeout(() => {
      setDisplayCount(prev => prev + 30)
      setIsLoading(false)
    }, 500)
  }

  const handleUnlockProfile = (worker: Worker) => {
    const newUnlocked = [...unlockedProfiles, worker.id]
    setUnlockedProfiles(newUnlocked)
    localStorage.setItem('unlockedProfiles', JSON.stringify(newUnlocked))
    setShowContactPopup(worker)
  }

  const handleViewProfile = (worker: Worker) => {
    setSelectedWorker(worker)
  }

  const isProfileUnlocked = (workerId: string) => {
    return unlockedProfiles.includes(workerId)
  }

  if (!employerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome, {employerData.contactPerson || 'Employer'}!
              </h1>
              <p className="text-blue-100 text-lg">
                {employerData.companyName} • {employerData.selectedPlan?.name} Plan
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{displayedWorkers.length}</div>
                <div className="text-xs text-blue-100">Available Workers</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{unlockedProfiles.length}</div>
                <div className="text-xs text-blue-100">Unlocked Profiles</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{employerData.selectedPlan?.profileAccess || 0}</div>
                <div className="text-xs text-blue-100">Profile Credits</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{employerData.selectedPlan?.jobPosts || 0}</div>
                <div className="text-xs text-blue-100">Job Posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, job title, or city..."
                className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-3 text-base whitespace-nowrap"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
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
            <div key={worker.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden">
              {/* Profile Header */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={worker.profilePicture}
                      alt={worker.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {(worker.visaStatus === 'Work Visa' || worker.visaStatus === 'Freelance Visa') && (
                      <CheckBadgeIcon className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy-900">{worker.fullName}</h3>
                    <p className="text-primary-600 font-medium">{worker.jobTitle}</p>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {worker.city}, {worker.country}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-navy-900">{worker.yearsExperience}</div>
                    <div className="text-gray-600 text-xs">Years Exp.</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-navy-900">{worker.expectedSalary}</div>
                    <div className="text-gray-600 text-xs">Monthly Salary</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {worker.languagesSpoken.slice(0, 3).map((lang) => (
                      <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                    {worker.languagesSpoken.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{worker.languagesSpoken.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(worker)}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm py-2"
                  >
                    <EyeIcon className="h-4 w-4" />
                    View
                  </button>
                  {isProfileUnlocked(worker.id) ? (
                    <button
                      onClick={() => setShowContactPopup(worker)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      Contact
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnlockProfile(worker)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2"
                    >
                      <LockClosedIcon className="h-4 w-4" />
                      Unlock
                    </button>
                  )}
                </div>
              </div>
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
      </div>

      {/* Enhanced Profile Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold">Worker Profile</h2>
              <button
                onClick={() => setSelectedWorker(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                <div className="relative">
                  <img
                    src={selectedWorker.profilePicture}
                    alt={selectedWorker.fullName}
                    className="w-32 h-32 rounded-2xl object-cover mx-auto lg:mx-0"
                  />
                  {(selectedWorker.visaStatus === 'Work Visa' || selectedWorker.visaStatus === 'Freelance Visa') && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckBadgeIcon className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="text-center lg:text-left flex-1">
                  <h3 className="text-3xl font-bold text-navy-900 mb-2">{selectedWorker.fullName}</h3>
                  <p className="text-xl text-primary-600 font-semibold mb-3">{selectedWorker.jobTitle}</p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{selectedWorker.city}, {selectedWorker.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-5 w-5" />
                      <span>{selectedWorker.yearsExperience} years experience</span>
                    </div>
                  </div>
                  {(selectedWorker.visaStatus === 'Work Visa' || selectedWorker.visaStatus === 'Freelance Visa') && (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckBadgeIcon className="h-4 w-4" />
                      {selectedWorker.visaStatus}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-navy-900">{selectedWorker.yearsExperience}</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-navy-900">{selectedWorker.expectedSalary}</div>
                  <div className="text-gray-600 text-sm">Expected Salary</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-navy-900">{selectedWorker.languagesSpoken.length}</div>
                  <div className="text-gray-600 text-sm">Languages</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600 text-sm">4.8 Rating</div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-navy-900 mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.languagesSpoken.map((lang) => (
                    <span key={lang} className="bg-primary-100 text-primary-800 px-3 py-2 rounded-full text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-navy-900 mb-3">About</h4>
                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{selectedWorker.aboutMe}</p>
              </div>

              {/* Contact Information */}
              {isProfileUnlocked(selectedWorker.id) && (
                <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <CheckBadgeIcon className="h-5 w-5" />
                    Contact Information (Unlocked)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href={`tel:${selectedWorker.phoneNumber}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <PhoneIcon className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">{selectedWorker.phoneNumber}</span>
                    </a>
                    <a href={`mailto:${selectedWorker.email}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <EnvelopeIcon className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">{selectedWorker.email}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!isProfileUnlocked(selectedWorker.id) ? (
                  <button
                    onClick={() => {
                      handleUnlockProfile(selectedWorker)
                      setSelectedWorker(null)
                    }}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
                  >
                    <LockClosedIcon className="h-5 w-5" />
                    Unlock Contact Details
                  </button>
                ) : (
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${selectedWorker.phoneNumber}`}
                      className="btn-primary flex items-center justify-center gap-2 py-3"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      Call Now
                    </a>
                    <a
                      href={`mailto:${selectedWorker.email}`}
                      className="btn-secondary flex items-center justify-center gap-2 py-3"
                    >
                      <EnvelopeIcon className="h-5 w-5" />
                      Email
                    </a>
                  </div>
                )}
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="btn-secondary flex-none px-6 py-3"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Contact Details</h3>
                <button
                  onClick={() => setShowContactPopup(null)}
                  className="text-white/80 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={showContactPopup.profilePicture}
                  alt={showContactPopup.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-navy-900">{showContactPopup.fullName}</h4>
                  <p className="text-primary-600">{showContactPopup.jobTitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${showContactPopup.phoneNumber}`}
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <PhoneIcon className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-green-600">{showContactPopup.phoneNumber}</div>
                  </div>
                </a>
                
                <a
                  href={`mailto:${showContactPopup.email}`}
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-blue-600">{showContactPopup.email}</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${showContactPopup.phoneNumber}`}
                  className="btn-primary flex items-center justify-center gap-2 py-3"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Call
                </a>
                <a
                  href={`mailto:${showContactPopup.email}`}
                  className="btn-secondary flex items-center justify-center gap-2 py-3"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
