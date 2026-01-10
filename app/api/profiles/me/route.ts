import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Helper function to get user from session
async function getUserFromSession(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken) return null
  
  const sessionData = await db.getSession(sessionToken)
  return sessionData || null
}

// GET - Get current user's profile
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    let profile = null

    if (user.user_type === 'worker') {
      profile = await db.getWorkerProfileByUserId(user.id)
    }
    // Add employer profile logic here when needed

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Format profile for frontend
    const formattedProfile = {
      id: profile.id,
      fullName: profile.full_name,
      email: profile.email,
      phoneNumber: profile.phone,
      profilePicture: profile.profile_picture_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      jobTitle: profile.job_title,
      yearsExperience: profile.years_experience,
      city: profile.city,
      country: profile.country,
      expectedSalary: profile.expected_salary,
      visaStatus: profile.visa_status,
      languagesSpoken: profile.languages_spoken || [],
      aboutMe: profile.about_me,
      availability: profile.availability || false,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at
    }

    return NextResponse.json({
      success: true,
      profile: formattedProfile
    })

  } catch (error) {
    console.error('Get user profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const updates = { ...body }

    // Remove fields that shouldn't be updated directly
    delete updates.id
    delete updates.user_id
    delete updates.created_at

    // Update profile
    const updatedProfile = await db.updateWorkerProfile(user.id, updates)

    if (!updatedProfile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfile
    })

  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
