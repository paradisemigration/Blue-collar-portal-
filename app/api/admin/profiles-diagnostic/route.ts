import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

// Simple admin authentication
function isAdmin(request: NextRequest): boolean {
  const adminToken = request.headers.get('x-admin-token')
  return adminToken === 'admin-secret-token'
}

// GET - Diagnose profile issues
export async function GET(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    // Get active profiles
    const activeProfiles = await db.getAllWorkerProfiles()
    
    // Get all profiles including inactive ones
    const allProfiles = await db.getAllWorkerProfilesIncludingInactive()
    
    // Count inactive
    const inactiveProfiles = allProfiles.filter((p: any) => p.is_active === false)
    const orphanedProfiles = allProfiles.filter((p: any) => !p.email) // Profiles without valid users
    
    return NextResponse.json({
      success: true,
      diagnostic: {
        activeProfiles: activeProfiles.length,
        totalProfiles: allProfiles.length,
        inactiveProfiles: inactiveProfiles.length,
        orphanedProfiles: orphanedProfiles.length,
        inactiveProfileNames: inactiveProfiles.map((p: any) => ({
          id: p.id,
          fullName: p.full_name,
          email: p.email,
          isActive: p.is_active,
          jobTitle: p.job_title,
          userId: p.user_id
        })),
        message: `Found ${activeProfiles.length} active profiles and ${inactiveProfiles.length} inactive profiles (total: ${allProfiles.length})`
      }
    })

  } catch (error) {
    console.error('Profile diagnostic error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Reactivate all inactive users
export async function POST(request: NextRequest) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action, userIds } = body

    if (action === 'reactivate-all-inactive') {
      // Get all inactive profiles
      const allProfiles = await db.getAllWorkerProfilesIncludingInactive()
      const inactiveProfiles = allProfiles.filter((p: any) => p.is_active === false)
      
      let reactivated = 0
      const results = []
      
      for (const profile of inactiveProfiles) {
        try {
          await db.updateUserActiveStatus(profile.user_id, true)
          reactivated++
          results.push({
            userId: profile.user_id,
            fullName: profile.full_name,
            status: 'reactivated'
          })
          console.log(`✅ Reactivated user: ${profile.full_name}`)
        } catch (error) {
          console.error(`❌ Failed to reactivate ${profile.full_name}:`, error)
          results.push({
            userId: profile.user_id,
            fullName: profile.full_name,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }

      return NextResponse.json({
        success: true,
        message: `Reactivated ${reactivated} users`,
        reactivated,
        results
      })
    }

    if (action === 'reactivate-specific' && Array.isArray(userIds)) {
      let reactivated = 0
      const results = []
      
      for (const userId of userIds) {
        try {
          const user = await db.updateUserActiveStatus(userId, true)
          reactivated++
          results.push({
            userId,
            status: 'reactivated'
          })
          console.log(`✅ Reactivated user: ${userId}`)
        } catch (error) {
          console.error(`❌ Failed to reactivate ${userId}:`, error)
          results.push({
            userId,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }

      return NextResponse.json({
        success: true,
        message: `Reactivated ${reactivated} users`,
        reactivated,
        results
      })
    }

    return NextResponse.json(
      { error: 'Invalid action or missing userIds' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Reactivation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
