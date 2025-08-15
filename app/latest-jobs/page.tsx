'use client'

import Link from 'next/link'
import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { UAE_CITIES, JOB_CATEGORIES_URL_MAP } from '../../utils/companiesData'

export default function JobCategoriesPage() {
  // Convert cities to URL-friendly format
  const cityUrls = UAE_CITIES.map(city => ({
    name: city,
    slug: city.toLowerCase().replace(/\s+/g, '-')
  }))

  // Convert categories to display format  
  const categories = Object.entries(JOB_CATEGORIES_URL_MAP).map(([display, slug]) => ({
    name: display,
    slug: slug
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Job Openings in UAE
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Find job opportunities across all major cities and industries in the UAE. 
              Apply directly to top companies and start your career today.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{UAE_CITIES.length}</div>
                <div className="text-gray-200 text-sm">Cities Covered</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">{categories.length}</div>
                <div className="text-gray-200 text-sm">Job Categories</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">500+</div>
                <div className="text-gray-200 text-sm">Companies</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-gold-400">Free</div>
                <div className="text-gray-200 text-sm">Application</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900">Latest Jobs</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Apply Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Apply to Multiple Companies at Once
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Create your profile once and apply to hundreds of companies across the UAE. 
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

        {/* Job Categories by City */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Job Categories */}
          <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseIcon className="h-8 w-8 text-primary-600" />
              <h3 className="text-2xl font-bold text-navy-900">Browse by Job Category</h3>
            </div>
            
            <div className="grid gap-3">
              {categories.map((category) => (
                <div key={category.slug} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-semibold text-navy-900 mb-2">{category.name}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cityUrls.slice(0, 4).map((city) => (
                      <Link
                        key={`${category.slug}-${city.slug}`}
                        href={`/latest-jobs/${city.slug}/${category.slug}`}
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {city.name} Jobs
                      </Link>
                    ))}
                  </div>
                  {cityUrls.length > 4 && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2">
                        {cityUrls.slice(4).map((city) => (
                          <Link
                            key={`${category.slug}-${city.slug}`}
                            href={`/latest-jobs/${city.slug}/${category.slug}`}
                            className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {city.name} Jobs
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPinIcon className="h-8 w-8 text-primary-600" />
              <h3 className="text-2xl font-bold text-navy-900">Browse by City</h3>
            </div>
            
            <div className="grid gap-4">
              {cityUrls.map((city) => (
                <div key={city.slug} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-navy-900">{city.name}</h4>
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map((category) => (
                      <Link
                        key={`${city.slug}-${category.slug}`}
                        href={`/latest-jobs/${city.slug}/${category.slug}`}
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {category.name.split(' ')[0]} Jobs
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <Link 
                      href={`/latest-jobs/${city.slug}/driver`}
                      className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      View All {city.name} Jobs
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Job Categories */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mt-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
            Most Popular Job Categories in UAE
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-4xl mb-3">🚗</div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Driver Jobs</h4>
              <p className="text-gray-700 text-sm mb-4">
                High demand for professional drivers across all UAE cities
              </p>
              <div className="space-y-1">
                <Link href="/latest-jobs/dubai/driver" className="block text-sm text-primary-600 hover:underline">Dubai Driver Jobs</Link>
                <Link href="/latest-jobs/abu-dhabi/driver" className="block text-sm text-primary-600 hover:underline">Abu Dhabi Driver Jobs</Link>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-4xl mb-3">🏗️</div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Construction Jobs</h4>
              <p className="text-gray-700 text-sm mb-4">
                Booming construction sector with excellent opportunities
              </p>
              <div className="space-y-1">
                <Link href="/latest-jobs/dubai/construction-workers" className="block text-sm text-primary-600 hover:underline">Dubai Construction Jobs</Link>
                <Link href="/latest-jobs/sharjah/construction-workers" className="block text-sm text-primary-600 hover:underline">Sharjah Construction Jobs</Link>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-4xl mb-3">🏠</div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Domestic Jobs</h4>
              <p className="text-gray-700 text-sm mb-4">
                Family-oriented positions with competitive benefits
              </p>
              <div className="space-y-1">
                <Link href="/latest-jobs/dubai/domestic-workers" className="block text-sm text-primary-600 hover:underline">Dubai Domestic Jobs</Link>
                <Link href="/latest-jobs/abu-dhabi/domestic-workers" className="block text-sm text-primary-600 hover:underline">Abu Dhabi Domestic Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
