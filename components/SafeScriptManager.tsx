'use client'

import { useEffect } from 'react'

export default function SafeScriptManager() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Simple error suppression without interfering with fetch
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || ''
      const filename = event.filename || ''

      // Only suppress specific analytics errors, not fetch errors
      const isAnalyticsScript = filename.includes('fullstory.com') ||
                               filename.includes('analytics') ||
                               filename.includes('gtag') ||
                               filename.includes('facebook.com')

      if (isAnalyticsScript) {
        console.log('[Dev Mode] Suppressed analytics script error:', errorMessage)
        event.preventDefault()
        return false
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || ''

      // Only suppress analytics-related promise rejections
      if (reason.includes('fullstory') && reason.includes('analytics')) {
        console.log('[Dev Mode] Suppressed analytics rejection:', reason)
        event.preventDefault()
        return false
      }
    }

    // Add error listeners without overriding fetch
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup function
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}
