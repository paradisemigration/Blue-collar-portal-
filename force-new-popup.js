// FORCE NEW POPUP DEPLOYMENT SCRIPT
// Run this in browser console on https://www.gogethires.com/ 
// to immediately see the new popup after deployment

console.log('🚀 FORCING NEW POPUP DEPLOYMENT...');

// STEP 1: Nuclear localStorage cleanup
const keysToRemove = [
  'ctaPopupDismissed',           // Old popup
  'mainCtaPopupDismissed',       // New popup  
  'bottomPopupDismissed',        // Any variants
  'popupDismissed',              // Generic
  'isLoggedIn',                  // User states that hide popup
  'isEmployerLoggedIn',
  'adminAuth', 
  'userProfile',
  'googleUser',
  'authProvider'
];

keysToRemove.forEach(key => {
  localStorage.removeItem(key);
  console.log(`✅ Removed: ${key}`);
});

// STEP 2: Clear all cookies that might affect popup
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});
console.log('✅ Cleared all cookies');

// STEP 3: Clear session storage
sessionStorage.clear();
console.log('✅ Cleared sessionStorage');

// STEP 4: Force browser cache refresh
if ('caches' in window) {
  caches.keys().then(function(names) {
    names.forEach(function(name) {
      caches.delete(name);
    });
  });
  console.log('✅ Cleared service worker caches');
}

// STEP 5: Add cache-busting timestamp to force fresh load
const timestamp = Date.now();
const currentUrl = new URL(window.location.href);
currentUrl.searchParams.set('cb', timestamp);
console.log('✅ Added cache-busting parameter:', timestamp);

// STEP 6: Force reload with cache busting
console.log('🔄 Force reloading page...');
console.log('⏰ New popup should appear in 3 seconds after reload');
console.log('👷‍♂️ Look for: Worker emoji with floating tools');
console.log('🆔 Version should show: v2.1-' + new Date().toISOString().slice(0,10));

setTimeout(() => {
  window.location.href = currentUrl.href;
}, 1000);

// STEP 7: Monitor for new popup after reload
window.addEventListener('load', () => {
  let checkCount = 0;
  const checkInterval = setInterval(() => {
    checkCount++;
    const newPopup = document.querySelector('[role="dialog"][aria-labelledby="popup-title"]');
    const workerEmoji = document.body.textContent.includes('👷‍♂️');
    
    if (newPopup && workerEmoji) {
      console.log('🎉 SUCCESS! New popup with worker animation detected!');
      console.log('✅ Popup element:', newPopup);
      clearInterval(checkInterval);
    } else if (checkCount > 10) {
      console.log('⚠️ New popup not detected after 10 seconds');
      console.log('💡 Check if deployment is complete or try again in 5 minutes');
      clearInterval(checkInterval);
    } else {
      console.log(`⏳ Checking for new popup... (${checkCount}/10)`);
    }
  }, 1000);
});
