import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Simple admin authentication - in production, use proper role-based auth
function isAdmin(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token')
  return adminToken === 'admin-secret-token' // Replace with proper admin authentication
}

// GET - Get all users for admin dashboard
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    // Get all worker profiles with user data
    const profiles = await db.getAllWorkerProfiles()
    
    // Format for admin dashboard
    const formattedUsers = profiles.map(profile => ({
      id: profile.user_id,
      profileId: profile.id,
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
    }))

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      totalCount: formattedUsers.length
    })

  } catch (error) {
    console.error('Admin get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create user from admin (for testing/import)
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { 
      fullName, 
      email, 
      phone,
      profileData 
    } = body

    // Create user
    const user = await db.createUser({
      email,
      phone: phone || '',
      fullName,
      userType: 'worker'
    })

    // Create worker profile if profileData provided
    if (profileData) {
      await db.createWorkerProfile({
        userId: user.id,
        ...profileData
      })
    }

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Admin create user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
