'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  UserIcon, 
  PencilIcon, 
  EyeIcon, 
  MapPinIcon, 
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
  LanguageIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  PhotoIcon,
  StarIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  HeartIcon,
  ShareIcon,
  TrophyIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { Worker } from '../../types'

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<Worker | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get profile data from localStorage (in real app, this would be an API call)
    const profileData = localStorage.getItem('userProfile')
    if (profileData) {
      const profile = JSON.parse(profileData)

      // Fix profile picture if it's stored incorrectly
      if (profile.profilePicture && typeof profile.profilePicture === 'object') {
        // If it's a File object (shows as [object Object]), use a default image
        profile.profilePicture = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      } else if (!profile.profilePicture || profile.profilePicture === '') {
        // If no profile picture, use default
        profile.profilePicture = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      }

      setUserProfile(profile)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border p-12">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-4">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Welcome to Your Dashboard!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              You haven't created a worker profile yet. Create one to start receiving job opportunities.
            </p>
            <Link href="/create-profile" className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block">
              🚀 Create Your Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Mobile-Optimized Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold">👋 Welcome back, {userProfile.fullName.split(' ')[0]}!</h1>
              <p className="text-blue-100 mt-1">Your professional dashboard awaits</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <BellIcon className="h-6 w-6 text-white" />
              </div>
              <div className="bg-white/20 rounded-full p-2">
                <CogIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile-First Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center border">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-3 w-12 h-12 mx-auto mb-3">
              <EyeIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-navy-900">127</div>
            <div className="text-xs text-gray-600">Profile Views</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center border">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full p-3 w-12 h-12 mx-auto mb-3">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-navy-900">23</div>
            <div className="text-xs text-gray-600">Shortlisted</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center border">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full p-3 w-12 h-12 mx-auto mb-3">
              <BriefcaseIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-navy-900">8</div>
            <div className="text-xs text-gray-600">Job Matches</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center border">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-3 w-12 h-12 mx-auto mb-3">
              <TrophyIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-navy-900">4.8</div>
            <div className="text-xs text-gray-600">Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Profile Card - Mobile Optimized */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
              {/* Enhanced Profile Header */}
              <div className="relative">
                <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 h-24 sm:h-32"></div>
                <div className="absolute -bottom-8 sm:-bottom-12 left-4 sm:left-6">
                  <div className="relative">
                    <img
                      src={userProfile.profilePicture}
                      alt={userProfile.fullName}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <CheckBadgeIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Link 
                    href="/edit-profile"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-navy-900 p-2 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg"
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                </div>
              </div>

              {/* Profile Content - Mobile Optimized */}
              <div className="pt-12 sm:pt-16 pb-6 px-4 sm:px-6">
                {/* Basic Info */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-1">{userProfile.fullName}</h2>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-lg sm:text-xl text-primary-600 font-semibold">{userProfile.jobTitle}</p>
                        {userProfile.availability && (
                          <CheckBadgeIcon className="h-5 w-5 text-green-500" title="Visa Available" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        userProfile.availability 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {userProfile.availability ? '🟢 Available' : '🔴 Busy'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{userProfile.city}, {userProfile.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{userProfile.yearsExperience} years exp.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CurrencyDollarIcon className="h-4 w-4" />
                      <span>AED {userProfile.expectedSalary.toLocaleString()}/month</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats Grid - Mobile Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-navy-900">{userProfile.yearsExperience}</div>
                    <div className="text-xs text-gray-600">Years</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-navy-900">{userProfile.expectedSalary}</div>
                    <div className="text-xs text-gray-600">AED/Month</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-navy-900">{userProfile.languagesSpoken.length}</div>
                    <div className="text-xs text-gray-600">Languages</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-3 w-3 ${i < 4 ? 'text-gold-500 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-600">4.8 Rating</div>
                  </div>
                </div>

                {/* Languages - Mobile Optimized */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                    <LanguageIcon className="h-5 w-5" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.languagesSpoken.map((language) => (
                      <span 
                        key={language} 
                        className="bg-gradient-to-r from-primary-100 to-blue-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About Me */}
                {userProfile.aboutMe && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                      <DocumentTextIcon className="h-5 w-5" />
                      About Me
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{userProfile.aboutMe}</p>
                  </div>
                )}

                {/* Quick Actions - Mobile Optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link 
                    href="/edit-profile" 
                    className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg"
                  >
                    <PencilIcon className="h-5 w-5" />
                    Edit Profile
                  </Link>
                  <Link 
                    href="/profile-preview" 
                    className="bg-white border-2 border-primary-200 hover:border-primary-300 text-primary-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Mobile Responsive */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5" />
                Profile Strength
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Info</span>
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile Photo</span>
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Job Information</span>
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">About Me</span>
                  {userProfile.aboutMe ? (
                    <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-orange-300"></div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-semibold text-navy-900">{userProfile.aboutMe ? '100%' : '85%'}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full h-3 transition-all duration-500"
                    style={{ width: `${userProfile.aboutMe ? 100 : 85}%` }}
                  ></div>
                </div>
                {!userProfile.aboutMe && (
                  <p className="text-xs text-orange-600 mt-2">💡 Add "About Me" to reach 100%</p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-orange-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Profile viewed by 5 employers</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Added to shortlist</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New job match found</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-2xl border border-gold-200 p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">🚀 Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/browse" className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-gray-900">Browse Jobs</span>
                  </div>
                </Link>
                <Link href="/profile-preview" className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShareIcon className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">Share Profile</span>
                  </div>
                </Link>
                <Link href="/edit-profile" className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <CogIcon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Settings</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
