'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isEmployer, setIsEmployer] = useState(false)

  useEffect(() => {
    // Check if user is logged in as employer
    if (typeof window !== 'undefined') {
      const employerLoggedIn = localStorage.getItem('isEmployerLoggedIn')
      setIsEmployer(!!employerLoggedIn)
    }
  }, [])

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
              <BriefcaseIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
              <span className="text-lg sm:text-2xl font-bold text-navy-900">Go Get Hire</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isEmployer ? (
              <Link href="/employer-dashboard" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                <BriefcaseIcon className="h-5 w-5" />
                Dashboard
              </Link>
            ) : (
              <Link href="/admin-login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-sm">
                Admin
              </Link>
            )}
            <Link href="/login" className="btn-secondary text-sm">
              Login
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 px-3 pt-4 border-t border-gray-200 mt-4">
                {isEmployer ? (
                  <Link href="/employer-dashboard" className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-semibold py-2">
                    <BriefcaseIcon className="h-5 w-5" />
                    Employer Dashboard
                  </Link>
                ) : (
                  <Link href="/admin-login" className="text-gray-700 hover:text-primary-600 font-medium text-center py-2">
                    Admin Login
                  </Link>
                )}
                <Link href="/login" className="btn-secondary text-center">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-center">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
