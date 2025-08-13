// Deployment Verification Script for New Popup
// Run this in browser console on https://www.gogethires.com/

console.log('🔍 Verifying New Popup Deployment...');

// Clear all popup related localStorage
localStorage.removeItem('ctaPopupDismissed'); // Old popup
localStorage.removeItem('mainCtaPopupDismissed'); // New popup
localStorage.removeItem('isLoggedIn');
localStorage.removeItem('isEmployerLoggedIn'); 
localStorage.removeItem('adminAuth');
localStorage.removeItem('userProfile');

console.log('✅ Cleared all popup localStorage');

// Check if new popup component exists
const checkNewPopup = () => {
  const newPopup = document.querySelector('[role="dialog"][aria-labelledby="popup-title"]');
  const versionIndicator = document.querySelector('[title="Popup Version"]');
  
  if (newPopup) {
    console.log('✅ New popup component found in DOM');
    if (versionIndicator) {
      console.log('✅ Version indicator found:', versionIndicator.textContent);
    }
    return true;
  } else {
    console.log('❌ New popup component not found in DOM');
    return false;
  }
};

// Check if old popup exists
const checkOldPopup = () => {
  const oldPopupSelector = '[class*="fixed"][class*="bottom-4"][class*="right-4"]';
  const oldPopup = document.querySelector(oldPopupSelector);
  
  if (oldPopup && oldPopup.textContent.includes('Create Your Profile')) {
    console.log('⚠️ Old popup still found in DOM');
    return true;
  } else {
    console.log('✅ Old popup not found - successfully removed');
    return false;
  }
};

// Force check conditions
const testConditions = () => {
  const pathname = window.location.pathname;
  const excludedPaths = ['/browse', '/create-profile', '/admin', '/dashboard', '/payment'];
  const shouldShow = !excludedPaths.some(path => pathname.startsWith(path));
  
  console.log('📍 Current path:', pathname);
  console.log('✅ Should show popup:', shouldShow);
  
  return shouldShow;
};

// Wait for popup to appear
const waitForPopup = () => {
  let attempts = 0;
  const maxAttempts = 12; // 12 seconds (3s delay + 9s buffer)
  
  const checkInterval = setInterval(() => {
    attempts++;
    console.log(`⏳ Checking for popup... (${attempts}/${maxAttempts})`);
    
    const newPopupExists = checkNewPopup();
    
    if (newPopupExists) {
      console.log('🎉 SUCCESS: New popup with worker animation is working!');
      clearInterval(checkInterval);
    } else if (attempts >= maxAttempts) {
      console.log('❌ TIMEOUT: New popup did not appear after 12 seconds');
      console.log('💡 Possible issues:');
      console.log('   1. Changes not deployed to production yet');
      console.log('   2. Browser cache preventing updates');
      console.log('   3. User logged in (popup hidden for logged users)');
      console.log('   4. Page excluded from popup display');
      clearInterval(checkInterval);
    }
  }, 1000);
};

// Run verification
console.log('🚀 Starting verification...');
checkOldPopup();
const shouldShow = testConditions();

if (shouldShow) {
  console.log('⏰ Waiting 3 seconds for popup to appear...');
  waitForPopup();
} else {
  console.log('ℹ️ Current page excluded from popup display');
}

// Manual trigger function
window.triggerNewPopup = () => {
  console.log('🔄 Manually triggering popup...');
  localStorage.removeItem('mainCtaPopupDismissed');
  location.reload();
};

console.log('💡 To manually test: run triggerNewPopup() in console');
