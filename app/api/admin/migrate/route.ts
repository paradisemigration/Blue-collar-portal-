import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Simple admin authentication
function isAdmin(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token')
  return adminToken === 'admin-secret-token'
}

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
    const { profiles } = body

    if (!profiles || !Array.isArray(profiles)) {
      return NextResponse.json(
        { error: 'Invalid profiles data' },
        { status: 400 }
      )
    }

    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[]
    }

    console.log(`🔄 Starting migration of ${profiles.length} profiles...`)

    for (const profile of profiles) {
      try {
        // Extract user data
        const userData = {
          email: profile.email,
          phone: profile.phoneNumber || profile.phone || '',
          fullName: profile.fullName,
          userType: 'worker' as const
        }

        // Check if user already exists
        let user = await db.getUserByEmail(userData.email)
        
        if (!user) {
          // Create new user
          user = await db.createUser(userData)
          console.log(`✅ Created user: ${user.full_name}`)
        } else {
          console.log(`👤 User already exists: ${user.full_name}`)
        }

        // Check if worker profile already exists
        const existingProfile = await db.getWorkerProfileByUserId(user.id)
        
        if (!existingProfile) {
          // Create worker profile
          const profileData = {
            userId: user.id,
            jobCategory: profile.jobCategory || 'Other',
            jobTitle: profile.jobTitle,
            customJobTitle: profile.customJobTitle,
            jobProfile: profile.jobProfile,
            yearsExperience: parseInt(profile.yearsExperience) || 1,
            city: profile.city,
            country: profile.country,
            expectedSalary: parseInt(profile.expectedSalary) || 1000,
            visaStatus: profile.visaStatus,
            languagesSpoken: profile.languagesSpoken || [],
            aboutMe: profile.aboutMe,
            profilePictureUrl: profile.profilePicture || profile.profilePictureUrl
          }

          await db.createWorkerProfile(profileData)
          console.log(`✅ Created worker profile for: ${user.full_name}`)
        } else {
          console.log(`📋 Worker profile already exists for: ${user.full_name}`)
        }

        results.successful++

      } catch (error) {
        console.error(`❌ Failed to migrate profile for ${profile.fullName}:`, error)
        results.failed++
        results.errors.push(`${profile.fullName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    console.log(`🎉 Migration completed: ${results.successful} successful, ${results.failed} failed`)

    return NextResponse.json({
      success: true,
      results
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
