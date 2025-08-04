'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, SparklesIcon, ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function BottomCTAPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
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
        fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-sm
        bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
        text-white rounded-2xl shadow-2xl z-50 transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-95 opacity-0'}
      `}>
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-1"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <div className="p-5 pb-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto md:mx-0">
            <SparklesIcon className="h-6 w-6" />
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-1">
              Create Your Profile
            </h3>
            <p className="text-white/90 text-sm mb-1">
              Get Job in 7 Days! ⚡
            </p>
            <p className="text-white/80 text-xs mb-4">
              Join 15,000+ workers who found jobs quickly
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link 
                href="/create-profile"
                className="flex-1 bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors text-center"
                onClick={handleDismiss}
              >
                Create Profile Now
              </Link>
              <button
                onClick={handleRemindLater}
                className="flex-1 bg-white/20 hover:bg-white/30 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
              >
                Remind Later
              </button>
            </div>
          </div>

          {/* Timer Animation */}
          <div className="flex items-center justify-center mt-3 text-xs text-white/70">
            <ClockIcon className="h-3 w-3 mr-1" />
            <span>Limited time offer</span>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 opacity-75 animate-pulse"></div>
          <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        </div>
        
        {/* Content wrapper to stay above animated border */}
        <div className="relative z-10">
          <div className="p-5 pb-4">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 mx-auto md:mx-0">
              <SparklesIcon className="h-6 w-6" />
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-1">
                Create Your Profile
              </h3>
              <p className="text-white/90 text-sm mb-1">
                Get Job in 7 Days! ⚡
              </p>
              <p className="text-white/80 text-xs mb-4">
                Join 15,000+ workers who found jobs quickly
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Link 
                  href="/create-profile"
                  className="flex-1 bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors text-center"
                  onClick={handleDismiss}
                >
                  Create Profile Now
                </Link>
                <button
                  onClick={handleRemindLater}
                  className="flex-1 bg-white/20 hover:bg-white/30 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                >
                  Remind Later
                </button>
              </div>
            </div>

            {/* Timer Animation */}
            <div className="flex items-center justify-center mt-3 text-xs text-white/70">
              <ClockIcon className="h-3 w-3 mr-1" />
              <span>Limited time offer</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
