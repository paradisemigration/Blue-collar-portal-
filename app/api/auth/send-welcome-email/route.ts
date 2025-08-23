import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createWelcomeEmailTemplate, generateTempPassword } from '../../../../lib/emailService'
import { db } from '../../../../lib/db'
import crypto from 'crypto'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, fullName, email, jobTitle, city, country } = body

    // Validate required fields
    if (!userId || !fullName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, fullName, email' },
        { status: 400 }
      )
    }

    // Generate temporary password
    const tempPassword = generateTempPassword()
    const hashedPassword = hashPassword(tempPassword)

    console.log('🔐 Generated temporary password for user:', email)

    // Update user with temporary password in database
    try {
      await db.updateUserPassword(userId, hashedPassword)
      console.log('✅ Temporary password saved to database')
    } catch (dbError) {
      console.error('❌ Failed to save password to database:', dbError)
      // Continue with email sending even if database update fails
    }

    // Create email template
    const emailTemplate = createWelcomeEmailTemplate({
      fullName,
      email,
      tempPassword,
      jobTitle,
      city,
      country
    })

    // Send welcome email
    const emailSent = await sendEmail({
      to: email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html
    })

    if (emailSent) {
      console.log('✅ Welcome email sent successfully to:', email)
      return NextResponse.json({
        success: true,
        message: 'Welcome email sent successfully',
        email: email
      })
    } else {
      console.error('❌ Failed to send welcome email to:', email)
      return NextResponse.json(
        { 
          error: 'Failed to send welcome email',
          fallback: true,
          message: 'Profile created but email notification failed'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Error in send-welcome-email API:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to test email configuration
export async function GET() {
  try {
    const { testEmailConfiguration } = await import('../../../../lib/emailService')
    const isConfigured = await testEmailConfiguration()
    
    return NextResponse.json({
      configured: isConfigured,
      gmail_user: process.env.GMAIL_USER ? 'configured' : 'missing',
      gmail_password: process.env.GMAIL_APP_PASSWORD ? 'configured' : 'missing'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Configuration test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
