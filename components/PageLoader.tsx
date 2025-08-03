'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-2xl">GGH</span>
            </div>
            <div className="absolute -inset-2">
              <div className="w-24 h-24 border-4 border-primary-200 rounded-2xl animate-spin border-t-primary-600"></div>
            </div>
          </div>
        </div>

        {/* Loading Text with Animation */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-navy-900 animate-fade-in">
            Go Get Hire
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-gray-600 ml-2">Loading...</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-600 to-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: '100%',
                animation: 'loadProgress 0.8s ease-out'
              }}
            ></div>
          </div>
        </div>

        {/* Motivational Text */}
        <p className="mt-6 text-gray-500 text-sm animate-fade-in">
          🚀 Connecting you with opportunities...
        </p>
      </div>

      <style jsx>{`
        @keyframes loadProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
