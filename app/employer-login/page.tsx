'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, BuildingOfficeIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function EmployerLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check if employer credentials exist
      const employerData = localStorage.getItem('employerData')
      if (employerData) {
        const employer = JSON.parse(employerData)
        if (formData.email === employer.email) {
          localStorage.setItem('isEmployerLoggedIn', 'true')
          // Dispatch auth state change event
          window.dispatchEvent(new Event('authStateChanged'))
          window.location.href = '/employer-dashboard'
          return
        }
      }
      
      alert('Invalid credentials. Please check your email and password or contact support for assistance.')
      
    } catch (error) {
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-xl">
            <BuildingOfficeIcon className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-navy-900">
          Employer Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your employer dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border">
          
          {/* Support Info */}
          <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900 mb-2">💼 New Employer?</h3>
            <p className="text-sm text-purple-800">
              Contact our team to set up your business account and start hiring verified workers.
            </p>
            <p className="text-xs text-purple-600 mt-2">
              Existing users can login with credentials received during account setup.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                  placeholder="Enter your email address"
                />
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need an employer account?{' '}
              <Link href="/pricing" className="font-medium text-purple-600 hover:text-purple-500">
                View our pricing plans
              </Link>
            </p>
          </div>

          {/* Help */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">💡 Login Help</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Your login credentials were sent to your email after purchasing a plan</li>
              <li>• Check your spam folder if you can't find the email</li>
              <li>• Contact support if you need to reset your password</li>
              <li>• Register for a new account if you don't have one yet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
