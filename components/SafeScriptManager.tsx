'use client'

import { useEffect } from 'react'

export default function SafeScriptManager() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Prevent FullStory and other analytics scripts from interfering in development
    const originalFetch = window.fetch
    window.fetch = function(...args) {
      const url = args[0]?.toString() || ''
      
      // Block known problematic domains in development
      const blockedDomains = [
        'fullstory.com',
        'edge.fullstory.com',
        'analytics.google.com',
        'googletagmanager.com',
        'facebook.com',
        'twitter.com'
      ]
      
      const isBlockedDomain = blockedDomains.some(domain => url.includes(domain))
      
      if (isBlockedDomain) {
        console.log(`[Dev Mode] Blocked fetch to: ${url}`)
        return Promise.reject(new Error(`Blocked in development: ${url}`))
      }
      
      return originalFetch.apply(this, args)
    }

    // Override window.addEventListener to catch and prevent analytics script errors
    const originalAddEventListener = window.addEventListener
    window.addEventListener = function(type, listener, options) {
      if (type === 'error' || type === 'unhandledrejection') {
        const wrappedListener = (event: any) => {
          // Check if error is from blocked analytics scripts
          const errorMessage = event.message || event.reason?.message || ''
          const isAnalyticsError = errorMessage.includes('fullstory') || 
                                 errorMessage.includes('Failed to fetch') ||
                                 errorMessage.includes('analytics')
          
          if (isAnalyticsError) {
            console.log('[Dev Mode] Suppressed analytics error:', errorMessage)
            event.preventDefault?.()
            return false
          }
          
          // Call original listener for legitimate errors
          if (typeof listener === 'function') {
            return listener(event)
          }
        }
        
        return originalAddEventListener.call(this, type, wrappedListener, options)
      }
      
      return originalAddEventListener.call(this, type, listener, options)
    }

    // Cleanup function
    return () => {
      window.fetch = originalFetch
      window.addEventListener = originalAddEventListener
    }
  }, [])

  return null
}
