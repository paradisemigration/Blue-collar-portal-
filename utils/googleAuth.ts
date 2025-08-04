// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'

interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

export class GoogleAuthService {
  private static instance: GoogleAuthService
  private isInitialized = false
  private gapi: any = null

  private constructor() {}

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService()
    }
    return GoogleAuthService.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Load Google API
      await this.loadGoogleAPI()
      
      // Initialize Google Auth
      await this.initializeGoogleAuth()
      
      this.isInitialized = true
    } catch (error) {
      console.error('Google Auth initialization failed:', error)
      throw error
    }
  }

  private loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window not available'))
        return
      }

      // Check if already loaded
      if ((window as any).gapi) {
        this.gapi = (window as any).gapi
        resolve()
        return
      }

      // Create script tag
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.async = true
      script.defer = true

      script.onload = () => {
        this.gapi = (window as any).gapi
        resolve()
      }

      script.onerror = () => {
        reject(new Error('Failed to load Google API'))
      }

      document.head.appendChild(script)
    })
  }

  private initializeGoogleAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.gapi.load('auth2', () => {
        this.gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile'
        }).then(() => {
          resolve()
        }).catch((error: any) => {
          reject(error)
        })
      })
    })
  }

  async signIn(): Promise<GoogleUser> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      const authInstance = this.gapi.auth2.getAuthInstance()
      const googleUser = await authInstance.signIn()
      
      const profile = googleUser.getBasicProfile()
      const user: GoogleUser = {
        id: profile.getId(),
        email: profile.getEmail(),
        name: profile.getName(),
        picture: profile.getImageUrl(),
        given_name: profile.getGivenName(),
        family_name: profile.getFamilyName()
      }

      // Store user session
      localStorage.setItem('googleUser', JSON.stringify(user))
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('authProvider', 'google')

      return user
    } catch (error) {
      console.error('Google sign-in failed:', error)
      throw error
    }
  }

  async signOut(): Promise<void> {
    try {
      if (this.isInitialized) {
        const authInstance = this.gapi.auth2.getAuthInstance()
        await authInstance.signOut()
      }

      // Clear local storage
      localStorage.removeItem('googleUser')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('authProvider')
    } catch (error) {
      console.error('Google sign-out failed:', error)
      throw error
    }
  }

  getCurrentUser(): GoogleUser | null {
    try {
      const userStr = localStorage.getItem('googleUser')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  isSignedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'
  }
}

// Utility functions for easy use
export const googleAuth = GoogleAuthService.getInstance()

export const signInWithGoogle = () => googleAuth.signIn()
export const signOutFromGoogle = () => googleAuth.signOut()
export const getCurrentGoogleUser = () => googleAuth.getCurrentUser()
export const isGoogleSignedIn = () => googleAuth.isSignedIn()

// Initialize Google Auth on import (client-side only)
// Disabled to prevent build issues - initialize manually when needed
// if (typeof window !== 'undefined') {
//   googleAuth.initialize().catch(console.error)
// }
