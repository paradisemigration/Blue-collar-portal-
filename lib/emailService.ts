const nodemailer = require('nodemailer')

// Email configuration interface
interface EmailConfig {
  to: string
  subject: string
  text?: string
  html?: string
}

// Create transporter for Gmail SMTP
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('Gmail credentials not configured. Email sending will be disabled.')
    return null
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
    },
  })
}

// Send email function
export const sendEmail = async (config: EmailConfig): Promise<boolean> => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.error('Email transporter not configured')
      return false
    }

    const mailOptions = {
      from: {
        name: 'GoGetHires Platform',
        address: process.env.GMAIL_USER || ''
      },
      to: config.to,
      subject: config.subject,
      text: config.text,
      html: config.html,
    }

    console.log('📧 Sending email to:', config.to)
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', result.messageId)
    
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return false
  }
}

// Generate temporary password
export const generateTempPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''
  
  // Ensure at least one uppercase, one lowercase, and one number
  password += chars.charAt(Math.floor(Math.random() * 26)) // Uppercase
  password += chars.charAt(Math.floor(Math.random() * 26) + 26) // Lowercase  
  password += chars.charAt(Math.floor(Math.random() * 10) + 52) // Number
  
  // Add 5 more random characters
  for (let i = 0; i < 5; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

// Welcome email template for new users
export const createWelcomeEmailTemplate = (userData: {
  fullName: string
  email: string
  tempPassword: string
  jobTitle?: string
  city?: string
  country?: string
}) => {
  const { fullName, email, tempPassword, jobTitle, city, country } = userData
  
  const subject = `Welcome to GoGetHires! Your Account is Ready 🎉`
  
  const text = `
Welcome to GoGetHires Platform!

Dear ${fullName},

Congratulations! Your worker profile has been successfully created on GoGetHires platform.

Your Login Credentials:
- Email/Login ID: ${email}
- Temporary Password: ${tempPassword}

Profile Details:
- Name: ${fullName}
- Job Title: ${jobTitle || 'Not specified'}
- Location: ${city ? `${city}, ${country}` : 'Not specified'}

Next Steps:
1. Visit our website and log in using the credentials above
2. Change your temporary password to something secure
3. Complete your profile to attract more employers
4. Start browsing job opportunities in your area

Security Note:
Please change your temporary password immediately after your first login for security purposes.

Welcome to the GoGetHires community! We're excited to help you find your next opportunity.

Best regards,
The GoGetHires Team

---
Need help? Contact our support team or visit our help center.
This is an automated message. Please do not reply to this email.
  `
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GoGetHires</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 40px 30px; }
        .welcome-message { background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .credentials-box { background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 25px; margin: 25px 0; }
        .credentials-box h3 { color: #166534; margin-top: 0; display: flex; align-items: center; gap: 8px; }
        .credential-item { background-color: white; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px solid #d1fae5; }
        .credential-label { font-weight: bold; color: #374151; font-size: 14px; }
        .credential-value { font-family: 'Courier New', monospace; font-size: 16px; color: #1f2937; background-color: #f9fafb; padding: 8px 12px; border-radius: 6px; margin-top: 5px; }
        .profile-details { background-color: #f8fafc; border-radius: 10px; padding: 20px; margin: 20px 0; }
        .next-steps { margin: 25px 0; }
        .next-steps ol { padding-left: 20px; }
        .next-steps li { margin: 8px 0; }
        .security-note { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; }
        .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer p { margin: 5px 0; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .button:hover { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); }
        .icon { width: 20px; height: 20px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to GoGetHires!</h1>
            <p>Your professional journey starts here</p>
        </div>
        
        <div class="content">
            <div class="welcome-message">
                <h2 style="margin-top: 0; color: #1e40af;">Dear ${fullName},</h2>
                <p><strong>Congratulations!</strong> Your worker profile has been successfully created on the GoGetHires platform. You're now part of a community that connects talented professionals with amazing opportunities across the Gulf region.</p>
            </div>
            
            <div class="credentials-box">
                <h3>🔑 Your Login Credentials</h3>
                <p style="margin-bottom: 15px; color: #166534;">Use these credentials to access your account:</p>
                
                <div class="credential-item">
                    <div class="credential-label">📧 Email/Login ID:</div>
                    <div class="credential-value">${email}</div>
                </div>
                
                <div class="credential-item">
                    <div class="credential-label">🔒 Temporary Password:</div>
                    <div class="credential-value">${tempPassword}</div>
                </div>
            </div>
            
            <div class="profile-details">
                <h3 style="margin-top: 0; color: #374151;">👤 Your Profile Details</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Job Title:</strong> ${jobTitle || 'Not specified'}</p>
                <p><strong>Location:</strong> ${city ? `${city}, ${country}` : 'Not specified'}</p>
            </div>
            
            <div class="next-steps">
                <h3 style="color: #374151;">🚀 What's Next?</h3>
                <ol>
                    <li><strong>Log in to your account</strong> using the credentials above</li>
                    <li><strong>Change your password</strong> to something secure and memorable</li>
                    <li><strong>Complete your profile</strong> to attract more employers</li>
                    <li><strong>Start browsing</strong> job opportunities in your area</li>
                    <li><strong>Apply for jobs</strong> that match your skills and experience</li>
                </ol>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://gogethires.com'}/login" class="button">
                    🚀 Log In to Your Account
                </a>
            </div>
            
            <div class="security-note">
                <h4 style="margin-top: 0; color: #92400e;">🛡️ Security Notice</h4>
                <p style="margin-bottom: 0;">Please change your temporary password immediately after your first login for security purposes. Choose a strong password with a mix of letters, numbers, and special characters.</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Welcome to the GoGetHires community!</strong></p>
            <p>We're excited to help you find your next opportunity.</p>
            <p style="margin-top: 20px;">
                <strong>Need help?</strong> Contact our support team or visit our help center.<br>
                This is an automated message. Please do not reply to this email.
            </p>
            <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                © ${new Date().getFullYear()} GoGetHires Platform. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
  `
  
  return { subject, text, html }
}

// Test email configuration
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter()
    
    if (!transporter) {
      console.error('Email transporter not configured')
      return false
    }

    // Verify connection
    await transporter.verify()
    console.log('✅ Email configuration is valid')
    return true
  } catch (error) {
    console.error('❌ Email configuration test failed:', error)
    return false
  }
}
