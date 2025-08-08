// Admin Test Script - For debugging authentication issues
// This script helps verify admin authentication functionality

console.log('=== Admin Authentication Test ===');

// Test localStorage admin authentication
if (typeof window !== 'undefined') {
  // Set admin authentication
  localStorage.setItem('adminAuth', 'true');
  console.log('✅ Admin auth set in localStorage');
  
  // Trigger auth state change event
  window.dispatchEvent(new Event('authStateChanged'));
  console.log('✅ Auth state change event dispatched');
} else {
  console.log('❌ Running in server environment - localStorage not available');
}

// Instructions for manual testing
console.log(`
📋 MANUAL TESTING INSTRUCTIONS:

1. ADMIN LOGIN:
   - Go to: /admin-login
   - Username: admin
   - Password: admin123
   - This should set localStorage.adminAuth = 'true'

2. VERIFY HEADER:
   - After login, header should show "Admin Dashboard" link
   - Name should display as "Hi, Admin"
   - Purple admin dashboard button should be visible

3. ADMIN DASHBOARD:
   - Go to: /admin
   - Should show user statistics and management interface
   - If no real users exist, demo users will be displayed

4. USER DATA:
   - Real users are stored in localStorage as 'allUserProfiles'
   - Individual profile in 'userProfile'
   - Demo data will show if no real users exist

5. TROUBLESHOOTING:
   - Clear localStorage and try again
   - Check browser console for errors
   - Verify authentication status in localStorage
`);

// Function to check current authentication status
function checkAuthStatus() {
  if (typeof window !== 'undefined') {
    const adminAuth = localStorage.getItem('adminAuth');
    const userAuth = localStorage.getItem('isLoggedIn');
    const employerAuth = localStorage.getItem('isEmployerLoggedIn');
    
    console.log('Current Authentication Status:');
    console.log('- Admin:', adminAuth === 'true' ? '✅ Logged in' : '❌ Not logged in');
    console.log('- User:', userAuth === 'true' ? '✅ Logged in' : '❌ Not logged in');
    console.log('- Employer:', employerAuth === 'true' ? '✅ Logged in' : '❌ Not logged in');
  }
}

// Export for browser console use
if (typeof window !== 'undefined') {
  window.checkAuthStatus = checkAuthStatus;
  window.setAdminAuth = () => {
    localStorage.setItem('adminAuth', 'true');
    window.dispatchEvent(new Event('authStateChanged'));
    console.log('✅ Admin authentication set manually');
  };
}
