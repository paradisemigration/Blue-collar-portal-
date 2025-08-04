'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, GlobeAltIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Worker } from '../../../types'

interface SEOData {
  url: string
  title: string
  description: string
  keywords: string
  city: string
  job: string
  userCount: number
}

export default function SEOManager() {
  const [seoPages, setSeoPages] = useState<SEOData[]>([])
  const [editingPage, setEditingPage] = useState<SEOData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSEOData()
  }, [])

  const loadSEOData = () => {
    try {
      // Load user profiles to generate SEO pages
      const allProfiles = localStorage.getItem('allUserProfiles')
      const userProfile = localStorage.getItem('userProfile')
      
      let profiles: Worker[] = []
      
      if (allProfiles) {
        profiles = JSON.parse(allProfiles)
      }
      
      if (userProfile) {
        const profile = JSON.parse(userProfile)
        if (!profiles.find(p => p.id === profile.id)) {
          profiles.push(profile)
        }
      }

      // Generate all possible city/job combinations for all countries
      const countries = ['UAE', 'Qatar', 'Saudi Arabia', 'Oman', 'Kuwait', 'Bahrain']
      const citiesByCountry = {
        'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'],
        'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen'],
        'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif'],
        'Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi'],
        'Kuwait': ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya'],
        'Bahrain': ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
      }
      
      const jobTitles = [
        'Driver', 'Maid', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 
        'Painter', 'Security Guard', 'Cook', 'Gardener', 'Mechanic', 
        'Construction Worker', 'Delivery Driver', 'Warehouse Worker', 'Office Boy',
        'AC Technician', 'Welder', 'Mason', 'Tile Setter', 'Roofer', 'Glazier'
      ]

      const combinations: Record<string, SEOData> = {}
      
      // Generate all possible combinations
      countries.forEach(country => {
        citiesByCountry[country].forEach(city => {
          jobTitles.forEach(job => {
            const key = `${city}-${job}`
            const url = `/${city.toLowerCase().replace(/\s+/g, '-')}/${job.toLowerCase().replace(/\s+/g, '-')}`
            
            combinations[key] = {
              url,
              title: `Hire ${job}s in ${city} | Gulf Hiring Platform`,
              description: `Find experienced ${job.toLowerCase()}s in ${city}. Browse verified profiles, check reviews, and hire skilled professionals for your business needs.`,
              keywords: `${job.toLowerCase()}, ${city.toLowerCase()}, hire, jobs, workers, ${country.toLowerCase()}, gulf`,
              city: city,
              job: job,
              userCount: 0
            }
          })
        })
      })
      
      // Count actual users for each combination
      profiles.forEach(profile => {
        const key = `${profile.city}-${profile.jobTitle}`
        if (combinations[key]) {
          combinations[key].userCount++
        }
      })

      // Add static pages
      const staticPages: SEOData[] = [
        {
          url: '/help',
          title: 'Help Center | Gulf Hiring Platform',
          description: 'Get help and support for using Gulf Hiring Platform. Find answers to common questions and contact support.',
          keywords: 'help, support, faq, gulf hiring, assistance',
          city: 'Static',
          job: 'Help Center',
          userCount: 0
        },
        {
          url: '/contact',
          title: 'Contact Us | Gulf Hiring Platform',
          description: 'Contact Gulf Hiring Platform support team. Get in touch for assistance, partnerships, or business inquiries.',
          keywords: 'contact, support, help, business, partnership',
          city: 'Static',
          job: 'Contact Us',
          userCount: 0
        },
        {
          url: '/privacy',
          title: 'Privacy Policy | Gulf Hiring Platform',
          description: 'Read our privacy policy to understand how we collect, use, and protect your personal information on Gulf Hiring Platform.',
          keywords: 'privacy, policy, data protection, gdpr, personal information',
          city: 'Static',
          job: 'Privacy Policy',
          userCount: 0
        },
        {
          url: '/terms',
          title: 'Terms of Service | Gulf Hiring Platform',
          description: 'Read our terms of service and user agreement for using Gulf Hiring Platform services.',
          keywords: 'terms, service, agreement, legal, conditions',
          city: 'Static',
          job: 'Terms of Service',
          userCount: 0
        }
      ]

      // Load existing SEO customizations
      const savedSEO = localStorage.getItem('seoCustomizations')
      if (savedSEO) {
        const customizations = JSON.parse(savedSEO)
        Object.keys(combinations).forEach(key => {
          const url = combinations[key].url
          if (customizations[url]) {
            combinations[key] = { ...combinations[key], ...customizations[url] }
          }
        })
        
        // Apply customizations to static pages
        staticPages.forEach(page => {
          if (customizations[page.url]) {
            Object.assign(page, customizations[page.url])
          }
        })
      }

      setSeoPages([...Object.values(combinations), ...staticPages])
      setLoading(false)
    } catch (error) {
      console.error('Error loading SEO data:', error)
      setLoading(false)
    }
  }

  const handleEdit = (page: SEOData) => {
    setEditingPage({ ...page })
  }

  const handleSave = () => {
    if (!editingPage) return

    try {
      // Update the page in the list
      const updatedPages = seoPages.map(page => 
        page.url === editingPage.url ? editingPage : page
      )
      setSeoPages(updatedPages)

      // Save customizations to localStorage
      const savedSEO = localStorage.getItem('seoCustomizations')
      const customizations = savedSEO ? JSON.parse(savedSEO) : {}
      
      customizations[editingPage.url] = {
        title: editingPage.title,
        description: editingPage.description,
        keywords: editingPage.keywords
      }
      
      localStorage.setItem('seoCustomizations', JSON.stringify(customizations))
      
      setEditingPage(null)
      alert('SEO data saved successfully!')
    } catch (error) {
      console.error('Error saving SEO data:', error)
      alert('Error saving SEO data. Please try again.')
    }
  }

  const handleCancel = () => {
    setEditingPage(null)
  }

  const updateEditingField = (field: keyof SEOData, value: string) => {
    if (editingPage) {
      setEditingPage({ ...editingPage, [field]: value })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SEO data...</p>
        </div>
      </div>
    )
  }

  const citiesByCountry = {
    'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'],
    'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor', 'Al Daayen'],
    'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Dhahran', 'Jubail', 'Yanbu', 'Taif'],
    'Oman': ['Muscat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Rustaq', 'Buraimi'],
    'Kuwait': ['Kuwait City', 'Hawalli', 'Salmiya', 'Jahra', 'Ahmadi', 'Farwaniya'],
    'Bahrain': ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Isa Town', 'Sitra']
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold">SEO Management</h1>
                <p className="text-purple-100 mt-1">Manage meta titles, descriptions, and keywords for all pages</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <GlobeAltIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pages</p>
                <p className="text-3xl font-bold text-gray-900">{seoPages.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <GlobeAltIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {seoPages.reduce((sum, page) => sum + page.userCount, 0)}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <GlobeAltIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-3xl font-bold text-gray-900">6</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <GlobeAltIcon className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Pages List */}
        <div className="bg-white rounded-xl shadow-lg border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Pages SEO Management</h2>
            <p className="text-gray-600 mt-1">Customize meta titles, descriptions, and keywords for all pages</p>
          </div>

          <div className="p-6 max-h-screen overflow-y-auto">
            {/* Static Pages */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Static Pages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seoPages.filter(page => page.city === 'Static').map((page) => (
                  <div key={page.url} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <a 
                          href={page.url}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          target="_blank"
                        >
                          {page.job}
                        </a>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                          Static
                        </span>
                      </div>
                      <button
                        onClick={() => handleEdit(page)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {editingPage?.url === page.url ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                          <input
                            type="text"
                            value={editingPage.title}
                            onChange={(e) => updateEditingField('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                          <textarea
                            value={editingPage.description}
                            onChange={(e) => updateEditingField('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button onClick={handleCancel} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                          <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Save</button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Title:</p>
                        <p className="text-sm text-gray-600">{page.title}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Country-wise City/Job Pages */}
            {['UAE', 'Qatar', 'Saudi Arabia', 'Oman', 'Kuwait', 'Bahrain'].map(country => {
              const countryPages = seoPages.filter(page => 
                citiesByCountry[country]?.includes(page.city)
              )
              
              if (countryPages.length === 0) return null
              
              return (
                <div key={country} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 flex items-center justify-between">
                    {country}
                    <span className="text-sm text-gray-500 font-normal">
                      {countryPages.length} pages • {countryPages.reduce((sum, page) => sum + page.userCount, 0)} users
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {countryPages.slice(0, 20).map((page) => (
                      <div key={page.url} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <a 
                            href={page.url}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm truncate"
                            target="_blank"
                          >
                            {page.city}/{page.job}
                          </a>
                          <button
                            onClick={() => handleEdit(page)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                          >
                            <PencilIcon className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {page.userCount} users
                        </span>
                      </div>
                    ))}
                    {countryPages.length > 20 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        ... and {countryPages.length - 20} more pages
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Edit Modal */}
            {editingPage && editingPage.city !== 'Static' && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Edit SEO for {editingPage.city}/{editingPage.job}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                      <input
                        type="text"
                        value={editingPage.title}
                        onChange={(e) => updateEditingField('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                      <textarea
                        value={editingPage.description}
                        onChange={(e) => updateEditingField('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                      <input
                        type="text"
                        value={editingPage.keywords}
                        onChange={(e) => updateEditingField('keywords', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={handleCancel} 
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave} 
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
