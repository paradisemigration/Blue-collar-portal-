'use client'

import { useEffect } from 'react'

export default function SafeScriptManager() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Completely disable FullStory in development
    if (typeof window !== 'undefined') {
      // Block FullStory from initializing
      (window as any).FS = {
        identify: () => {},
        setUserVars: () => {},
        event: () => {},
        log: () => {},
        restart: () => {},
        shutdown: () => {},
        consent: () => {},
        clearUserCookie: () => {}
      }

      // Remove any existing FullStory scripts
      const scripts = document.querySelectorAll('script[src*="fullstory"]')
      scripts.forEach(script => script.remove())

      // Block FullStory domain completely
      const originalFetch = window.fetch
      window.fetch = function(...args) {
        const url = args[0]?.toString() || ''

        // Only block FullStory URLs specifically
        if (url.includes('fullstory.com') || url.includes('edge.fullstory.com') || url.includes('fs.com')) {
          console.log('[Dev Mode] Blocked FullStory request:', url)
          return Promise.resolve(new Response('{}', { status: 200 }))
        }

        // Allow all other requests to proceed normally
        try {
          return originalFetch.apply(this, args)
        } catch (error) {
          console.error('[Dev Mode] Fetch error:', error)
          throw error
        }
      }

      // Block script loading
      const originalAppendChild = document.head.appendChild
      document.head.appendChild = function(child: any) {
        if (child.tagName === 'SCRIPT' && child.src && child.src.includes('fullstory')) {
          console.log('[Dev Mode] Blocked FullStory script loading')
          return child
        }
        return originalAppendChild.call(this, child)
      }

      // Error suppression for any remaining FullStory references
      const handleError = (event: ErrorEvent) => {
        const errorMessage = event.message || ''
        const filename = event.filename || ''

        if (filename.includes('fullstory.com') || errorMessage.includes('FullStory')) {
          console.log('[Dev Mode] Suppressed FullStory error:', errorMessage)
          event.preventDefault()
          return false
        }
      }

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const reason = event.reason?.toString() || ''

        if (reason.includes('fullstory') || reason.includes('FullStory')) {
          console.log('[Dev Mode] Suppressed FullStory rejection:', reason)
          event.preventDefault()
          return false
        }
      }

      window.addEventListener('error', handleError)
      window.addEventListener('unhandledrejection', handleUnhandledRejection)

      // Cleanup function
      return () => {
        window.fetch = originalFetch
        document.head.appendChild = originalAppendChild
        window.removeEventListener('error', handleError)
        window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      }
    }
  }, [])

  return null
}
