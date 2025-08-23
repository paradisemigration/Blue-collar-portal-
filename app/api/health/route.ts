import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// GET - Health check for database and APIs
export async function GET(request: NextRequest) {
  const healthCheck = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    checks: {
      database: { status: 'unknown', message: '', details: {} },
      environment: { status: 'healthy', message: 'Environment variables check', details: {} }
    }
  }

  // Check environment variables
  try {
    healthCheck.checks.environment.details = {
      DATABASE_URL: process.env.DATABASE_URL ? 'configured' : 'missing',
      NODE_ENV: process.env.NODE_ENV || 'development',
      hasSecret: !!process.env.DATABASE_URL
    }
    
    if (!process.env.DATABASE_URL) {
      healthCheck.checks.environment.status = 'warning'
      healthCheck.checks.environment.message = 'DATABASE_URL not configured'
    }
  } catch (error) {
    healthCheck.checks.environment.status = 'error'
    healthCheck.checks.environment.message = `Environment check failed: ${error}`
  }

  // Check database connection
  try {
    if (!process.env.DATABASE_URL) {
      healthCheck.checks.database.status = 'warning'
      healthCheck.checks.database.message = 'Database URL not configured'
    } else {
      // Try a simple query
      const profiles = await db.getAllWorkerProfiles()
      
      healthCheck.checks.database.status = 'healthy'
      healthCheck.checks.database.message = 'Database connection successful'
      healthCheck.checks.database.details = {
        totalProfiles: profiles.length,
        sampleProfiles: profiles.filter(p => p.email?.includes('.sample@gogethires.com')).length,
        realProfiles: profiles.filter(p => !p.email?.includes('.sample@gogethires.com')).length,
        connectionString: process.env.DATABASE_URL ? 'configured' : 'missing'
      }
    }
  } catch (error) {
    healthCheck.checks.database.status = 'error'
    healthCheck.checks.database.message = `Database error: ${error instanceof Error ? error.message : 'Unknown error'}`
    healthCheck.checks.database.details = {
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : 'Unknown'
    }
    healthCheck.status = 'unhealthy'
  }

  // Overall status
  const hasErrors = Object.values(healthCheck.checks).some(check => check.status === 'error')
  const hasWarnings = Object.values(healthCheck.checks).some(check => check.status === 'warning')
  
  if (hasErrors) {
    healthCheck.status = 'unhealthy'
  } else if (hasWarnings) {
    healthCheck.status = 'degraded'
  }

  const statusCode = healthCheck.status === 'unhealthy' ? 503 : 200

  return NextResponse.json(healthCheck, { status: statusCode })
}
