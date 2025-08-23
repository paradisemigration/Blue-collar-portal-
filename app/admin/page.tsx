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
  FunnelIcon,
  ExclamationTriangleIcon
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
  const [migrationStatus, setMigrationStatus] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Check authentication
    const authStatus = localStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)

      // Auto-clean sample data on first load
      const hasCleanedSampleData = localStorage.getItem('hasCleanedSampleData')
      if (!hasCleanedSampleData) {
        cleanupSampleDataSilently()
        localStorage.setItem('hasCleanedSampleData', 'true')
      }

      loadAdminData()
    } else {
      setLoading(false)
    }

    // Listen for profile creation events
    const handleAuthStateChange = () => {
      console.log('🔄 Auth state changed - reloading admin data...')
      if (authStatus === 'true') {
        loadAdminData()
      }
    }

    // Listen for storage changes (when profile is created in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'allUserProfiles' || e.key === 'userProfile') {
        console.log(`🔄 localStorage ${e.key} changed - reloading admin data...`)
        if (authStatus === 'true') {
          setTimeout(() => loadAdminData(), 100) // Small delay to ensure data is written
        }
      }
    }

    window.addEventListener('authStateChanged', handleAuthStateChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('authStateChanged', handleAuthStateChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, selectedCity, selectedJob])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      console.log('🔍 Admin Debug - Loading users from database...')

      // Try to fetch from database first
      const response = await fetch('/api/admin/users', {
        headers: {
          'x-admin-token': 'admin-secret-token' // Simple admin auth for now
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.users) {
          console.log(`✅ Admin - Loaded ${data.users.length} users from database`)

          // Convert date strings back to Date objects
          const users = data.users.map((user: any) => ({
            ...user,
            createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
            updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date()
          }))

          setUsers(users)
          calculateStats(users)
          setLoading(false)
          return
        }
      }

      console.warn('⚠️ Database fetch failed, falling back to localStorage...')
      await loadAdminDataFromLocalStorage()

    } catch (error) {
      console.error('Error loading admin data from database:', error)
      console.log('Falling back to localStorage...')
      await loadAdminDataFromLocalStorage()
    }
  }

  const loadAdminDataFromLocalStorage = async () => {
    try {
      // Load all user profiles from localStorage as fallback
      const profiles: Worker[] = []

      // Debug: Check what's in localStorage and current domain
      console.log('🔍 Admin Debug - Checking localStorage (fallback)...')
      console.log('Current domain:', window.location.hostname)
      console.log('userProfile exists:', !!localStorage.getItem('userProfile'))
      console.log('allUserProfiles exists:', !!localStorage.getItem('allUserProfiles'))
      console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'))
      console.log('authProvider:', localStorage.getItem('authProvider'))

      // Check if we're on production domain vs development
      const isProductionDomain = window.location.hostname.includes('gogethires.com')
      const isDevelopmentDomain = !isProductionDomain

      if (isDevelopmentDomain) {
        console.log('⚠️ Development environment detected - real user profiles may not be visible')
        console.log('💡 Use import tools to sync profiles from gogethires.com')
      }

      // Check for individual profile
      const userProfile = localStorage.getItem('userProfile')
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile)
          // Convert date strings back to Date objects
          if (profile.createdAt) profile.createdAt = new Date(profile.createdAt)
          if (profile.updatedAt) profile.updatedAt = new Date(profile.updatedAt)
          profiles.push(profile)
          console.log('📋 Found userProfile:', profile.fullName)
        } catch (e) {
          console.warn('Error parsing userProfile:', e)
        }
      }

      // Check for multiple profiles
      const allProfiles = localStorage.getItem('allUserProfiles')
      if (allProfiles) {
        try {
          const parsedProfiles = JSON.parse(allProfiles)
          console.log('📋 Raw allUserProfiles:', parsedProfiles)

          if (Array.isArray(parsedProfiles)) {
            // Convert date strings back to Date objects and filter
            const processedProfiles = parsedProfiles.map(profile => {
              if (profile.createdAt) profile.createdAt = new Date(profile.createdAt)
              if (profile.updatedAt) profile.updatedAt = new Date(profile.updatedAt)
              return profile
            })
            .filter(profile =>
              !profile.id?.startsWith('demo') &&
              !profile.email?.includes('demo') &&
              !['ahmed.hassan@email.com', 'maria.santos@email.com', 'omar.rashid@email.com'].includes(profile.email)
            )

            console.log(`📋 Processed ${processedProfiles.length} real profiles from allUserProfiles`)

            // Merge with individual profile (avoid duplicates)
            processedProfiles.forEach(profile => {
              if (!profiles.find(p => p.id === profile.id)) {
                profiles.push(profile)
              }
            })
          }
        } catch (e) {
          console.warn('Error parsing allUserProfiles:', e)
        }
      }

      // Remove duplicates by ID
      const uniqueProfiles = profiles.filter((profile, index, self) =>
        index === self.findIndex(p => p.id === profile.id)
      )

      console.log(`✅ Admin Dashboard loaded ${uniqueProfiles.length} unique user profiles from localStorage`)

      setUsers(uniqueProfiles)
      calculateStats(uniqueProfiles)
      setLoading(false)

    } catch (error) {
      console.error('Error loading admin data from localStorage:', error)
      setLoading(false)
    }
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

  const migrateLocalStorageToDatabase = async () => {
    if (!confirm('🚀 MIGRATE ALL PROFILES TO DATABASE\n\nThis will migrate all localStorage profiles to the permanent database.\n\n⚠️ Make sure you have connected to Neon database first.\n\nContinue?')) {
      return
    }

    setMigrationStatus('🔄 Starting migration...')
    
    try {
      // Get profiles from localStorage
      const profiles: any[] = []

      // Get individual profile
      const userProfile = localStorage.getItem('userProfile')
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile)
          profiles.push(profile)
        } catch (e) {
          console.warn('Error parsing userProfile for migration:', e)
        }
      }

      // Get all profiles
      const allProfiles = localStorage.getItem('allUserProfiles')
      if (allProfiles) {
        try {
          const parsedProfiles = JSON.parse(allProfiles)
          if (Array.isArray(parsedProfiles)) {
            parsedProfiles.forEach(profile => {
              if (!profiles.find(p => p.email === profile.email)) {
                profiles.push(profile)
              }
            })
          }
        } catch (e) {
          console.warn('Error parsing allUserProfiles for migration:', e)
        }
      }

      if (profiles.length === 0) {
        setMigrationStatus('❌ No profiles found in localStorage to migrate.')
        setTimeout(() => setMigrationStatus(''), 3000)
        return
      }

      setMigrationStatus(`🔄 Migrating ${profiles.length} profiles to database...`)
      console.log(`🔄 Migrating ${profiles.length} profiles to database...`)

      // Send to migration API
      const response = await fetch('/api/admin/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'admin-secret-token'
        },
        body: JSON.stringify({ profiles })
      })

      const result = await response.json()

      if (result.success) {
        const { successful, failed, errors } = result.results
        
        setMigrationStatus(`✅ Migration completed! Successful: ${successful}, Failed: ${failed}`)
        
        let message = `🎉 MIGRATION COMPLETED!\n\n✅ Successfully migrated: ${successful} profiles\n❌ Failed: ${failed} profiles`

        if (errors.length > 0) {
          message += `\n\n⚠️ Errors:\n${errors.slice(0, 3).join('\n')}`
          if (errors.length > 3) {
            message += `\n... and ${errors.length - 3} more errors`
          }
        }

        message += `\n\n🔄 Refreshing admin panel to show database profiles...`

        alert(message)

        // Reload admin data to show migrated profiles
        if (successful > 0) {
          setTimeout(() => {
            loadAdminData()
            setMigrationStatus('')
          }, 1000)
        } else {
          setTimeout(() => setMigrationStatus(''), 5000)
        }
      } else {
        throw new Error(result.error)
      }

    } catch (error) {
      console.error('Migration failed:', error)
      const errorMsg = `❌ Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      setMigrationStatus(errorMsg)
      alert(`Migration failed!\n\n${errorMsg}\n\n💡 Make sure:\n1. Neon database is connected\n2. Database tables exist\n3. Network connection is stable`)
      setTimeout(() => setMigrationStatus(''), 5000)
    }
  }

  const checkLocalStorageProfiles = () => {
    const userProfile = localStorage.getItem('userProfile')
    const allProfiles = localStorage.getItem('allUserProfiles')
    
    let totalProfiles = 0
    let details = '📊 LOCALSTORAGE PROFILE ANALYSIS:\n\n'
    
    if (userProfile) {
      try {
        const profile = JSON.parse(userProfile)
        details += `👤 Single Profile: ${profile.fullName} (${profile.email})\n`
        totalProfiles = 1
      } catch (e) {
        details += `❌ Error reading single profile\n`
      }
    } else {
      details += `👤 Single Profile: NONE\n`
    }
    
    if (allProfiles) {
      try {
        const profiles = JSON.parse(allProfiles)
        if (Array.isArray(profiles)) {
          details += `📋 Multiple Profiles: ${profiles.length} found\n\n`
          details += `🔍 PROFILE LIST:\n`
          profiles.forEach((profile, index) => {
            details += `[${index + 1}] ${profile.fullName || 'No Name'} (${profile.email || 'No Email'})\n`
            details += `    Job: ${profile.jobTitle || 'N/A'}, City: ${profile.city || 'N/A'}\n`
          })
          totalProfiles = Math.max(totalProfiles, profiles.length)
        }
      } catch (e) {
        details += `❌ Error reading multiple profiles\n`
      }
    } else {
      details += `📋 Multiple Profiles: NONE\n`
    }
    
    details += `\n📊 SUMMARY:\n`
    details += `Total Profiles Found: ${totalProfiles}\n`
    details += `Database Profiles: ${users.length}\n`
    details += `Needs Migration: ${totalProfiles > users.length ? 'YES' : 'NO'}\n`
    
    if (totalProfiles > 0 && users.length === 0) {
      details += `\n🚀 NEXT STEP: Click "Migrate to Database" button to move these profiles to permanent storage!`
    } else if (totalProfiles > users.length) {
      details += `\n🚀 NEXT STEP: Some profiles may need migration - click "Migrate to Database" to sync all data!`
    } else if (totalProfiles === 0) {
      details += `\n💡 TIP: If you expect to see profiles but don't, they might be on a different domain (like gogethires.com)`
    }
    
    alert(details)
  }

  const debugLocalStorage = () => {
    console.log('🔍 FULL LOCALSTORAGE DEBUG:')
    console.log('='.repeat(50))

    // Check all localStorage keys
    const allKeys = Object.keys(localStorage)
    console.log('All localStorage keys:', allKeys)

    // Check specific profile-related keys
    const profileKeys = ['userProfile', 'allUserProfiles', 'isLoggedIn', 'authProvider']
    profileKeys.forEach(key => {
      const value = localStorage.getItem(key)
      console.log(`${key}:`, value ? JSON.parse(value) : null)
    })

    // Check for any keys containing 'profile' or 'user'
    const relatedKeys = allKeys.filter(key =>
      key.toLowerCase().includes('profile') ||
      key.toLowerCase().includes('user') ||
      key.toLowerCase().includes('auth')
    )
    console.log('Profile-related keys found:', relatedKeys)

    relatedKeys.forEach(key => {
      try {
        const value = localStorage.getItem(key)
        console.log(`${key} (raw):`, value)
        if (value && (value.startsWith('{') || value.startsWith('['))) {
          console.log(`${key} (parsed):`, JSON.parse(value))
        }
      } catch (e) {
        console.log(`${key} (error parsing):`, e)
      }
    })

    // Show a summary alert
    const userProfile = localStorage.getItem('userProfile')
    const allProfiles = localStorage.getItem('allUserProfiles')
    let summary = 'LocalStorage Debug Summary:\n\n'
    summary += `userProfile: ${userProfile ? 'EXISTS' : 'NOT FOUND'}\n`
    summary += `allUserProfiles: ${allProfiles ? 'EXISTS' : 'NOT FOUND'}\n`

    if (allProfiles) {
      try {
        const parsed = JSON.parse(allProfiles)
        summary += `allUserProfiles count: ${Array.isArray(parsed) ? parsed.length : 'NOT AN ARRAY'}\n`
      } catch (e) {
        summary += `allUserProfiles: ERROR PARSING\n`
      }
    }

    summary += `\nTotal localStorage keys: ${allKeys.length}\n`
    summary += `Profile-related keys: ${relatedKeys.length}`

    alert(summary)
  }

  const createRealUserProfiles = () => {
    // Simulate real users who created profiles through the form
    const realUsers = [
      {
        id: `worker_${Date.now()}_1`,
        fullName: 'Himanshu Kumar',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        jobCategory: 'Hospitality & Food',
        jobTitle: 'Cook' as JobTitle,
        customJobTitle: undefined,
        jobProfile: 'Experienced cook specializing in Indian and Continental cuisine',
        yearsExperience: 5,
        city: 'Dubai' as City,
        country: 'UAE' as Country,
        languagesSpoken: ['English', 'Hindi', 'Arabic'],
        expectedSalary: 3000,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Experienced cook with 5 years in Gulf region. Specialized in multiple cuisines.',
        phoneNumber: '+971501234567',
        email: 'himanshu.real@gmail.com',
        createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
        updatedAt: new Date(Date.now() - 86400000 * 5)
      },
      {
        id: `worker_${Date.now()}_2`,
        fullName: 'Vanshika Sharma',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=400&h=400&fit=crop&crop=face',
        jobCategory: 'Domestic & Personal Care Workers',
        jobTitle: 'Housemaid' as JobTitle,
        customJobTitle: undefined,
        jobProfile: 'Professional housemaid with attention to detail',
        yearsExperience: 3,
        city: 'Abu Dhabi' as City,
        country: 'UAE' as Country,
        languagesSpoken: ['English', 'Hindi'],
        expectedSalary: 2500,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Dedicated housemaid with excellent cleaning skills and 3 years experience.',
        phoneNumber: '+971507654321',
        email: 'vanshika.real@gmail.com',
        createdAt: new Date(Date.now() - 86400000 * 4), // 4 days ago
        updatedAt: new Date(Date.now() - 86400000 * 4)
      },
      {
        id: `worker_${Date.now()}_3`,
        fullName: 'Rahul Gupta',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        jobCategory: 'Construction & Infrastructure',
        jobTitle: 'Electrician' as JobTitle,
        customJobTitle: undefined,
        jobProfile: 'Certified electrician with industrial experience',
        yearsExperience: 7,
        city: 'Sharjah' as City,
        country: 'UAE' as Country,
        languagesSpoken: ['English', 'Hindi', 'Arabic'],
        expectedSalary: 4000,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Certified electrician with 7 years of experience in residential and commercial projects.',
        phoneNumber: '+971509876543',
        email: 'rahul.real@gmail.com',
        createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
        updatedAt: new Date(Date.now() - 86400000 * 3)
      },
      {
        id: `worker_${Date.now()}_4`,
        fullName: 'Priya Patel',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        jobCategory: 'Domestic & Personal Care Workers',
        jobTitle: 'Nanny (Childcare Worker)' as JobTitle,
        customJobTitle: undefined,
        jobProfile: 'Caring childcare professional with early childhood education',
        yearsExperience: 4,
        city: 'Doha' as City,
        country: 'Qatar' as Country,
        languagesSpoken: ['English', 'Hindi', 'Gujarati'],
        expectedSalary: 3200,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Caring nanny with 4 years experience. Great with children of all ages.',
        phoneNumber: '+97433445566',
        email: 'priya.real@gmail.com',
        createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000 * 2)
      },
      {
        id: `worker_${Date.now()}_5`,
        fullName: 'Mohammad Ali',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        jobCategory: 'Transport & Logistics',
        jobTitle: 'Driver' as JobTitle,
        customJobTitle: undefined,
        jobProfile: 'Professional driver with clean driving record',
        yearsExperience: 6,
        city: 'Kuwait City' as City,
        country: 'Kuwait' as Country,
        languagesSpoken: ['Arabic', 'English'],
        expectedSalary: 3500,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Professional driver with 6 years experience and clean driving record.',
        phoneNumber: '+96566778899',
        email: 'mohammad.real@gmail.com',
        createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000 * 1)
      }
    ]

    // Save to localStorage exactly like the create-profile form does
    realUsers.forEach((user, index) => {
      // For the first user, also set as current user profile
      if (index === 0) {
        localStorage.setItem('userProfile', JSON.stringify(user))
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('authProvider', 'profile')
      }
    })

    // Update allUserProfiles array
    const existingProfiles = JSON.parse(localStorage.getItem('allUserProfiles') || '[]')
    const allProfiles = [...existingProfiles]

    realUsers.forEach(user => {
      // Remove any existing profile with same ID
      const index = allProfiles.findIndex(p => p.id === user.id)
      if (index >= 0) {
        allProfiles[index] = user
      } else {
        allProfiles.push(user)
      }
    })

    localStorage.setItem('allUserProfiles', JSON.stringify(allProfiles))

    console.log('✅ Created realistic user profiles:', realUsers.map(p => p.fullName))

    // Trigger auth state change event
    window.dispatchEvent(new Event('authStateChanged'))

    alert(`✅ Created 5 realistic user profiles:\n${realUsers.map(p => `• ${p.fullName} (${p.jobTitle}, ${p.city})`).join('\n')}\n\nThese profiles simulate real users who created profiles through the form.\nClick Refresh to see them.`)
  }

  const createTestProfile = () => {
    const sampleProfiles = [
      {
        id: `user_${Date.now()}_1`,
        fullName: 'Himanshu Kumar',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Cook' as JobTitle,
        yearsExperience: 5,
        city: 'Dubai' as City,
        country: 'UAE' as Country,
        languagesSpoken: ['English', 'Hindi', 'Arabic'],
        expectedSalary: 3000,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Experienced cook with 5 years in Gulf region',
        phoneNumber: '+971501234567',
        email: 'himanshu@email.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `user_${Date.now()}_2`,
        fullName: 'Vanshika Sharma',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Housemaid' as JobTitle,
        yearsExperience: 3,
        city: 'Abu Dhabi' as City,
        country: 'UAE' as Country,
        languagesSpoken: ['English', 'Hindi'],
        expectedSalary: 2500,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Dedicated housemaid with excellent cleaning skills',
        phoneNumber: '+971507654321',
        email: 'vanshika@email.com',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000)
      },
      {
        id: `user_${Date.now()}_3`,
        fullName: 'Ahmed Hassan',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Construction Laborer' as JobTitle,
        yearsExperience: 7,
        city: 'Sharjah' as City,
        country: 'UAE' as Country,
        languagesSpoken: ['Arabic', 'English'],
        expectedSalary: 3500,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Skilled construction worker with 7 years experience',
        phoneNumber: '+971509876543',
        email: 'ahmed@email.com',
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date(Date.now() - 172800000)
      },
      {
        id: `user_${Date.now()}_4`,
        fullName: 'Priya Patel',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Nanny (Childcare Worker)' as JobTitle,
        yearsExperience: 4,
        city: 'Doha' as City,
        country: 'Qatar' as Country,
        languagesSpoken: ['English', 'Hindi', 'Gujarati'],
        expectedSalary: 3200,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Caring nanny with experience in childcare',
        phoneNumber: '+97433445566',
        email: 'priya@email.com',
        createdAt: new Date(Date.now() - 259200000), // 3 days ago
        updatedAt: new Date(Date.now() - 259200000)
      },
      {
        id: `user_${Date.now()}_5`,
        fullName: 'Mohammad Ali',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Driver' as JobTitle,
        yearsExperience: 6,
        city: 'Riyadh' as City,
        country: 'Saudi Arabia' as Country,
        languagesSpoken: ['Arabic', 'English', 'Urdu'],
        expectedSalary: 4000,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Professional driver with clean record',
        phoneNumber: '+966501122334',
        email: 'mohammad@email.com',
        createdAt: new Date(Date.now() - 345600000), // 4 days ago
        updatedAt: new Date(Date.now() - 345600000)
      },
      {
        id: `user_${Date.now()}_6`,
        fullName: 'Fatima Al-Zahra',
        profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Cleaner' as JobTitle,
        yearsExperience: 2,
        city: 'Kuwait City' as City,
        country: 'Kuwait' as Country,
        languagesSpoken: ['Arabic', 'English'],
        expectedSalary: 2200,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Reliable cleaner with attention to detail',
        phoneNumber: '+96566778899',
        email: 'fatima@email.com',
        createdAt: new Date(Date.now() - 432000000), // 5 days ago
        updatedAt: new Date(Date.now() - 432000000)
      },
      {
        id: `user_${Date.now()}_7`,
        fullName: 'Rajesh Gupta',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Electrician' as JobTitle,
        yearsExperience: 8,
        city: 'Muscat' as City,
        country: 'Oman' as Country,
        languagesSpoken: ['English', 'Hindi', 'Arabic'],
        expectedSalary: 4500,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Certified electrician with 8 years experience',
        phoneNumber: '+96899887766',
        email: 'rajesh@email.com',
        createdAt: new Date(Date.now() - 518400000), // 6 days ago
        updatedAt: new Date(Date.now() - 518400000)
      },
      {
        id: `user_${Date.now()}_8`,
        fullName: 'Sarah Johnson',
        profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
        jobTitle: 'Housekeeper (Residential)' as JobTitle,
        yearsExperience: 5,
        city: 'Manama' as City,
        country: 'Bahrain' as Country,
        languagesSpoken: ['English', 'Arabic'],
        expectedSalary: 2800,
        visaStatus: 'Work Visa' as const,
        availability: true,
        aboutMe: 'Professional housekeeper with excellent references',
        phoneNumber: '+97366554433',
        email: 'sarah@email.com',
        createdAt: new Date(Date.now() - 604800000), // 7 days ago
        updatedAt: new Date(Date.now() - 604800000)
      }
    ]

    // Clear existing profiles and add all sample profiles
    localStorage.setItem('allUserProfiles', JSON.stringify(sampleProfiles))
    localStorage.setItem('userProfile', JSON.stringify(sampleProfiles[0])) // Set first profile as current user

    console.log('✅ Created 8 sample profiles:', sampleProfiles.map(p => p.fullName))
    alert(`Created 8 sample user profiles:\n${sampleProfiles.map(p => `• ${p.fullName} (${p.jobTitle}, ${p.city})`).join('\n')}\n\nClick Refresh to see them in the dashboard.`)
  }

  const clearAllProfiles = () => {
    if (confirm('Are you sure you want to clear ALL user profiles? This cannot be undone.')) {
      localStorage.removeItem('userProfile')
      localStorage.removeItem('allUserProfiles')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('authProvider')
      setUsers([])
      calculateStats([])
      console.log('🗑️ All profiles cleared')
      alert('All profiles have been cleared. You can now create fresh profiles.')
    }
  }

  const clearSampleData = () => {
    if (confirm('Are you sure you want to clear all SAMPLE and DUMMY data? This will only remove test profiles, not real user profiles.')) {
      const allProfiles = localStorage.getItem('allUserProfiles')
      let realProfiles: Worker[] = []

      if (allProfiles) {
        try {
          const profiles = JSON.parse(allProfiles)
          // Filter out sample/dummy data - keep only profiles that look like real user submissions
          realProfiles = profiles.filter((profile: any) => {
            const isTestProfile =
              profile.id?.includes('test_') ||
              profile.id?.includes('worker_') ||
              profile.email?.includes('.real@') ||
              profile.email?.includes('@test.com') ||
              profile.email?.includes('himanshu') ||
              profile.fullName?.includes('Test User') ||
              profile.aboutMe?.includes('Test profile created') ||
              profile.aboutMe?.includes('Experienced cook with 5 years in Gulf region') ||
              profile.aboutMe?.includes('Dedicated housemaid with excellent') ||
              profile.aboutMe?.includes('Skilled construction worker') ||
              profile.aboutMe?.includes('Caring nanny with') ||
              profile.aboutMe?.includes('Professional driver with') ||
              profile.aboutMe?.includes('Reliable cleaner with') ||
              profile.aboutMe?.includes('Certified electrician with') ||
              profile.aboutMe?.includes('Professional housekeeper with')

            return !isTestProfile
          })

          console.log(`🗑️ Removed ${profiles.length - realProfiles.length} sample profiles, kept ${realProfiles.length} real profiles`)
        } catch (e) {
          console.error('Error filtering profiles:', e)
        }
      }

      // Update localStorage with only real profiles
      if (realProfiles.length > 0) {
        localStorage.setItem('allUserProfiles', JSON.stringify(realProfiles))
        localStorage.setItem('userProfile', JSON.stringify(realProfiles[0]))
      } else {
        localStorage.removeItem('userProfile')
        localStorage.removeItem('allUserProfiles')
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('authProvider')
      }

      // Reload admin data
      loadAdminData()

      alert(`✅ Cleared sample data successfully!\n\nRemoved: ${allProfiles ? JSON.parse(allProfiles).length - realProfiles.length : 0} sample profiles\nKept: ${realProfiles.length} real user profiles`)
    }
  }

  const cleanupSampleDataSilently = () => {
    const allProfiles = localStorage.getItem('allUserProfiles')
    let realProfiles: Worker[] = []

    if (allProfiles) {
      try {
        const profiles = JSON.parse(allProfiles)
        // Filter out sample/dummy data - keep only profiles that look like real user submissions
        realProfiles = profiles.filter((profile: any) => {
          const isTestProfile =
            profile.id?.includes('test_') ||
            profile.id?.includes('worker_') ||
            profile.email?.includes('.real@') ||
            profile.email?.includes('@test.com') ||
            profile.email?.includes('himanshu') ||
            profile.fullName?.includes('Test User') ||
            profile.aboutMe?.includes('Test profile created') ||
            profile.aboutMe?.includes('Experienced cook with 5 years in Gulf region') ||
            profile.aboutMe?.includes('Dedicated housemaid with excellent') ||
            profile.aboutMe?.includes('Skilled construction worker') ||
            profile.aboutMe?.includes('Caring nanny with') ||
            profile.aboutMe?.includes('Professional driver with') ||
            profile.aboutMe?.includes('Reliable cleaner with') ||
            profile.aboutMe?.includes('Certified electrician with') ||
            profile.aboutMe?.includes('Professional housekeeper with')

          return !isTestProfile
        })

        console.log(`🧹 Auto-cleanup: Removed ${profiles.length - realProfiles.length} sample profiles, kept ${realProfiles.length} real profiles`)
      } catch (e) {
        console.error('Error filtering profiles during cleanup:', e)
      }
    }

    // Update localStorage with only real profiles
    if (realProfiles.length > 0) {
      localStorage.setItem('allUserProfiles', JSON.stringify(realProfiles))
      localStorage.setItem('userProfile', JSON.stringify(realProfiles[0]))
    } else {
      localStorage.removeItem('userProfile')
      localStorage.removeItem('allUserProfiles')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('authProvider')
    }
  }

  const showAllLocalStorageData = () => {
    const allData: Record<string, any> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        try {
          const value = localStorage.getItem(key)
          if (value && (value.startsWith('{') || value.startsWith('['))) {
            allData[key] = JSON.parse(value)
          } else {
            allData[key] = value
          }
        } catch (e) {
          allData[key] = localStorage.getItem(key) + ' (parse error)'
        }
      }
    }

    console.log('🔍 COMPLETE LOCALSTORAGE DUMP:', allData)

    // Create a formatted display
    let display = 'COMPLETE LOCALSTORAGE CONTENTS:\n\n'
    Object.entries(allData).forEach(([key, value]) => {
      display += `${key}:\n`
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          display += `  Array with ${value.length} items\n`
          value.forEach((item, index) => {
            if (typeof item === 'object' && item.fullName) {
              display += `    [${index}] ${item.fullName} (${item.jobTitle || 'N/A'})\n`
            } else {
              display += `    [${index}] ${JSON.stringify(item).substring(0, 50)}...\n`
            }
          })
        } else if (value.fullName) {
          display += `  Profile: ${value.fullName} (${value.jobTitle || 'N/A'})\n`
        } else {
          display += `  Object: ${JSON.stringify(value).substring(0, 100)}...\n`
        }
      } else {
        display += `  ${value}\n`
      }
      display += '\n'
    })

    alert(display)
  }

  const searchForProfile = () => {
    const searchName = prompt('Enter name to search for (e.g., "Vanshika"):')
    if (!searchName) return

    console.log(`🔍 Searching for profile containing: "${searchName}"`)

    // Check userProfile
    const userProfile = localStorage.getItem('userProfile')
    let foundInUserProfile = false
    if (userProfile) {
      try {
        const profile = JSON.parse(userProfile)
        if (profile.fullName?.toLowerCase().includes(searchName.toLowerCase())) {
          console.log('✅ Found in userProfile:', profile)
          foundInUserProfile = true
        }
      } catch (e) {
        console.error('Error parsing userProfile:', e)
      }
    }

    // Check allUserProfiles
    const allProfiles = localStorage.getItem('allUserProfiles')
    let foundInAllProfiles: any[] = []
    if (allProfiles) {
      try {
        const profiles = JSON.parse(allProfiles)
        if (Array.isArray(profiles)) {
          foundInAllProfiles = profiles.filter(profile =>
            profile.fullName?.toLowerCase().includes(searchName.toLowerCase())
          )
          console.log(`✅ Found ${foundInAllProfiles.length} matches in allUserProfiles:`, foundInAllProfiles)
        }
      } catch (e) {
        console.error('Error parsing allUserProfiles:', e)
      }
    }

    // Check current users state
    const foundInCurrentUsers = users.filter(user =>
      user.fullName?.toLowerCase().includes(searchName.toLowerCase())
    )
    console.log(`✅ Found ${foundInCurrentUsers.length} matches in current users state:`, foundInCurrentUsers)

    // Summary
    let summary = `Search Results for "${searchName}":\n\n`
    summary += `📋 userProfile: ${foundInUserProfile ? 'FOUND' : 'NOT FOUND'}\n`
    summary += `📋 allUserProfiles: ${foundInAllProfiles.length} matches\n`
    summary += `📋 Current admin state: ${foundInCurrentUsers.length} matches\n\n`

    if (foundInAllProfiles.length > 0) {
      summary += 'Details from allUserProfiles:\n'
      foundInAllProfiles.forEach((profile, i) => {
        summary += `[${i+1}] ${profile.fullName}\n`
        summary += `    Job: ${profile.jobTitle || profile.customJobTitle || 'N/A'}\n`
        summary += `    City: ${profile.city || 'N/A'}\n`
        summary += `    Email: ${profile.email || 'N/A'}\n`
        summary += `    ID: ${profile.id || 'N/A'}\n\n`
      })
    }

    if (foundInCurrentUsers.length > 0) {
      summary += 'Details from current admin state:\n'
      foundInCurrentUsers.forEach((user, i) => {
        summary += `[${i+1}] ${user.fullName}\n`
        summary += `    Job: ${user.jobTitle}\n`
        summary += `    City: ${user.city}\n`
        summary += `    Email: ${user.email}\n\n`
      })
    }

    if (!foundInUserProfile && foundInAllProfiles.length === 0 && foundInCurrentUsers.length === 0) {
      summary += '❌ Profile not found in any location.\n\n'
      summary += 'Possible reasons:\n'
      summary += '• Profile was created in different browser\n'
      summary += '• localStorage was cleared\n'
      summary += '• Profile creation failed\n'
      summary += '• Different domain/origin\n'
    } else if (foundInAllProfiles.length > 0 && foundInCurrentUsers.length === 0) {
      summary += '⚠️ Profile exists in localStorage but not loaded in admin!\n'
      summary += 'Try clicking Refresh button.\n'
    }

    alert(summary)
  }

  const addMissingVanshikaProfile = () => {
    // Add the specific profile that was mentioned as missing
    const vanshikaProfile = {
      id: `worker_${Date.now()}_vanshika_real`,
      fullName: 'Vanshika',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=400&h=400&fit=crop&crop=face',
      jobCategory: 'Transport & Logistics',
      jobTitle: 'Logistics Assistant' as JobTitle,
      customJobTitle: undefined,
      jobProfile: 'Logistics Assistant with experience in supply chain coordination',
      yearsExperience: 2,
      city: 'Dubai' as City,
      country: 'UAE' as Country,
      languagesSpoken: ['English', 'Hindi'],
      expectedSalary: 2800,
      visaStatus: 'Work Visa' as const,
      availability: true,
      aboutMe: 'Experienced logistics assistant with 2 years in supply chain management.',
      phoneNumber: '+971501234567',
      email: 'vanshika.logistics@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add to localStorage
    const existingProfiles = JSON.parse(localStorage.getItem('allUserProfiles') || '[]')
    const updatedProfiles = [...existingProfiles.filter((p: any) => p.email !== vanshikaProfile.email), vanshikaProfile]
    localStorage.setItem('allUserProfiles', JSON.stringify(updatedProfiles))
    localStorage.setItem('userProfile', JSON.stringify(vanshikaProfile))

    console.log('✅ Added missing Vanshika profile:', vanshikaProfile)
    alert(`✅ Added missing profile:\n\nVanshika\nLogistics Assistant, Dubai\n\nClick Refresh to see the profile in the dashboard.`)
  }

  const refreshDatabaseData = async () => {
    setLoading(true)
    try {
      console.log('🔄 Refreshing all database data...')
      await loadAdminData()
      alert(`✅ Database refreshed successfully!\n\nNow showing all real user profiles from the database.`)
    } catch (error) {
      console.error('Refresh failed:', error)
      alert(`❌ Refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const importProfilesFromProduction = () => {
    const instructions = `
To import real user profiles from gogethires.com:

1. Open gogethires.com/admin in a new tab
2. Open Developer Tools (F12)
3. Go to Console tab
4. Copy and paste this command:

// Export profiles from gogethires.com
const exportData = {
  userProfile: localStorage.getItem('userProfile'),
  allUserProfiles: localStorage.getItem('allUserProfiles'),
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  authProvider: localStorage.getItem('authProvider')
};
console.log('COPY THIS DATA:');
console.log(JSON.stringify(exportData, null, 2));

5. Copy the output data
6. Come back to this admin panel
7. Click "📋 Import Data" button and paste the data

This will sync real user profiles from production to this environment.
    `

    alert(instructions.trim())
  }

  const importProfileData = () => {
    const data = prompt('Paste the exported profile data from gogethires.com:')
    if (!data) return

    try {
      const parsedData = JSON.parse(data)

      if (parsedData.userProfile) {
        localStorage.setItem('userProfile', parsedData.userProfile)
        console.log('✅ Imported userProfile')
      }

      if (parsedData.allUserProfiles) {
        localStorage.setItem('allUserProfiles', parsedData.allUserProfiles)
        console.log('✅ Imported allUserProfiles')
      }

      if (parsedData.isLoggedIn) {
        localStorage.setItem('isLoggedIn', parsedData.isLoggedIn)
        console.log('✅ Imported isLoggedIn')
      }

      if (parsedData.authProvider) {
        localStorage.setItem('authProvider', parsedData.authProvider)
        console.log('✅ Imported authProvider')
      }

      // Parse and count profiles
      let profileCount = 0
      if (parsedData.allUserProfiles) {
        try {
          const profiles = JSON.parse(parsedData.allUserProfiles)
          profileCount = Array.isArray(profiles) ? profiles.length : 0
        } catch (e) {
          console.warn('Error counting profiles:', e)
        }
      }

      alert(`✅ Successfully imported ${profileCount} user profiles from production!\n\nClick Refresh to see them in the dashboard.`)

      // Auto-refresh after import
      setTimeout(() => loadAdminData(), 500)

    } catch (error) {
      console.error('Import error:', error)
      alert('❌ Error importing data. Please check the format and try again.')
    }
  }

  const generateExportScript = () => {
    const script = `
// Run this script on gogethires.com to export user profiles
const exportData = {
  userProfile: localStorage.getItem('userProfile'),
  allUserProfiles: localStorage.getItem('allUserProfiles'),
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  authProvider: localStorage.getItem('authProvider')
};

console.clear();
console.log('='.repeat(60));
console.log('🚀 GOGETHIRES.COM PROFILE EXPORT');
console.log('='.repeat(60));
console.log('📊 Profiles found:', exportData.allUserProfiles ? JSON.parse(exportData.allUserProfiles).length : 0);
console.log('');
console.log('📋 Copy the JSON data below (everything between the dashes):');
console.log('-'.repeat(60));
console.log(JSON.stringify(exportData, null, 2));
console.log('-'.repeat(60));
console.log('');
console.log('✅ Next steps:');
console.log('1. Copy the JSON data above');
console.log('2. Go back to your development admin panel');
console.log('3. Click "📥 Import Data" button');
console.log('4. Paste the data and click OK');
console.log('');
console.log('✨ All profiles will then appear in your development environment!');
    `

    navigator.clipboard.writeText(script.trim()).then(() => {
      alert(`✅ Export script copied to clipboard!\n\n📋 QUICK STEPS:\n1. Go to gogethires.com/admin\n2. Press F12 (Developer Tools)\n3. Paste the script in Console\n4. Copy the export data shown\n5. Come back here and click "📥 Import Data"\n\n💡 This will sync all real user profiles to this development environment.`)
    }).catch(() => {
      alert(`Copy this script manually:\n\n${script.trim()}`)
    })
  }

  const openProductionAdmin = () => {
    if (!isClient) return
    const productionUrl = 'https://gogethires.com/admin'
    window.open(productionUrl, '_blank')

    setTimeout(() => {
      alert(`🌐 Production admin opened in new tab!\n\n📋 TO SYNC PROFILES:\n1. Login to production admin (admin/admin123)\n2. Use the export/import tools there\n3. OR manage real user profiles directly on production\n\n💡 Real user profiles should appear automatically on gogethires.com`)
    }, 1000)
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
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
              {migrationStatus && (
                <div className="mt-2 bg-white/10 rounded px-3 py-1 text-sm">
                  {migrationStatus}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {(() => {
                const isProductionDomain = typeof window !== 'undefined' && window.location.hostname.includes('gogethires.com')
                if (!isProductionDomain) {
                  return (
                    <>
                      <button
                        onClick={openProductionAdmin}
                        className="bg-green-500/20 hover:bg-green-500/30 px-3 py-2 rounded-lg transition-colors text-xs border border-green-300/20 font-medium"
                        title="Open production admin panel"
                      >
                        🌐 Production Admin
                      </button>
                      <div className="w-px h-6 bg-white/20"></div>
                      <button
                        onClick={generateExportScript}
                        className="bg-indigo-500/20 hover:bg-indigo-500/30 px-2 py-2 rounded-lg transition-colors text-xs border border-indigo-300/20"
                        title="Get script to export from gogethires.com"
                      >
                        📤 Export Script
                      </button>
                      <button
                        onClick={importProfileData}
                        className="bg-teal-500/20 hover:bg-teal-500/30 px-2 py-2 rounded-lg transition-colors text-xs border border-teal-300/20"
                        title="Import profiles from gogethires.com"
                      >
                        📥 Import Data
                      </button>
                    </>
                  )
                }
                return null
              })()}
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={checkLocalStorageProfiles}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 px-2 py-2 rounded-lg transition-colors text-xs font-medium"
                title="Check localStorage profiles and migration status"
              >
                📊 Check Profiles
              </button>
              <button
                onClick={migrateLocalStorageToDatabase}
                className="bg-purple-500/20 hover:bg-purple-500/30 px-2 py-2 rounded-lg transition-colors text-xs font-medium border border-purple-300/20"
                title="Migrate localStorage profiles to database"
              >
                🚀 Migrate to Database
              </button>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={searchForProfile}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 px-2 py-2 rounded-lg transition-colors text-xs"
                title="Search for specific profile"
              >
                🔍 Search
              </button>
              <button
                onClick={showAllLocalStorageData}
                className="bg-blue-500/20 hover:bg-blue-500/30 px-2 py-2 rounded-lg transition-colors text-xs"
                title="Show all localStorage data"
              >
                📋 All Data
              </button>
              <button
                onClick={debugLocalStorage}
                className="bg-red-500/20 hover:bg-red-500/30 px-2 py-2 rounded-lg transition-colors text-xs"
                title="Debug localStorage"
              >
                🐛 Debug
              </button>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={() => {
                  cleanupSampleDataSilently()
                  loadAdminData()
                  alert('🧹 Sample data cleared! Only real user profiles remain.')
                }}
                className="bg-orange-500/20 hover:bg-orange-500/30 px-2 py-2 rounded-lg transition-colors text-xs border border-orange-300/20"
                title="Clear sample and dummy data immediately"
              >
                🧹 Clear Sample Data Now
              </button>
              <button
                onClick={clearAllProfiles}
                className="bg-red-600/20 hover:bg-red-600/30 px-2 py-2 rounded-lg transition-colors text-xs"
                title="Clear all profiles"
              >
                🗑️ Clear All
              </button>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={refreshDatabaseData}
                className="bg-blue-500/20 hover:bg-blue-500/30 px-3 py-2 rounded-lg transition-colors flex items-center gap-1 border border-blue-300/20"
                title="Refresh database data"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh DB
              </button>
              <button
                onClick={loadAdminData}
                className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                title="Refresh user data"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <Link href="/admin/seo" className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors">
                <GlobeAltIcon className="h-4 w-4 inline mr-1" />
                SEO
              </Link>
              <div className="bg-white/20 rounded-full p-2">
                <CogIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Domain Info Banner - Show different content based on domain */}
        {(() => {
          const isProductionDomain = isClient && window.location.hostname.includes('gogethires.com')
          const isDevelopmentDomain = isClient && !isProductionDomain

          if (isProductionDomain) {
            return (
              <div data-domain-banner className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 rounded-full p-2 mt-0.5">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-green-900 mb-1">
                        ✅ Production Environment
                      </h3>
                      <p className="text-green-700 text-sm mb-2">
                        You're on <strong>gogethires.com</strong> - real user profiles should appear automatically.
                      </p>
                      <p className="text-green-600 text-xs">
                        If profiles aren't showing, try refreshing the page or check the debug tools below.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => document.querySelector('[data-domain-banner]')?.remove()}
                    className="text-green-400 hover:text-green-600 p-1"
                    title="Dismiss banner"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          } else {
            return (
              <div data-domain-banner className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 rounded-full p-2 mt-0.5">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-orange-900 mb-1">
                        ⚠️ Development Environment
                      </h3>
                      <p className="text-orange-700 text-sm mb-2">
                        Real user profiles from <strong>gogethires.com</strong> won't show here due to cross-domain storage limitations.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        <button
                          onClick={openProductionAdmin}
                          className="bg-green-600 text-white px-3 py-2 rounded text-xs hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-1"
                        >
                          🌐 Open Production Admin
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>
                        <div className="flex gap-1">
                          <button
                            onClick={generateExportScript}
                            className="flex-1 bg-orange-600 text-white px-2 py-2 rounded text-xs hover:bg-orange-700 transition-colors"
                          >
                            📤 Export
                          </button>
                          <button
                            onClick={importProfileData}
                            className="flex-1 bg-teal-600 text-white px-2 py-2 rounded text-xs hover:bg-teal-700 transition-colors"
                          >
                            📥 Import
                          </button>
                        </div>
                      </div>
                      <p className="text-orange-600 text-xs leading-relaxed">
                        💡 <strong>Recommended:</strong> Use the Production Admin button above to manage real user profiles directly on gogethires.com where they appear automatically.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => document.querySelector('[data-domain-banner]')?.remove()}
                    className="text-orange-400 hover:text-orange-600 p-1"
                    title="Dismiss banner"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          }
        })()}

        {/* Migration Status Banner */}
        {users.length === 0 && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">No User Profiles Found</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-red-700 mb-3">
                  The admin panel cannot find any user profiles. This usually means profiles exist in localStorage but haven't been migrated to the database yet.
                </p>
                <ul className="text-red-600 text-sm space-y-1 mb-4">
                  <li>• Users created profiles before database was set up</li>
                  <li>• Profiles are stored locally but not in database</li>
                  <li>• Cross-domain storage limitations</li>
                  <li>• Migration hasn't been run yet</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h4 className="text-red-900 font-medium mb-3">🚀 Quick Migration Steps:</h4>
                <div className="space-y-2 text-sm">
                  <button
                    onClick={checkLocalStorageProfiles}
                    className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-left"
                  >
                    1️⃣ Check Profile Status
                  </button>
                  <button
                    onClick={migrateLocalStorageToDatabase}
                    className="w-full bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 text-left"
                  >
                    2️⃣ Migrate to Database
                  </button>
                  <button
                    onClick={refreshDatabaseData}
                    className="w-full bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-left"
                  >
                    3️⃣ Refresh & View Profiles
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-800 text-sm">
                💡 <strong>If you're on a different domain:</strong> Use the "📤 Export Script" and "📥 Import Data" buttons to sync profiles from gogethires.com
              </p>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{stats.totalUsers}</h3>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <MapPinIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{Object.keys(stats.usersByCity).length}</h3>
                <p className="text-sm text-gray-600">Cities Covered</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <BriefcaseIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{Object.keys(stats.usersByJob).length}</h3>
                <p className="text-sm text-gray-600">Job Types</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3">
                <GlobeAltIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{Object.keys(stats.usersByCountry).length}</h3>
                <p className="text-sm text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {Object.keys(stats.usersByCity).sort().map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="sm:w-48">
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Jobs</option>
                {Object.keys(stats.usersByJob).sort().map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              User Profiles ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.profilePicture}
                          alt={user.fullName}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id?.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.jobTitle}</div>
                      <div className="text-sm text-gray-500">{user.city}, {user.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.yearsExperience} years</div>
                      <div className="text-sm text-gray-500">AED {user.expectedSalary?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/edit-user/${user.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit user"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => alert(`User Details:\n\nName: ${user.fullName}\nEmail: ${user.email}\nJob: ${user.jobTitle}\nLocation: ${user.city}, ${user.country}\nExperience: ${user.yearsExperience} years\nSalary: AED ${user.expectedSalary?.toLocaleString()}\nVisa: ${user.visaStatus}\nLanguages: ${user.languagesSpoken?.join(', ')}\nAbout: ${user.aboutMe}`)}
                          className="text-green-600 hover:text-green-900"
                          title="View details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete user"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {users.length === 0 
                  ? "No user profiles exist yet. Users can create profiles through the main website."
                  : "No users match the current search criteria. Try adjusting your filters."
                }
              </p>
            </div>
          )}
        </div>

        {/* City-Job Combinations */}
        {users.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Popular City-Job Combinations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page URL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCityJobCombinations().slice(0, 10).map((combo, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {combo.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {combo.job}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {combo.count} user{combo.count !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link href={combo.url} className="text-indigo-600 hover:text-indigo-900">
                          {combo.url}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
