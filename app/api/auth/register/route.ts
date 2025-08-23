import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import crypto from 'crypto'

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, fullName, userType, password } = body

    // Validate required fields
    if (!email || !fullName || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      )
    }

    // Hash password if provided
    const passwordHash = password ? hashPassword(password) : undefined

    // Create user
    const user = await db.createUser({
      email,
      phone: phone || '',
      fullName,
      userType: userType as 'worker' | 'employer',
      passwordHash
    })

    // Create session token
    const sessionToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    await db.createSession(user.id, sessionToken, expiresAt)

    // Return user data (without password hash)
    const { password_hash, ...userWithoutPassword } = user

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword
    })

    // Set session cookie
    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })

    return response

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
