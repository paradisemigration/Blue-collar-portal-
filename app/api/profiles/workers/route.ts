import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Helper function to get user from session
async function getUserFromSession(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value
  if (!sessionToken) return null
  
  const sessionData = await db.getSession(sessionToken)
  return sessionData || null
}

// GET - Get all worker profiles (for browse page)
export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.warn('Database not configured, returning empty profiles')
      return NextResponse.json({
        success: true,
        profiles: [],
        message: 'Database not configured'
      })
    }

    const profiles = await db.getAllWorkerProfiles()

    // Format profiles for frontend
    const formattedProfiles = profiles.map(profile => ({
      id: profile.id,
      fullName: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      profilePicture: profile.profile_picture_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      jobCategory: profile.job_category,
      jobTitle: profile.job_title,
      customJobTitle: profile.custom_job_title,
      jobProfile: profile.job_profile,
      yearsExperience: profile.years_experience,
      city: profile.city,
      country: profile.country,
      expectedSalary: profile.expected_salary,
      visaStatus: profile.visa_status,
      languagesSpoken: profile.languages_spoken || [],
      aboutMe: profile.about_me,
      availability: profile.availability,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at
    }))

    return NextResponse.json({
      success: true,
      profiles: formattedProfiles
    })

  } catch (error) {
    console.error('Get profiles error:', error)

    // Return a graceful response instead of 500 error
    // This allows the frontend to fall back to sample data
    return NextResponse.json({
      success: false,
      profiles: [],
      error: 'Database temporarily unavailable',
      fallback: true
    }, { status: 200 }) // Return 200 so frontend can handle gracefully
  }
}

// POST - Create worker profile
export async function POST(request: NextRequest) {
  try {
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.warn('Database not configured, profile creation will fail gracefully')
      return NextResponse.json(
        {
          error: 'Database not configured',
          fallback: true,
          message: 'Profile will be saved locally instead'
        },
        { status: 503 }
      )
    }

    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      jobCategory,
      jobTitle,
      customJobTitle,
      jobProfile,
      yearsExperience,
      city,
      country,
      expectedSalary,
      visaStatus,
      languagesSpoken,
      aboutMe,
      profilePictureUrl
    } = body

    // Validate required fields
    if (!jobCategory || !jobTitle || !yearsExperience || !city || !country || !expectedSalary || !visaStatus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already has a worker profile
    const existingProfile = await db.getWorkerProfileByUserId(user.id)
    if (existingProfile) {
      return NextResponse.json(
        { error: 'Worker profile already exists for this user' },
        { status: 409 }
      )
    }

    // Create worker profile
    const profile = await db.createWorkerProfile({
      userId: user.id,
      jobCategory,
      jobTitle,
      customJobTitle,
      jobProfile,
      yearsExperience: parseInt(yearsExperience),
      city,
      country,
      expectedSalary: parseInt(expectedSalary),
      visaStatus,
      languagesSpoken: languagesSpoken || [],
      aboutMe,
      profilePictureUrl
    })

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Create profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
