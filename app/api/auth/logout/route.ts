import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value

    if (sessionToken) {
      // Delete session from database
      await db.deleteSession(sessionToken)
    }

    const response = NextResponse.json({ success: true })
    
    // Clear session cookie
    response.cookies.set('session_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // Expire immediately
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
