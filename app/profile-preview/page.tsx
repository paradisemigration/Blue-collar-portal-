'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  MapPinIcon, 
  StarIcon, 
  CheckBadgeIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { Worker } from '../../types'

export default function ProfilePreview() {
  const [userProfile, setUserProfile] = useState<Worker | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
            <h2 className="text-2xl font-bold text-navy-900 mb-4">No Profile Found</h2>
            <p className="text-gray-600 mb-6">Please create a profile first to see the preview.</p>
            <Link href="/create-profile" className="btn-primary">
              Create Profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            Employer View
          </div>
        </div>

        {/* Profile Card - As seen by employers */}
        <div className="bg-white rounded-xl shadow-lg border">
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
            {/* Verified Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <CheckBadgeIcon className="h-4 w-4" />
                Verified
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-6">
            {/* Basic Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-navy-900">{userProfile.fullName}</h1>
                {userProfile.availability && (
                  <CheckBadgeIcon className="h-6 w-6 text-green-500" title="Visa Available" />
                )}
              </div>
              <p className="text-xl text-primary-600 font-semibold mb-3">{userProfile.jobTitle}</p>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{userProfile.city}, {userProfile.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{userProfile.yearsExperience} years experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>AED {userProfile.expectedSalary.toLocaleString()}/month</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-navy-900">{userProfile.yearsExperience}</div>
                <div className="text-sm text-gray-600">Years Experience</div>
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
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-4 w-4 ${i < 4 ? 'text-gold-500 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">4.0 Rating</div>
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
                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
                  {userProfile.aboutMe}
                </p>
              </div>
            )}

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Visa Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-navy-900 mb-2">Visa Status</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  userProfile.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {userProfile.visaStatus}
                </span>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-navy-900 mb-2">Availability</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  userProfile.availability
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {userProfile.availability ? 'Available for Work' : 'Not Available'}
                </span>
              </div>
            </div>

            {/* Contact Section - Locked for non-subscribers */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <LockClosedIcon className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Contact Information</h3>
              <p className="text-gray-600 mb-4">
                Subscribe to unlock contact details and connect with this worker directly
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Unlock Contact Details
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors">
                  Save to Shortlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Improvement */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-navy-900 mb-4">💡 Tips to Improve Your Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckBadgeIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Professional Photo</p>
                <p className="text-sm text-gray-600">You have a great profile picture!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckBadgeIcon className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Complete Information</p>
                <p className="text-sm text-gray-600">All required fields are filled</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              {userProfile.aboutMe ? (
                <CheckBadgeIcon className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-orange-400 mt-0.5"></div>
              )}
              <div>
                <p className="font-medium text-gray-900">About Me Section</p>
                <p className="text-sm text-gray-600">
                  {userProfile.aboutMe ? 'Well written description' : 'Add a compelling about me section'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-orange-400 mt-0.5"></div>
              <div>
                <p className="font-medium text-gray-900">Get Reviews</p>
                <p className="text-sm text-gray-600">Work with employers to build your rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/edit-profile" className="btn-primary">
            Edit Profile
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
