import { NextResponse } from 'next/server'
const nodemailer = require('nodemailer')

export async function GET() {
  try {
    console.log('🔍 Testing Gmail connection...')
    console.log('Gmail User:', process.env.GMAIL_USER || 'NOT SET')
    console.log('Gmail Password:', process.env.GMAIL_APP_PASSWORD ? 'SET (' + process.env.GMAIL_APP_PASSWORD.length + ' chars)' : 'NOT SET')

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json({
        success: false,
        error: 'Gmail credentials not configured',
        gmail_user: process.env.GMAIL_USER || 'NOT SET',
        gmail_password_length: process.env.GMAIL_APP_PASSWORD?.length || 0
      })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      debug: true,
      logger: true
    })

    console.log('📧 Verifying transporter...')
    await transporter.verify()
    console.log('✅ Gmail connection successful!')

    // Try sending a test email to self
    console.log('📤 Sending test email...')
    const info = await transporter.sendMail({
      from: {
        name: 'GoGetHires Test',
        address: process.env.GMAIL_USER
      },
      to: process.env.GMAIL_USER, // Send to self for testing
      subject: 'Test Email - GoGetHires Configuration ✅',
      text: 'This is a test email to verify Gmail SMTP configuration is working correctly.',
      html: `
        <h2>🎉 Gmail Configuration Test</h2>
        <p>Gmail SMTP configuration is working perfectly! ✅</p>
        <p><strong>From:</strong> ${process.env.GMAIL_USER}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>The email service is now ready to send welcome emails to new users.</p>
      `
    })

    console.log('✅ Test email sent successfully!')
    console.log('Message ID:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Gmail connection and test email successful!',
      messageId: info.messageId,
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER
    })

  } catch (error: any) {
    console.error('❌ Gmail connection failed:')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)

    let errorDetails = {
      code: error.code,
      message: error.message,
      type: 'unknown'
    }

    // Provide specific guidance based on error type
    if (error.code === 'EAUTH') {
      errorDetails.type = 'authentication'
      errorDetails.message = 'Authentication failed. Check if app password is correct and 2FA is enabled.'
    } else if (error.code === 'ECONNECTION') {
      errorDetails.type = 'connection'
      errorDetails.message = 'Connection failed. Check internet connectivity.'
    } else if (error.message?.includes('Application-specific password')) {
      errorDetails.type = 'app_password'
      errorDetails.message = 'Need to use App Password instead of regular password.'
    }

    return NextResponse.json({
      success: false,
      error: 'Gmail connection failed',
      details: errorDetails,
      gmail_user: process.env.GMAIL_USER,
      gmail_password_configured: !!process.env.GMAIL_APP_PASSWORD
    }, { status: 500 })
  }
}
