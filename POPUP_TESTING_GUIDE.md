# Call-to-Action Popup Testing Guide

## Overview
The CallToActionPopup component is a responsive, animated popup that appears on most pages to help users choose between hiring workers or looking for jobs.

## Popup Behavior

### ✅ Shows On:
- Homepage (`/`)
- Job listings (`/jobs`)
- Pricing page (`/pricing`)
- Contact page (`/contact`)
- Help page (`/help`)
- Any other pages not in the excluded list

### ❌ Does NOT Show On:
- `/browse` (workers listing page)
- `/create-profile` (profile creation page)
- Any page under `/admin/` (admin dashboard)
- Any page under `/dashboard/` (user dashboard)
- Any page under `/payment/` (payment pages)

### User State Conditions:
- **Hidden** if user is logged in (worker, employer, or admin)
- **Hidden** if dismissed in last 24 hours
- **Hidden** if user has an existing profile

## Testing Instructions

### 1. Basic Functionality Test
```bash
# Clear localStorage to reset dismissal state
localStorage.removeItem('mainCtaPopupDismissed')
localStorage.removeItem('isLoggedIn')
localStorage.removeItem('isEmployerLoggedIn')
localStorage.removeItem('adminAuth')
localStorage.removeItem('userProfile')

# Navigate to homepage and wait 5 seconds
# Popup should appear with country detection
```

### 2. Country Detection Test
The popup automatically detects user location:
- **Primary**: Uses browser timezone (fast, offline)
- **Fallback**: Uses IP geolocation API (if timezone fails)
- **Default**: Shows "UAE" if all detection fails

### 3. Page Exclusion Test
```bash
# Test these pages - popup should NOT appear:
- /browse
- /create-profile
- /admin/
- /dashboard/
- /payment/

# Test these pages - popup SHOULD appear after 5 seconds:
- /
- /jobs
- /pricing
- /contact
```

### 4. Dismissal Behavior Test
```bash
# Test 24-hour dismissal:
1. Let popup appear
2. Click close button or click outside
3. Refresh page - popup should NOT appear
4. Clear localStorage: localStorage.removeItem('mainCtaPopupDismissed')
5. Refresh page - popup should appear again
```

### 5. Button Functionality Test
- **"I want to hire a worker"** → Should redirect to `/browse` (or external URL)
- **"I am looking for a job in [Country]"** → Should redirect to `/create-profile` (or external URL)

### 6. Responsive Design Test
- **Desktop**: Centered modal with backdrop
- **Mobile**: Full-width with proper touch interactions
- **Tablet**: Responsive sizing

### 7. Accessibility Test
- **Keyboard**: Press `ESC` to close popup
- **Screen Reader**: Proper ARIA labels and focus management
- **Touch**: Touch outside to close on mobile

## Manual Testing Shortcuts

### Reset Popup State
```javascript
// Run in browser console to reset popup
localStorage.removeItem('mainCtaPopupDismissed')
localStorage.removeItem('isLoggedIn')
localStorage.removeItem('isEmployerLoggedIn')
localStorage.removeItem('adminAuth')
localStorage.removeItem('userProfile')
location.reload()
```

### Force Show Popup
```javascript
// Run in browser console to force show popup
localStorage.removeItem('mainCtaPopupDismissed')
// Then refresh page and wait 5 seconds
```

### Test Different Countries
```javascript
// The popup detects country automatically, but you can simulate different timezones:
// 1. Open Chrome DevTools
// 2. Go to Settings > More Tools > Sensors
// 3. Override timezone to test different countries
```

## Troubleshooting

### Popup Not Showing?
1. Check if you're on an excluded page
2. Check if user is logged in
3. Check if dismissed recently (24 hours)
4. Check browser console for errors
5. Verify 5-second delay has passed

### Popup Conflicts?
- The main popup uses `mainCtaPopupDismissed` localStorage key
- The bottom popup uses `ctaPopupDismissed` localStorage key
- They have different timing (5s vs 3s) to avoid conflicts

### Performance Issues?
- Country detection uses efficient timezone detection first
- IP geolocation has 3-second timeout
- Animations use CSS transforms for optimal performance

## Analytics Events
The popup logs interactions to browser console:
- `CTA Popup: User clicked Hire Worker`
- `CTA Popup: User clicked Looking for Job`

These can be connected to your analytics platform (Google Analytics, Mixpanel, etc.).
