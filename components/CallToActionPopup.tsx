'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  XMarkIcon,
  BriefcaseIcon,
  UserIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface PopupProps {
  onClose?: () => void
}

export default function CallToActionPopup({ onClose }: PopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [detectedCountry, setDetectedCountry] = useState('UAE')
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const popupRef = useRef<HTMLDivElement>(null)

  // Check if popup should be shown on current page
  const shouldShowPopup = () => {
    const excludedPaths = [
      '/browse',
      '/create-profile',
      '/admin',
      '/dashboard',
      '/payment'
    ]
    
    // Check if current path starts with any excluded path
    return !excludedPaths.some(excludedPath => 
      pathname.startsWith(excludedPath)
    )
  }

  // Check if popup was dismissed in last 24 hours
  const wasRecentlyDismissed = () => {
    const dismissedTime = localStorage.getItem('mainCtaPopupDismissed')
    if (!dismissedTime) return false

    const dismissedDate = new Date(dismissedTime)
    const now = new Date()
    const hoursDiff = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60)

    return hoursDiff < 24
  }

  // Check if user is already logged in (don't show popup to logged in users)
  const isUserLoggedIn = () => {
    if (typeof window === 'undefined') return false

    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const isEmployerLoggedIn = localStorage.getItem('isEmployerLoggedIn')
    const isAdminLoggedIn = localStorage.getItem('adminAuth')
    const userProfile = localStorage.getItem('userProfile')

    return isLoggedIn === 'true' || isEmployerLoggedIn === 'true' || isAdminLoggedIn === 'true' || !!userProfile
  }

  // Detect user's country from IP
  const detectCountry = async () => {
    try {
      // Try timezone-based detection first (no fetch required)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      let country = 'UAE' // Default
      
      if (timezone.includes('Qatar') || timezone.includes('Doha')) country = 'Qatar'
      else if (timezone.includes('Riyadh') || timezone.includes('Saudi')) country = 'Saudi Arabia'
      else if (timezone.includes('Muscat') || timezone.includes('Oman')) country = 'Oman'
      else if (timezone.includes('Kuwait')) country = 'Kuwait'
      else if (timezone.includes('Bahrain') || timezone.includes('Manama')) country = 'Bahrain'
      else if (timezone.includes('Dubai') || timezone.includes('UAE')) country = 'UAE'
      
      setDetectedCountry(country)
      
      // Fallback to IP-based detection if needed
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          timeout: 3000,
          signal: AbortSignal.timeout(3000)
        })
        if (response.ok) {
          const data = await response.json()
          if (data.country_name) {
            // Map country names to our supported countries
            const countryMapping: Record<string, string> = {
              'United Arab Emirates': 'UAE',
              'Qatar': 'Qatar',
              'Saudi Arabia': 'Saudi Arabia',
              'Oman': 'Oman',
              'Kuwait': 'Kuwait',
              'Bahrain': 'Bahrain'
            }
            
            const mappedCountry = countryMapping[data.country_name] || country
            setDetectedCountry(mappedCountry)
          }
        }
      } catch (ipError) {
        // Silently fail IP detection, keep timezone-based detection
        console.log('IP detection failed, using timezone-based detection')
      }
      
    } catch (error) {
      console.log('Country detection failed, using default UAE')
      setDetectedCountry('UAE')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      // Mark as dismissed for 24 hours
      localStorage.setItem('mainCtaPopupDismissed', new Date().toISOString())
      onClose?.()
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleHireWorker = () => {
    // Track interaction (for analytics)
    console.log('CTA Popup: User clicked Hire Worker')

    handleClose()

    // Use window.location for same domain, or open in new tab
    if (window.location.hostname === 'gogethires.com' || window.location.hostname.includes('localhost')) {
      window.location.href = '/browse'
    } else {
      window.open('https://www.gogethires.com/browse', '_blank')
    }
  }

  const handleLookingForJob = () => {
    // Track interaction (for analytics)
    console.log('CTA Popup: User clicked Looking for Job')

    handleClose()

    // Use window.location for same domain, or open in new tab
    if (window.location.hostname === 'gogethires.com' || window.location.hostname.includes('localhost')) {
      window.location.href = '/create-profile'
    } else {
      window.open('https://www.gogethires.com/create-profile', '_blank')
    }
  }

  useEffect(() => {
    // Only show popup if on allowed page, not recently dismissed, and user not logged in
    if (!shouldShowPopup() || wasRecentlyDismissed() || isUserLoggedIn()) {
      return
    }

    // Detect country
    detectCountry()

    // Show popup after 5 seconds (delayed to avoid conflict with bottom popup)
    const timer = setTimeout(() => {
      // Double-check user isn't logged in before showing
      if (!isUserLoggedIn()) {
        setIsVisible(true)
        setTimeout(() => setIsAnimating(true), 50)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [pathname])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  if (!isVisible || !shouldShowPopup()) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
          isAnimating
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Header with animated icon */}
          <div className="text-center mb-8">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full animate-pulse opacity-75"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full animate-pulse opacity-50 animation-delay-150"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-blue-700 rounded-full w-full h-full flex items-center justify-center shadow-lg">
                <GlobeAltIcon className="h-10 w-10 text-white animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What are you looking for?
            </h2>
            <p className="text-gray-600">
              Choose your path to get started
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Hire Worker Button */}
            <button
              onClick={handleHireWorker}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <div className="bg-white bg-opacity-20 rounded-xl p-2 group-hover:bg-opacity-30 transition-all">
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">I want to hire a worker</div>
                <div className="text-sm text-primary-100">Find skilled professionals</div>
              </div>
            </button>

            {/* Looking for Job Button */}
            <button
              onClick={handleLookingForJob}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <div className="bg-white bg-opacity-20 rounded-xl p-2 group-hover:bg-opacity-30 transition-all">
                <UserIcon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">I am looking for a job</div>
                <div className="text-sm text-green-100">
                  {isLoading ? (
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-200 rounded-full animate-pulse"></div>
                      Detecting location...
                    </span>
                  ) : (
                    `in ${detectedCountry}`
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Trusted by 15,000+ workers across the Gulf
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-4 right-8">
          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-1/3 left-4">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  )
}
