import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.warn('Database not configured, skipping duplicate check')
      return NextResponse.json({
        exists: false,
        reason: 'database_not_configured'
      })
    }

    const body = await request.json()
    const { email, phone } = body

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone required for checking' },
        { status: 400 }
      )
    }

    let existingUser = null
    let duplicateField = null

    // Check by email first
    if (email) {
      existingUser = await db.getUserByEmail(email)
      if (existingUser) {
        duplicateField = 'email'
      }
    }

    // If no email duplicate found, check by phone
    if (!existingUser && phone) {
      try {
        existingUser = await db.getUserByPhone(phone)
        if (existingUser) {
          duplicateField = 'phone'
        }
      } catch (error) {
        console.warn('Phone check failed, continuing without phone validation:', error)
      }
    }

    if (existingUser) {
      // User exists, check if they have a worker profile
      let hasWorkerProfile = false
      try {
        const workerProfile = await db.getWorkerProfileByUserId(existingUser.id)
        hasWorkerProfile = !!workerProfile
      } catch (error) {
        console.warn('Failed to check worker profile:', error)
      }

      return NextResponse.json({
        exists: true,
        duplicateField,
        email: existingUser.email,
        fullName: existingUser.full_name,
        hasWorkerProfile,
        message: duplicateField === 'email' 
          ? 'An account with this email address already exists' 
          : 'An account with this phone number already exists'
      })
    }

    // No duplicate found
    return NextResponse.json({
      exists: false,
      message: 'No existing account found'
    })

  } catch (error) {
    console.error('Check existing user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
