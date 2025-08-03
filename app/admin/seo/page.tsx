'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, GlobeAltIcon, PencilIcon, SaveIcon } from '@heroicons/react/24/outline'
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

      // Generate city/job combinations
      const combinations: Record<string, SEOData> = {}
      
      profiles.forEach(profile => {
        const key = `${profile.city}-${profile.jobTitle}`
        const url = `/${profile.city.toLowerCase().replace(/\s+/g, '-')}/${profile.jobTitle.toLowerCase().replace(/\s+/g, '-')}`
        
        if (combinations[key]) {
          combinations[key].userCount++
        } else {
          combinations[key] = {
            url,
            title: `Hire ${profile.jobTitle}s in ${profile.city} | Gulf Hiring Platform`,
            description: `Find experienced ${profile.jobTitle.toLowerCase()}s in ${profile.city}. Browse verified profiles, check reviews, and hire skilled professionals for your business needs.`,
            keywords: `${profile.jobTitle.toLowerCase()}, ${profile.city.toLowerCase()}, hire, jobs, workers, ${profile.country.toLowerCase()}, gulf`,
            city: profile.city,
            job: profile.jobTitle,
            userCount: 1
          }
        }
      })

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
      }

      setSeoPages(Object.values(combinations))
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
                <p className="text-purple-100 mt-1">Manage meta titles, descriptions, and keywords for city/job pages</p>
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
                <p className="text-sm text-gray-600">Avg Users/Page</p>
                <p className="text-3xl font-bold text-gray-900">
                  {seoPages.length > 0 ? Math.round(seoPages.reduce((sum, page) => sum + page.userCount, 0) / seoPages.length) : 0}
                </p>
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
            <h2 className="text-xl font-bold text-gray-900">City/Job Pages SEO</h2>
            <p className="text-gray-600 mt-1">Customize meta titles, descriptions, and keywords for each page</p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {seoPages.map((page) => (
                <div key={page.url} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Link 
                        href={page.url}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        target="_blank"
                      >
                        {page.city}/{page.job}
                      </Link>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        {page.userCount} users
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          value={editingPage.title}
                          onChange={(e) => updateEditingField('title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter meta title..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Length: {editingPage.title.length}/60 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Description
                        </label>
                        <textarea
                          value={editingPage.description}
                          onChange={(e) => updateEditingField('description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter meta description..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Length: {editingPage.description.length}/160 characters
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Keywords
                        </label>
                        <input
                          type="text"
                          value={editingPage.keywords}
                          onChange={(e) => updateEditingField('keywords', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter keywords separated by commas..."
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                        >
                          <SaveIcon className="h-4 w-4" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Title:</p>
                        <p className="text-sm text-gray-600">{page.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Description:</p>
                        <p className="text-sm text-gray-600">{page.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Keywords:</p>
                        <p className="text-sm text-gray-600">{page.keywords}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {seoPages.length === 0 && (
              <div className="text-center py-12">
                <GlobeAltIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No city/job pages found. Users need to create profiles first.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
