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
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City, FilterOptions } from '../../types'
import { generateDummyWorkers } from '../../utils/dummyData'

const jobTitles: JobTitle[] = [
  'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter',
  'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic',
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

    // Load all workers (same as browse page)
    const loadWorkers = () => {
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

    const allWorkers = loadWorkers()
    setWorkers(allWorkers)

    // Load unlocked profiles
    const unlocked = localStorage.getItem('unlockedProfiles')
    if (unlocked) {
      setUnlockedProfiles(JSON.parse(unlocked))
    }

    // Load saved profiles
    const saved = localStorage.getItem('savedProfiles')
    if (saved) {
      setSavedProfiles(JSON.parse(saved))
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

  const handleSaveProfile = (worker: Worker) => {
    const newSaved = [...savedProfiles, worker]
    setSavedProfiles(newSaved)
    localStorage.setItem('savedProfiles', JSON.stringify(newSaved))
    alert('✅ Profile saved to your favorites!')
  }

  const handleRemoveSaved = (workerId: string) => {
    const newSaved = savedProfiles.filter(w => w.id !== workerId)
    setSavedProfiles(newSaved)
    localStorage.setItem('savedProfiles', JSON.stringify(newSaved))
  }

  const isProfileUnlocked = (workerId: string) => {
    return unlockedProfiles.includes(workerId)
  }

  const isProfileSaved = (workerId: string) => {
    return savedProfiles.some(w => w.id === workerId)
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
      {/* Enhanced Header with Navigation */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
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
                <div className="text-2xl font-bold">{savedProfiles.length}</div>
                <div className="text-xs text-blue-100">Saved Profiles</div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === 'search'
                  ? 'bg-white text-primary-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="hidden sm:inline">🔍 Search Workers</span>
              <span className="sm:hidden">🔍 Search</span>
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === 'plan'
                  ? 'bg-white text-primary-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="hidden sm:inline">📋 My Plan</span>
              <span className="sm:hidden">📋 Plan</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === 'history'
                  ? 'bg-white text-primary-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="hidden sm:inline">💳 Payment History</span>
              <span className="sm:hidden">💳 History</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === 'saved'
                  ? 'bg-white text-primary-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="hidden sm:inline">⭐ Saved Profiles ({savedProfiles.length})</span>
              <span className="sm:hidden">⭐ Saved ({savedProfiles.length})</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('isEmployerLoggedIn')
                localStorage.removeItem('employerData')
                window.location.href = '/employer-login'
              }}
              className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base bg-red-500/20 text-white hover:bg-red-500/30 border border-red-300/30"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:flex items-center gap-2">
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Workers Tab */}
        {activeTab === 'search' && (
          <div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedWorkers.map((worker) => (
                <div key={worker.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 overflow-hidden">
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
                      <button
                        onClick={() => isProfileSaved(worker.id) ? handleRemoveSaved(worker.id) : handleSaveProfile(worker)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          isProfileSaved(worker.id)
                            ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={isProfileSaved(worker.id) ? 'Remove from saved' : 'Save profile'}
                      >
                        {isProfileSaved(worker.id) ? '⭐' : '☆'}
                      </button>
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
                  className="btn-primary px-6 sm:px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span className="hidden sm:inline">{`Load More Workers (${filteredWorkers.length - displayedWorkers.length} remaining)`}</span>
                      <span className="sm:hidden">{`Load More (${filteredWorkers.length - displayedWorkers.length})`}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Database Statistics */}
            <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 sm:p-6 border">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-4 text-center">📊 Go Get Hire Platform Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="bg-white rounded-xl p-3 sm:p-4 border">
                  <div className="text-lg sm:text-2xl font-bold text-primary-600">{workers.length.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Profiles</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 border">
                  <div className="text-lg sm:text-2xl font-bold text-green-600">43</div>
                  <div className="text-xs sm:text-sm text-gray-600">Cities</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 border">
                  <div className="text-lg sm:text-2xl font-bold text-purple-600">49</div>
                  <div className="text-xs sm:text-sm text-gray-600">Job Types</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 border">
                  <div className="text-lg sm:text-2xl font-bold text-orange-600">6</div>
                  <div className="text-xs sm:text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* My Plan Tab */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-100 to-purple-200 p-2 rounded-xl">📋</span>
                Current Plan
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{employerData.selectedPlan?.name} Plan</h3>
                    <p className="text-primary-700 mb-4">Active Subscription</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profile Access:</span>
                        <span className="font-semibold">{employerData.selectedPlan?.profileAccess} profiles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Posts:</span>
                        <span className="font-semibold">{employerData.selectedPlan?.jobPosts || 0} posts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">✅ Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy-900 mb-4">Usage Statistics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Profiles Unlocked</span>
                        <span className="font-semibold">{unlockedProfiles.length} / {employerData.selectedPlan?.profileAccess}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-full h-3 transition-all"
                          style={{ width: `${(unlockedProfiles.length / (employerData.selectedPlan?.profileAccess || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Saved Profiles</span>
                        <span className="font-semibold">{savedProfiles.length}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <span className="bg-gradient-to-r from-green-100 to-green-200 p-2 rounded-xl">💳</span>
                Payment History & Invoices
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-navy-900">{employerData.selectedPlan?.name} Plan</h3>
                      <p className="text-gray-600 text-sm">Subscription Payment • {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center gap-4">
                      <span className="text-xl font-bold text-green-600">AED {employerData.selectedPlan?.price || 300}</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Paid</span>
                      <button className="text-primary-600 hover:text-primary-700 font-medium">📄 Invoice</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all">
                  📥 Download All Invoices
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Saved Profiles Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
                <span className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-2 rounded-xl">⭐</span>
                Saved Worker Profiles ({savedProfiles.length})
              </h2>
              
              {savedProfiles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <UserGroupIcon className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved profiles yet</h3>
                  <p className="text-gray-600 mb-4">Save worker profiles while browsing to access them quickly later</p>
                  <button onClick={() => setActiveTab('search')} className="btn-primary">
                    Browse Workers
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {savedProfiles.map((worker) => (
                    <div key={worker.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={worker.profilePicture}
                          alt={worker.fullName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-navy-900">{worker.fullName}</h3>
                          <p className="text-primary-600 font-medium">{worker.jobTitle}</p>
                          <p className="text-gray-600 text-sm">{worker.city}, {worker.country}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProfile(worker)}
                          className="flex-1 btn-secondary text-sm py-2"
                        >
                          View
                        </button>
                        {isProfileUnlocked(worker.id) ? (
                          <button
                            onClick={() => setShowContactPopup(worker)}
                            className="flex-1 btn-primary text-sm py-2"
                          >
                            Contact
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnlockProfile(worker)}
                            className="flex-1 btn-primary text-sm py-2"
                          >
                            Unlock
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveSaved(worker.id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from saved"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contact Details Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-5 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  🎉 Contact Unlocked!
                </h3>
                <button
                  onClick={() => setShowContactPopup(null)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={showContactPopup.profilePicture}
                    alt={showContactPopup.fullName}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <CheckBadgeIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy-900">{showContactPopup.fullName}</h4>
                  <p className="text-primary-600 font-medium">{showContactPopup.jobTitle}</p>
                  <p className="text-gray-500 text-sm">{showContactPopup.city}, {showContactPopup.country}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${showContactPopup.phoneNumber}`}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all"
                >
                  <div className="bg-green-500 rounded-xl p-3">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Phone Number</div>
                    <div className="text-green-600 font-medium">{showContactPopup.phoneNumber}</div>
                  </div>
                </a>
                
                <a
                  href={`mailto:${showContactPopup.email}`}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all"
                >
                  <div className="bg-blue-500 rounded-xl p-3">
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Email Address</div>
                    <div className="text-blue-600 font-medium">{showContactPopup.email}</div>
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${showContactPopup.phoneNumber}`}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Call
                </a>
                <a
                  href={`mailto:${showContactPopup.email}`}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  Email
                </a>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  📱 Contact details are now available for direct communication
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
