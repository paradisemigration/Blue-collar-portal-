'use client'

import { useEffect } from 'react'

export default function SafeScriptManager() {
  useEffect(() => {
    // Completely disabled in development to prevent fetch conflicts
    if (process.env.NODE_ENV === 'development') {
      console.log('[Dev Mode] SafeScriptManager disabled to prevent fetch conflicts')
      return
    }

    // Only run in production
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
    }
  }, [])

  return null
}
