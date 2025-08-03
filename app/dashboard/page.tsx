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
  PhotoIcon
} from '@heroicons/react/24/outline'
import { Worker } from '../../types'

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<Worker | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get profile data from localStorage (in real app, this would be an API call)
    const profileData = localStorage.getItem('userProfile')
    if (profileData) {
      setUserProfile(JSON.parse(profileData))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-12">
            <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-navy-900 mb-4">No Profile Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't created a worker profile yet. Create one to start receiving job opportunities.
            </p>
            <Link href="/create-profile" className="btn-primary">
              Create Your Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Worker Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile and track your job applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Preview Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Profile Header */}
              <div className="relative">
                <div className="bg-gradient-to-r from-primary-600 to-navy-800 h-32 rounded-t-xl"></div>
                <div className="absolute -bottom-12 left-6">
                  <img
                    src={userProfile.profilePicture}
                    alt={userProfile.fullName}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <Link 
                    href="/edit-profile"
                    className="bg-white/90 hover:bg-white text-navy-900 p-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-16 pb-8 px-6">
                {/* Basic Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-navy-900">{userProfile.fullName}</h2>
                    {userProfile.visaStatus === 'Available' && (
                      <CheckBadgeIcon className="h-6 w-6 text-green-500" title="Visa Available" />
                    )}
                  </div>
                  <p className="text-xl text-primary-600 font-semibold mb-2">{userProfile.jobTitle}</p>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{userProfile.city}, {userProfile.country}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{userProfile.yearsExperience} years experience</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-navy-900">{userProfile.yearsExperience}</div>
                    <div className="text-sm text-gray-600">Years Exp.</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-navy-900">{userProfile.expectedSalary}</div>
                    <div className="text-sm text-gray-600">AED/Month</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-navy-900">{userProfile.languagesSpoken.length}</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className={`text-2xl font-bold ${userProfile.availability ? 'text-green-600' : 'text-gray-400'}`}>
                      {userProfile.availability ? 'Active' : 'Inactive'}
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                    <LanguageIcon className="h-5 w-5" />
                    Languages Spoken
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.languagesSpoken.map((language) => (
                      <span 
                        key={language} 
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
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
                    <p className="text-gray-700 leading-relaxed">{userProfile.aboutMe}</p>
                  </div>
                )}

                {/* Visa Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Visa Status</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    userProfile.visaStatus === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userProfile.visaStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href="/edit-profile" 
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit Profile
                </Link>
                <Link 
                  href="/profile-preview" 
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <EyeIcon className="h-4 w-4" />
                  Preview Public Profile
                </Link>
                <Link 
                  href="/browse" 
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <BriefcaseIcon className="h-4 w-4" />
                  Browse Jobs
                </Link>
              </div>
            </div>

            {/* Profile Completeness */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Profile Completeness</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Information</span>
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
                  <span className="text-sm text-gray-600">Languages</span>
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">About Me</span>
                  {userProfile.aboutMe ? (
                    <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${userProfile.aboutMe ? 100 : 80}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {userProfile.aboutMe ? '100% Complete' : '80% Complete - Add About Me section'}
                </p>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-semibold text-navy-900">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employer Contacts</span>
                  <span className="font-semibold text-navy-900">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Applications</span>
                  <span className="font-semibold text-navy-900">8</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-xl border border-gold-200 p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-3">💡 Profile Tips</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Add a professional photo to increase profile views by 50%</li>
                <li>• Complete your "About Me" section to stand out</li>
                <li>• Update your availability status regularly</li>
                <li>• Add specific skills in your job description</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
