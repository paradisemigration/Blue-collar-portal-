'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, SparklesIcon, ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function BottomCTAPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Don't show on create-profile page itself
    if (typeof window !== 'undefined' && window.location.pathname === '/create-profile') {
      setIsDismissed(true)
      return
    }

    // Check if user is already logged in or has profile
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const isEmployerLoggedIn = localStorage.getItem('isEmployerLoggedIn')
    const userProfile = localStorage.getItem('userProfile')

    if (isLoggedIn || isEmployerLoggedIn || userProfile) {
      setIsDismissed(true)
      return
    }

    // Check if user has dismissed the popup
    const dismissed = localStorage.getItem('ctaPopupDismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('ctaPopupDismissed', 'true')
  }

  const handleRemindLater = () => {
    setIsVisible(false)
    // Show again after 30 minutes
    setTimeout(() => {
      const dismissed = localStorage.getItem('ctaPopupDismissed')
      if (!dismissed) {
        setIsVisible(true)
      }
    }, 30 * 60 * 1000)
  }

  if (!isVisible || isDismissed) return null

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden" onClick={handleRemindLater}></div>
      
      {/* Popup */}
      <div className={`
        fixed bottom-4 right-4 md:bottom-6 md:right-6 w-72 md:w-80
        bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
        text-white rounded-xl shadow-2xl z-50 transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-95 opacity-0'}
      `}>
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors p-1"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>

        <div className="p-4">
          {/* Content */}
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg mb-3 mx-auto">
              <SparklesIcon className="h-4 w-4" />
            </div>

            <h3 className="text-base font-bold mb-1">
              Create Your Profile
            </h3>
            <p className="text-white/90 text-sm mb-3">
              Get Job in 7 Days! ⚡
            </p>

            {/* Buttons */}
            <div className="space-y-2">
              <Link
                href="/create-profile"
                className="block w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-3 rounded-lg text-sm transition-colors text-center"
                onClick={handleDismiss}
              >
                Create Profile Now
              </Link>
              <button
                onClick={handleRemindLater}
                className="w-full bg-white/20 hover:bg-white/30 font-medium py-2 px-3 rounded-lg text-sm transition-colors"
              >
                Remind Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
