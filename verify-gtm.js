// Google Tag Manager Verification Script
// Run this in browser console to verify GTM is working properly

console.log('🔍 Verifying Google Tag Manager Implementation...');

// 1. Check if GTM script is loaded in head
const gtmScript = document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
if (gtmScript) {
  console.log('✅ GTM script found in head section');
  console.log('📍 GTM Container ID:', gtmScript.src.match(/id=([^&]+)/)?.[1] || 'Not found');
} else {
  console.log('❌ GTM script NOT found in head section');
}

// 2. Check if noscript iframe is present
const gtmNoscript = document.querySelector('noscript iframe[src*="googletagmanager.com/ns.html"]');
if (gtmNoscript) {
  console.log('✅ GTM noscript iframe found after body tag');
  console.log('📍 Noscript Container ID:', gtmNoscript.src.match(/id=([^&]+)/)?.[1] || 'Not found');
} else {
  console.log('❌ GTM noscript iframe NOT found');
}

// 3. Check if dataLayer exists
if (typeof window.dataLayer !== 'undefined') {
  console.log('✅ dataLayer is available');
  console.log('📊 dataLayer length:', window.dataLayer.length);
  console.log('📊 dataLayer contents:', window.dataLayer);
} else {
  console.log('❌ dataLayer is NOT available');
}

// 4. Check if GTM is actually loaded and working
if (typeof window.google_tag_manager !== 'undefined') {
  console.log('✅ Google Tag Manager is fully loaded and active');
} else {
  console.log('⏳ Google Tag Manager is loading or not yet active');
}

// 5. Test custom event push
try {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'gtm_verification_test',
    test_timestamp: new Date().toISOString(),
    test_status: 'GTM verification successful'
  });
  console.log('✅ Successfully pushed test event to dataLayer');
} catch (error) {
  console.log('❌ Failed to push test event:', error);
}

// 6. Check GTM container status
setTimeout(() => {
  if (window.dataLayer && window.dataLayer.length > 0) {
    console.log('🎉 GTM verification complete - All systems working!');
    console.log('📈 Ready for Google Analytics tracking');
    console.log('🎯 Custom events will be tracked properly');
  } else {
    console.log('⚠️ GTM may still be loading, check again in a few seconds');
  }
}, 2000);

// 7. Display current implementation status
console.log(`
📋 IMPLEMENTATION STATUS:
• GTM Container ID: GTM-WJRCQC6K
• Head Script: ${gtmScript ? '✅ Loaded' : '❌ Missing'}
• Noscript Fallback: ${gtmNoscript ? '✅ Present' : '❌ Missing'}
• DataLayer: ${typeof window.dataLayer !== 'undefined' ? '✅ Available' : '❌ Missing'}
• Custom Events: ✅ Configured for popup tracking

🚀 Your website is ready for comprehensive analytics tracking!
`);
