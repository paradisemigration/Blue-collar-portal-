const nodemailer = require('nodemailer');

async function testGmailConnection() {
  console.log('🔍 Testing Gmail connection...');
  console.log('Gmail User:', process.env.GMAIL_USER || 'NOT SET');
  console.log('Gmail Password:', process.env.GMAIL_APP_PASSWORD ? 'SET (' + process.env.GMAIL_APP_PASSWORD.length + ' chars)' : 'NOT SET');

  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      debug: true, // Enable debug output
      logger: true // Enable logging
    });

    console.log('📧 Verifying transporter...');
    await transporter.verify();
    console.log('✅ Gmail connection successful!');

    // Try sending a test email
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: {
        name: 'GoGetHires Test',
        address: process.env.GMAIL_USER
      },
      to: process.env.GMAIL_USER, // Send to self for testing
      subject: 'Test Email - GoGetHires Configuration',
      text: 'This is a test email to verify Gmail SMTP configuration is working correctly.',
      html: '<h1>Test Email</h1><p>Gmail SMTP configuration is working! ✅</p>'
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    return true;

  } catch (error) {
    console.error('❌ Gmail connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Load environment variables
require('dotenv').config();

// Run the test
testGmailConnection();
