import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// POST - Migrate localStorage profiles to database
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const adminToken = request.headers.get('x-admin-token')
    if (adminToken !== 'admin-secret-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔄 Starting localStorage to database migration...')

    const { profiles } = await request.json()

    if (!profiles || !Array.isArray(profiles)) {
      return NextResponse.json(
        { error: 'Invalid request: profiles array required' },
        { status: 400 }
      )
    }

    const results = {
      successful: 0,
      failed: 0,
      skipped: 0,
      errors: [] as string[]
    }

    console.log(`📝 Processing ${profiles.length} localStorage profiles for migration...`)

    for (const profile of profiles) {
      try {
        // Validate profile data
        if (!profile.fullName || !profile.email || !profile.jobTitle) {
          console.warn(`⚠️ Skipping invalid profile: ${profile.fullName || 'Unknown'}`)
          results.skipped++
          continue
        }

        // Check if user already exists in database
        const existingUser = await db.getUserByEmail(profile.email)
        let userId

        if (existingUser) {
          userId = existingUser.id
          console.log(`👤 User already exists in database: ${profile.fullName}`)
          
          // Check if worker profile exists
          const existingWorkerProfile = await db.getWorkerProfileByUserId(userId)
          if (existingWorkerProfile) {
            console.log(`⚠️ Worker profile already exists for: ${profile.fullName}`)
            results.skipped++
            continue
          }
        } else {
          // Create new user
          const userData = {
            email: profile.email,
            phone: profile.phoneNumber || profile.phone || '+971000000000',
            fullName: profile.fullName,
            userType: 'worker' as const
          }

          const user = await db.createUser(userData)
          userId = user.id
          console.log(`✅ Created new user from localStorage: ${profile.fullName}`)
        }

        // Create worker profile from localStorage data
        const workerProfileData = {
          userId,
          jobCategory: profile.jobCategory || 'Other',
          jobTitle: profile.jobTitle,
          customJobTitle: profile.customJobTitle,
          jobProfile: profile.jobProfile || `Experienced ${profile.jobTitle} professional`,
          yearsExperience: profile.yearsExperience || 1,
          city: profile.city || 'Dubai',
          country: profile.country || 'UAE',
          expectedSalary: profile.expectedSalary || 2500,
          visaStatus: profile.visaStatus || 'Work Visa',
          languagesSpoken: profile.languagesSpoken || ['English'],
          aboutMe: profile.aboutMe || `Professional ${profile.jobTitle} seeking opportunities`,
          profilePictureUrl: profile.profilePicture || profile.profilePictureUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        }

        await db.createWorkerProfile(workerProfileData)
        console.log(`✅ Migrated worker profile: ${profile.fullName} (${profile.jobTitle}, ${profile.city})`)
        
        results.successful++

      } catch (error) {
        console.error(`❌ Failed to migrate profile for ${profile.fullName}:`, error)
        results.failed++
        results.errors.push(`${profile.fullName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    console.log(`🎉 Migration completed: ${results.successful} successful, ${results.failed} failed, ${results.skipped} skipped`)

    return NextResponse.json({
      success: true,
      message: `Migration completed successfully`,
      results: {
        totalProcessed: profiles.length,
        successful: results.successful,
        failed: results.failed,
        skipped: results.skipped,
        errors: results.errors.slice(0, 10) // Return only first 10 errors
      }
    })

  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET - Check migration status and localStorage profiles
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const adminToken = request.headers.get('x-admin-token')
    if (adminToken !== 'admin-secret-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current database stats
    const allProfiles = await db.getAllWorkerProfiles()
    const realProfiles = allProfiles.filter(p => 
      p.email && 
      !p.email.includes('.sample@gogethires.com') && 
      !p.email.includes('@test.com') &&
      !p.email.includes('demo')
    )

    return NextResponse.json({
      success: true,
      databaseProfiles: allProfiles.length,
      realProfiles: realProfiles.length,
      sampleProfiles: allProfiles.length - realProfiles.length,
      message: 'Send localStorage profiles via POST to migrate them to database'
    })

  } catch (error) {
    console.error('Failed to check migration status:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
