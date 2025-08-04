#!/usr/bin/env node

/**
 * Domain Status Checker for Go Get Hires Now
 * Checks if both domains are working properly
 */

const https = require('https');
const http = require('http');

const domains = [
  'https://www.gogethires.com',
  'https://gogethires.com',
  'http://www.gogethires.com',
  'http://gogethires.com'
];

console.log('🔍 Checking domain status for Go Get Hires Now...\n');

function checkDomain(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      const status = res.statusCode;
      const location = res.headers.location;
      
      resolve({
        url,
        status,
        redirect: location || null,
        success: status >= 200 && status < 400
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        success: false
      });
    });
  });
}

async function checkAllDomains() {
  console.log('Testing all domain configurations...\n');
  
  for (const domain of domains) {
    try {
      const result = await checkDomain(domain);
      
      console.log(`🌐 ${domain}`);
      console.log(`   Status: ${result.status}`);
      
      if (result.redirect) {
        console.log(`   Redirects to: ${result.redirect}`);
      }
      
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      console.log(`   ${result.success ? '✅ Working' : '❌ Failed'}\n`);
      
    } catch (error) {
      console.log(`❌ ${domain} - Connection failed: ${error.message}\n`);
    }
  }
  
  console.log('📋 Summary:');
  console.log('Expected behavior:');
  console.log('✅ https://www.gogethires.com - Should return 200');
  console.log('✅ https://gogethires.com - Should return 301/302 redirect to www');
  console.log('✅ Both HTTP versions should redirect to HTTPS');
  console.log('\nIf gogethires.com shows 403:');
  console.log('🔧 Add the domain in your Vercel dashboard');
  console.log('🔧 Ensure both domains are listed in Settings → Domains');
  console.log('🔧 Check that SSL certificates are issued for both');
}

checkAllDomains().catch(console.error);
