'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bars3Icon, XMarkIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isEmployer, setIsEmployer] = useState(false)
  const [loadingLink, setLoadingLink] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in as employer
    if (typeof window !== 'undefined') {
      const employerLoggedIn = localStorage.getItem('isEmployerLoggedIn')
      setIsEmployer(!!employerLoggedIn)
    }
  }, [])

  const handleNavigation = (href: string) => {
    setLoadingLink(href)
    setMobileMenuOpen(false) // Close mobile menu immediately

    // Add small delay for smooth transition
    setTimeout(() => {
      router.push(href)
    }, 100)

    // Clear loading state after navigation
    setTimeout(() => {
      setLoadingLink(null)
    }, 1000)
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse Workers', href: '/browse' },
    { name: 'Add Profile', href: '/create-profile' },
    { name: 'Job Postings', href: '/jobs' },
    { name: 'Pricing', href: '/pricing' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-3 sm:py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F42d8a3c9ca784d9bab2cfaff5214870e%2Fae655e15f41d4e2a843beb5ac79ab8d2?format=webp&width=200"
                alt="Go Get Hire Logo"
                className="h-8 w-auto sm:h-10"
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isEmployer && (
              <Link href="/employer-dashboard" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                <BriefcaseIcon className="h-5 w-5" />
                Dashboard
              </Link>
            )}
            <Link href="/login" className="btn-secondary text-sm">
              Worker Login
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Sign Up
            </Link>
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

        {/* Enhanced Mobile Navigation */}
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
                  {isEmployer && (
                    <button
                      onClick={() => handleNavigation('/employer-dashboard')}
                      className="w-full flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 font-semibold py-3 rounded-xl transition-all duration-200"
                    >
                      <BriefcaseIcon className="h-5 w-5" />
                      Employer Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full btn-secondary text-center py-3 rounded-xl"
                  >
                    Worker Login
                  </button>

                  <button
                    onClick={() => handleNavigation('/register')}
                    className="w-full btn-primary text-center py-3 rounded-xl"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
