'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  UserGroupIcon, 
  MapPinIcon, 
  BriefcaseIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  ChartBarIcon,
  CogIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { Worker, JobTitle, City, Country } from '../../types'

interface UserStats {
  totalUsers: number
  usersByCity: Record<string, number>
  usersByJob: Record<string, number>
  usersByCountry: Record<string, number>
}

interface CityJobStats {
  city: string
  job: string
  count: number
  url: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState<Worker[]>([])
  const [filteredUsers, setFilteredUsers] = useState<Worker[]>([])
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    usersByCity: {},
    usersByJob: {},
    usersByCountry: {}
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedJob, setSelectedJob] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      loadAdminData()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, selectedCity, selectedJob])

  const loadAdminData = () => {
    try {
      // Load all user profiles from localStorage
      const profiles: Worker[] = []
      
      // Check for individual profile
      const userProfile = localStorage.getItem('userProfile')
      if (userProfile) {
        profiles.push(JSON.parse(userProfile))
      }
      
      // Check for multiple profiles (would be stored differently in real app)
      const allProfiles = localStorage.getItem('allUserProfiles')
      if (allProfiles) {
        const parsedProfiles = JSON.parse(allProfiles)
        profiles.push(...parsedProfiles)
      }
      
      // Generate some demo data if no profiles exist
      if (profiles.length === 0) {
        const demoProfiles = generateDemoProfiles()
        profiles.push(...demoProfiles)
        // Store demo profiles
        localStorage.setItem('allUserProfiles', JSON.stringify(demoProfiles))
      }
      
      setUsers(profiles)
      calculateStats(profiles)
      setLoading(false)
    } catch (error) {
      console.error('Error loading admin data:', error)
      setLoading(false)
    }
  }

  const generateDemoProfiles = (): Worker[] => {
    return [
      {
        id: 'demo1',
        fullName: 'Ahmed Hassan',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        jobTitle: 'Driver',
        yearsExperience: 8,
        city: 'Dubai',
        country: 'UAE',
        languagesSpoken: ['English', 'Arabic', 'Hindi'],
        expectedSalary: 3500,
        visaStatus: 'Work Visa',
        availability: true,
        aboutMe: 'Experienced professional driver with clean driving record.',
        phoneNumber: '+971501234567',
        email: 'ahmed.hassan@email.com',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 'demo2',
        fullName: 'Maria Santos',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
        jobTitle: 'Maid',
        yearsExperience: 5,
        city: 'Dubai',
        country: 'UAE',
        languagesSpoken: ['English', 'Tagalog'],
        expectedSalary: 2500,
        visaStatus: 'Work Visa',
        availability: true,
        aboutMe: 'Dedicated housekeeping professional.',
        phoneNumber: '+971501234568',
        email: 'maria.santos@email.com',
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: 'demo3',
        fullName: 'Omar Al-Rashid',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        jobTitle: 'Cleaner',
        yearsExperience: 3,
        city: 'Doha',
        country: 'Qatar',
        languagesSpoken: ['Arabic', 'English'],
        expectedSalary: 2800,
        visaStatus: 'Visit Visa',
        availability: true,
        aboutMe: 'Professional cleaner with attention to detail.',
        phoneNumber: '+97450123456',
        email: 'omar.rashid@email.com',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      }
    ]
  }

  const calculateStats = (profiles: Worker[]) => {
    const stats: UserStats = {
      totalUsers: profiles.length,
      usersByCity: {},
      usersByJob: {},
      usersByCountry: {}
    }

    profiles.forEach(profile => {
      // Count by city
      stats.usersByCity[profile.city] = (stats.usersByCity[profile.city] || 0) + 1
      
      // Count by job
      stats.usersByJob[profile.jobTitle] = (stats.usersByJob[profile.jobTitle] || 0) + 1
      
      // Count by country
      stats.usersByCountry[profile.country] = (stats.usersByCountry[profile.country] || 0) + 1
    })

    setStats(stats)
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCity) {
      filtered = filtered.filter(user => user.city === selectedCity)
    }

    if (selectedJob) {
      filtered = filtered.filter(user => user.jobTitle === selectedJob)
    }

    setFilteredUsers(filtered)
  }

  const getCityJobCombinations = (): CityJobStats[] => {
    const combinations: Record<string, CityJobStats> = {}
    
    users.forEach(user => {
      const key = `${user.city}-${user.jobTitle}`
      const url = `/${user.city.toLowerCase().replace(/\s+/g, '-')}/${user.jobTitle.toLowerCase().replace(/\s+/g, '-')}`
      
      if (combinations[key]) {
        combinations[key].count++
      } else {
        combinations[key] = {
          city: user.city,
          job: user.jobTitle,
          count: 1,
          url
        }
      }
    })
    
    return Object.values(combinations).sort((a, b) => b.count - a.count)
  }

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('allUserProfiles', JSON.stringify(updatedUsers))
      calculateStats(updatedUsers)
    }
  }

  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in as an administrator to access this page.</p>
          <div className="space-y-3">
            <a
              href="/admin-login"
              className="btn-primary w-full inline-block"
            >
              Go to Admin Login
            </a>
            <a
              href="/"
              className="btn-secondary w-full inline-block"
            >
              Back to Home
            </a>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-purple-100 mt-1">Manage users, profiles, and platform content</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/seo" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                <GlobeAltIcon className="h-5 w-5 inline mr-2" />
                SEO Manager
              </Link>
              <div className="bg-white/20 rounded-full p-2">
                <CogIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cities</p>
                <p className="text-3xl font-bold text-gray-900">{Object.keys(stats.usersByCity).length}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <MapPinIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Job Categories</p>
                <p className="text-3xl font-bold text-gray-900">{Object.keys(stats.usersByJob).length}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <BriefcaseIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-3xl font-bold text-gray-900">{Object.keys(stats.usersByCountry).length}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <GlobeAltIcon className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
                
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Cities</option>
                    {Object.keys(stats.usersByCity).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Jobs</option>
                    {Object.keys(stats.usersByJob).map(job => (
                      <option key={job} value={job}>{job}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Users List */}
              <div className="p-6">
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={user.profilePicture}
                          alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                          <p className="text-sm text-gray-600">{user.jobTitle} • {user.city}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.visaStatus === 'Work Visa' ? 'bg-green-100 text-green-800' :
                          user.visaStatus === 'Visit Visa' ? 'bg-blue-100 text-blue-800' :
                          user.visaStatus === 'Freelance Visa' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.visaStatus}
                        </span>
                        
                        <Link 
                          href={`/admin/user/${user.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <Link 
                          href={`/admin/edit-user/${user.id}`}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No users found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* City/Job Pages Stats */}
            <div className="bg-white rounded-xl shadow-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">City/Job Pages</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {getCityJobCombinations().map((combo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Link 
                        href={combo.url}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {combo.city}/{combo.job}
                      </Link>
                      <p className="text-xs text-gray-500">{combo.count} users</p>
                    </div>
                    <Link 
                      href={`/admin/seo${combo.url}`}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <CogIcon className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by City</h3>
              <div className="space-y-2">
                {Object.entries(stats.usersByCity)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([city, count]) => (
                  <div key={city} className="flex justify-between">
                    <span className="text-sm text-gray-600">{city}</span>
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Users by Job</h3>
              <div className="space-y-2">
                {Object.entries(stats.usersByJob)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([job, count]) => (
                  <div key={job} className="flex justify-between">
                    <span className="text-sm text-gray-600">{job}</span>
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
