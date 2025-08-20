'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userCredentials, setUserCredentials] = useState<any>(null)
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  })

  useEffect(() => {
    // Check if user has credentials from profile creation
    const credentials = localStorage.getItem('userCredentials')
    if (credentials) {
      setUserCredentials(JSON.parse(credentials))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate login verification
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check credentials
      if (userCredentials &&
          formData.loginId === userCredentials.loginId &&
          formData.password === userCredentials.tempPassword) {

        // Set authentication state
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('authProvider', 'login')

        // Dispatch auth state change event
        window.dispatchEvent(new Event('authStateChanged'))

        alert('Login successful! Welcome back!')
        window.location.href = '/dashboard'
      } else {
        alert('Invalid credentials. Please check your Login ID and password.')
      }
      
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

  const handleGoogleLogin = () => {
    alert('Google Login is currently being set up. Please use your email and password to login, or contact support for assistance.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      {/* Breadcrumbs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-600 flex items-center transition-colors">
              <BriefcaseIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Sign In</span>
          </nav>
        </div>
      </div>

      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 rounded-full">
            <BriefcaseIcon className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-navy-900">
          Welcome Back!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your worker account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border">
          
          {/* Credentials Info */}
          {userCredentials && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">📧 Your Login Credentials</h3>
              <p className="text-sm text-blue-800">
                <strong>Email:</strong> {userCredentials.email}<br/>
                <strong>Login ID:</strong> {userCredentials.loginId}<br/>
                <strong>Temp Password:</strong> {userCredentials.tempPassword}
              </p>
              <p className="text-xs text-blue-600 mt-2">
                These credentials were sent to your email. Change your password after first login.
              </p>
            </div>
          )}

          {/* Google Login Button */}
          <div className="mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center py-3 px-4 border-2 border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with credentials</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login ID */}
            <div>
              <label htmlFor="loginId" className="block text-sm font-semibold text-gray-800 mb-2">
                Login ID
              </label>
              <input
                id="loginId"
                name="loginId"
                type="text"
                required
                value={formData.loginId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                placeholder="Enter your Login ID"
              />
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
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
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
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/create-profile" className="font-medium text-primary-600 hover:text-primary-500">
                Create your worker profile
              </Link>
            </p>
          </div>

          {/* Help */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">💡 Need Help?</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Your Login ID and password were sent to your email after profile creation</li>
              <li>• Use Google login for faster access</li>
              <li>• Contact support if you can't access your account</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
