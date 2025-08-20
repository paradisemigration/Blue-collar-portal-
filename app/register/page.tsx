'use client'

import { useRouter } from 'next/navigation'
import { UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()

  const handleWorkerSignup = () => {
    router.push('/create-profile')
  }

  const handleEmployerSignup = () => {
    router.push('/pricing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Breadcrumbs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600 flex items-center transition-colors">
              <UserIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Join Now</span>
          </nav>
        </div>
      </div>

      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 rounded-2xl shadow-xl">
              <span className="text-white font-bold text-2xl">GGH</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">
            Join Go Get Hires Now
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your account type to get started with the Gulf region's leading blue-collar hiring platform
          </p>
        </div>

        {/* Sign Up Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Worker Option */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <UserIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">I'm a Worker</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create your professional profile and get hired by top employers across the Gulf region
              </p>
              
              {/* Benefits */}
              <div className="text-left mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Get hired in 7 working days</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">100% free profile creation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Verified employer connections</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Direct job opportunities</span>
                </div>
              </div>

              <button
                onClick={handleWorkerSignup}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Create Worker Profile
              </button>
              
              <p className="text-xs text-gray-500 mt-4">
                💼 Join 10,000+ skilled workers already hired
              </p>
            </div>
          </div>

          {/* Employer Option */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BuildingOfficeIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">I'm an Employer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access thousands of verified workers and streamline your hiring process with our premium platform
              </p>
              
              {/* Benefits */}
              <div className="text-left mb-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Browse verified worker profiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Advanced search and filters</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Direct worker contact access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Dedicated account support</span>
                </div>
              </div>

              <button
                onClick={handleEmployerSignup}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Pricing Plans
              </button>
              
              <p className="text-xs text-gray-500 mt-4">
                🏢 Trusted by 2,500+ companies across Gulf
              </p>
            </div>
          </div>
        </div>

        {/* Employer Login Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-navy-900 mb-3">Already an Employer?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Access your dashboard with the login credentials sent to your email
            </p>
            <Link 
              href="/employer-login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <BuildingOfficeIcon className="h-5 w-5" />
              Employer Login
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-primary-600 hover:underline font-medium">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary-600 hover:underline font-medium">Privacy Policy</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
