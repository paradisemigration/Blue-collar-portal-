'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bars3Icon,
  XMarkIcon,
  BriefcaseIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface UserProfile {
  fullName: string
  email: string
  jobTitle: string
}

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEmployer, setIsEmployer] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loadingLink, setLoadingLink] = useState<string | null>(null)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)

  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        const employerLoggedIn = localStorage.getItem('isEmployerLoggedIn')
        const userLoggedIn = localStorage.getItem('isLoggedIn')
        const adminLoggedIn = localStorage.getItem('adminAuth')
        const profileData = localStorage.getItem('userProfile')

        setIsEmployer(employerLoggedIn === 'true')
        setIsLoggedIn(userLoggedIn === 'true')
        setIsAdmin(adminLoggedIn === 'true')

        if (profileData) {
          try {
            const profile = JSON.parse(profileData)
            setUserProfile(profile)
          } catch (error) {
            console.error('Error parsing user profile:', error)
            setUserProfile(null)
          }
        } else {
          setUserProfile(null)
        }
      }
    }

    // Initial check
    checkAuthStatus()

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuthStatus()
    }

    window.addEventListener('storage', handleStorageChange)

    // Listen for custom auth state changes
    const handleAuthChange = () => {
      setTimeout(checkAuthStatus, 100)
    }

    window.addEventListener('authStateChanged', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authStateChanged', handleAuthChange)
    }
  }, [])

  const handleNavigation = (href: string) => {
    setLoadingLink(href)
    setMobileMenuOpen(false)

    setTimeout(() => {
      router.push(href)
    }, 100)

    setTimeout(() => {
      setLoadingLink(null)
    }, 1000)
  }

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('isEmployerLoggedIn')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('authProvider')
    localStorage.removeItem('googleUser')
    localStorage.removeItem('ctaPopupDismissed')

    // Reset state
    setIsLoggedIn(false)
    setIsEmployer(false)
    setIsAdmin(false)
    setUserProfile(null)
    setMobileMenuOpen(false)

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authStateChanged'))

    // Redirect to home
    router.push('/')
  }

  // Different navigation for logged in vs logged out users
  const getNavigation = () => {
    if (isLoggedIn || isEmployer || isAdmin) {
      return [
        { name: 'Home', href: '/' },
        { name: 'Find Workers', href: '/browse' },
        { name: 'Job Postings', href: '/jobs' }
      ]
    }

    return [
      { name: 'Home', href: '/' },
      { name: 'Find Workers', href: '/browse' },
      { name: 'Latest Jobs', href: '/latest-jobs' },
      { name: 'Add Profile', href: '/create-profile' },
      { name: 'Job Postings', href: '/jobs' },
      { name: 'Pricing', href: '/pricing' }
    ]
  }

  const navigation = getNavigation()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-3 sm:py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2F7dfeb24366b045dfa6f9c1b8aebdc773?format=webp&width=800"
                alt="Go Get Hires Now Logo"
                className="h-10 w-auto sm:h-12 md:h-14"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-2"
                disabled={loadingLink === item.href}
              >
                {loadingLink === item.href && (
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                {item.name}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn || isEmployer || isAdmin ? (
              // Logged in menu
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    Admin Dashboard
                  </Link>
                )}

                {isEmployer && (
                  <Link
                    href="/employer-dashboard"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    <BriefcaseIcon className="h-5 w-5" />
                    Dashboard
                  </Link>
                )}

                {isLoggedIn && userProfile && (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    <UserIcon className="h-5 w-5" />
                    My Profile
                  </Link>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm">
                    Hi, {isAdmin ? 'Admin' : userProfile?.fullName || 'User'}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              // Not logged in menu with dropdown
              <>
                {/* Login Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowLoginDropdown(true)}
                  onMouseLeave={() => setShowLoginDropdown(false)}
                >
                  <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                    Login
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {showLoginDropdown && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Worker Login
                      </Link>
                      <Link
                        href="/employer-login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Employer Login
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                {/* Profile CTA Button */}
                <Link
                  href="/create-profile"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <UserIcon className="h-5 w-5" />
                  Create Profile
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="bg-white border-t border-gray-200 shadow-lg rounded-b-2xl mx-4 mb-4">
              <div className="p-4 space-y-3">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium rounded-xl transition-all duration-200 flex items-center gap-3"
                    disabled={loadingLink === item.href}
                  >
                    {loadingLink === item.href && (
                      <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {item.name}
                  </button>
                ))}

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  {isLoggedIn || isEmployer || isAdmin ? (
                    // Logged in mobile menu
                    <>
                      {userProfile && !isAdmin && (
                        <div className="px-4 py-2 bg-gray-50 rounded-xl">
                          <p className="text-sm font-medium text-gray-900">
                            {userProfile.fullName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {userProfile.jobTitle}
                          </p>
                        </div>
                      )}

                      {isAdmin && (
                        <div className="px-4 py-2 bg-purple-50 rounded-xl">
                          <p className="text-sm font-medium text-purple-900">
                            Administrator
                          </p>
                          <p className="text-xs text-purple-600">
                            Admin Panel Access
                          </p>
                        </div>
                      )}

                      {isAdmin && (
                        <button
                          onClick={() => handleNavigation('/admin')}
                          className="w-full flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                        >
                          <Cog6ToothIcon className="h-5 w-5" />
                          Admin Dashboard
                        </button>
                      )}

                      {isEmployer && (
                        <button
                          onClick={() => handleNavigation('/employer-dashboard')}
                          className="w-full flex items-center gap-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                        >
                          <BriefcaseIcon className="h-5 w-5" />
                          Dashboard
                        </button>
                      )}

                      {isLoggedIn && (
                        <button
                          onClick={() => handleNavigation('/dashboard')}
                          className="w-full flex items-center gap-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                        >
                          <UserIcon className="h-5 w-5" />
                          My Profile
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Logout
                      </button>
                    </>
                  ) : (
                    // Not logged in mobile menu
                    <>
                      <button
                        onClick={() => handleNavigation('/login')}
                        className="w-full btn-secondary text-center py-3 rounded-xl"
                      >
                        Worker Login
                      </button>

                      <button
                        onClick={() => handleNavigation('/employer-login')}
                        className="w-full btn-secondary text-center py-3 rounded-xl"
                      >
                        Employer Login
                      </button>

                      <button
                        onClick={() => handleNavigation('/register')}
                        className="w-full btn-primary text-center py-3 rounded-xl"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
