'use client'

import Link from 'next/link'
import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ChevronRightIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function JobOpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Job Opportunities in Gulf Region
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Explore thousands of job opportunities across UAE and Saudi Arabia. 
              From specific job roles to company listings - find your perfect career match.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Apply Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Start Your Job Search Today
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Create your profile once and apply to hundreds of companies across the Gulf region. 
              Get hired faster with our streamlined application process.
            </p>
            <Link 
              href="/create-profile"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-block"
            >
              Create Profile & Start Applying
            </Link>
          </div>
        </div>

        {/* Job Search Options */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Individual Jobs */}
          <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseIcon className="h-8 w-8 text-primary-600" />
              <h3 className="text-2xl font-bold text-navy-900">Browse by Specific Job</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Find opportunities for specific job roles across all cities. Perfect for targeted job searches.
            </p>

            <div className="space-y-3 mb-6">
              <Link href="/jobs/dubai/light-vehicle-driver" className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">Light Vehicle Driver Jobs</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">Available in all cities</span>
              </Link>
              
              <Link href="/jobs/riyadh/housemaid" className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">Housemaid Jobs</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">High demand across Gulf region</span>
              </Link>
              
              <Link href="/jobs/dubai/construction-laborer" className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">Construction Worker Jobs</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">Booming construction sector</span>
              </Link>
            </div>

            <Link 
              href="/jobs"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View All Job Types
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {/* Company Listings */}
          <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
              <h3 className="text-2xl font-bold text-navy-900">Browse by Company & City</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Explore job categories with complete company listings for each city. See all hiring companies at once.
            </p>

            <div className="space-y-3 mb-6">
              <Link href="/latest-jobs/dubai/driver" className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">Dubai Transport & Logistics</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">49 companies hiring</span>
              </Link>
              
              <Link href="/latest-jobs/riyadh/construction-workers" className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">Riyadh Construction Jobs</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">20 companies hiring</span>
              </Link>
              
              <Link href="/latest-jobs/abu-dhabi/technical-workers" className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">Abu Dhabi Technical Jobs</span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">16 companies hiring</span>
              </Link>
            </div>

            <Link 
              href="/latest-jobs"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View All Company Listings
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Countries Coverage */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <GlobeAltIcon className="h-8 w-8 text-primary-600" />
            <h3 className="text-2xl font-bold text-navy-900">Countries & Cities Covered</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-navy-900 mb-4">🇦🇪 United Arab Emirates</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/jobs/dubai/light-vehicle-driver" className="text-primary-600 hover:underline">Dubai Jobs</Link>
                <Link href="/jobs/abu-dhabi/housemaid" className="text-primary-600 hover:underline">Abu Dhabi Jobs</Link>
                <Link href="/jobs/sharjah/security-guard" className="text-primary-600 hover:underline">Sharjah Jobs</Link>
                <Link href="/jobs/ajman/construction-laborer" className="text-primary-600 hover:underline">Ajman Jobs</Link>
                <Link href="/jobs/ras-al-khaimah/factory-worker" className="text-primary-600 hover:underline">Ras Al Khaimah Jobs</Link>
                <Link href="/jobs/fujairah/cleaner" className="text-primary-600 hover:underline">Fujairah Jobs</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-navy-900 mb-4">🇸🇦 Saudi Arabia</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/jobs/riyadh/light-vehicle-driver" className="text-primary-600 hover:underline">Riyadh Jobs</Link>
                <Link href="/jobs/jeddah/housemaid" className="text-primary-600 hover:underline">Jeddah Jobs</Link>
                <Link href="/jobs/khobar/auto-mechanic" className="text-primary-600 hover:underline">Khobar Jobs</Link>
                <Link href="/jobs/dammam/factory-worker" className="text-primary-600 hover:underline">Dammam Jobs</Link>
                <Link href="/jobs/mecca/security-guard" className="text-primary-600 hover:underline">Mecca Jobs</Link>
                <Link href="/jobs/medina/construction-laborer" className="text-primary-600 hover:underline">Medina Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
