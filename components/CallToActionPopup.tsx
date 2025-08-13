'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  XMarkIcon,
  BriefcaseIcon,
  UserIcon
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
    // AGGRESSIVE CLEANUP: Clear all old popup states
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ctaPopupDismissed') // Remove old popup state
      localStorage.removeItem('bottomPopupDismissed') // Remove any other variants

      // For initial deployment, ignore dismissal for first 1 hour to ensure new popup shows
      const deploymentTime = new Date('2024-12-15').getTime() // Today's deployment
      if (Date.now() - deploymentTime < 60 * 60 * 1000) { // 1 hour
        localStorage.removeItem('mainCtaPopupDismissed')
        return false // Force show for initial deployment
      }
    }

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

  // Detect user's country from timezone (safe, no external requests)
  const detectCountry = () => {
    try {
      // Use timezone-based detection only (reliable and fast)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      let country = 'UAE' // Default

      if (timezone.includes('Qatar') || timezone.includes('Doha')) country = 'Qatar'
      else if (timezone.includes('Riyadh') || timezone.includes('Saudi')) country = 'Saudi Arabia'
      else if (timezone.includes('Muscat') || timezone.includes('Oman')) country = 'Oman'
      else if (timezone.includes('Kuwait')) country = 'Kuwait'
      else if (timezone.includes('Bahrain') || timezone.includes('Manama')) country = 'Bahrain'
      else if (timezone.includes('Dubai') || timezone.includes('UAE')) country = 'UAE'

      setDetectedCountry(country)
    } catch (error) {
      // If timezone detection fails, use default
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

    // Show popup after 3 seconds for faster user engagement
    const timer = setTimeout(() => {
      // Double-check user isn't logged in before showing
      if (!isUserLoggedIn()) {
        setIsVisible(true)
        setTimeout(() => setIsAnimating(true), 50)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [pathname])

  // Handle keyboard events and focus management
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

      // Focus the popup for accessibility
      setTimeout(() => {
        popupRef.current?.focus()
      }, 350) // After animation completes
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
      data-popup-type="new-worker-animation"
      data-popup-version="2.1"
    >
      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        tabIndex={-1}
        data-new-popup="worker-animation"
        data-deployment-date={new Date().toISOString().slice(0,10)}
        className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90vw] sm:max-w-lg mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 ${
          isAnimating
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Mobile Optimized */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all z-10 touch-manipulation"
          title="Close popup"
          aria-label="Close popup"
        >
          <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </button>

        {/* Version indicator for deployment verification */}
        <div className="absolute top-2 left-2 text-[10px] sm:text-xs text-gray-400 opacity-30 font-mono" title="Popup Version">
          v2.1
        </div>

        {/* Content - Mobile Optimized */}
        <div className="p-4 sm:p-6 lg:p-8 pt-8 sm:pt-12">
          {/* Header with animated worker character */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
              {/* Animated background circles */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-primary-600 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-1 sm:inset-2 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.3s' }}></div>

              {/* Main worker emoji with animation */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                  👷‍♂️
                </div>
              </div>

              {/* Floating work tools around the worker - Responsive sizes */}
              <div className="absolute -top-1 -left-1 text-sm sm:text-base lg:text-lg animate-float opacity-80" style={{ animationDelay: '0s' }}>
                🔨
              </div>
              <div className="absolute -top-1 sm:-top-2 -right-1 text-xs sm:text-sm animate-float opacity-80" style={{ animationDelay: '1s' }}>
                🔧
              </div>
              <div className="absolute -bottom-1 -left-1 sm:-left-2 text-xs sm:text-sm animate-float opacity-80" style={{ animationDelay: '0.5s' }}>
                ⚙️
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 -right-1 text-sm sm:text-base lg:text-lg animate-float opacity-80" style={{ animationDelay: '1.5s' }}>
                🛠️
              </div>
              <div className="absolute top-1 -right-2 sm:-right-3 text-xs animate-float opacity-80" style={{ animationDelay: '2s' }}>
                ⚡
              </div>
            </div>
            <h2 id="popup-title" className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
              What are you looking for?
            </h2>
            <p id="popup-description" className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
