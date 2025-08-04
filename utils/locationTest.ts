// Simple location detection test utility
export const testLocationDetection = async (): Promise<void> => {
  console.log('🔍 Testing location detection...')
  
  try {
    // Test 1: API call
    console.log('Test 1: IP-based location detection')
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    })
    
    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      console.log('✅ API location data:', data)
    } else {
      console.log('❌ API response not OK:', response.status)
    }
  } catch (error) {
    console.log('❌ API location detection failed:', error)
  }

  try {
    // Test 2: Browser timezone
    console.log('Test 2: Browser timezone detection')
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    console.log('✅ Browser timezone:', timezone)
  } catch (error) {
    console.log('❌ Timezone detection failed:', error)
  }

  console.log('🏁 Location detection tests completed')
}

// Auto-run in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run test after a delay to avoid conflicts
  setTimeout(testLocationDetection, 2000)
}
