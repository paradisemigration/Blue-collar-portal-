#!/bin/bash

echo "🚀 Deploying Go Get Hires Now with Domain Fix"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from project root."
    exit 1
fi

# Update dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Git operations
echo "📋 Committing changes..."
git add .
git commit -m "Fix 403 domain error - Added vercel.json and domain configurations"

# Push to repository
echo "🚢 Pushing to repository..."
git push

if [ $? -ne 0 ]; then
    echo "❌ Git push failed! Please check your git configuration."
    exit 1
fi

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🔧 Next Steps to Fix 403 Error:"
echo "1. Go to your Vercel dashboard"
echo "2. Navigate to Settings → Domains"
echo "3. Add domain: gogethires.com"
echo "4. Ensure both domains show 'Valid' status"
echo "5. Wait 5-10 minutes for DNS propagation"
echo ""
echo "📊 Expected Results:"
echo "✅ https://www.gogethires.com/ - Working"
echo "✅ https://gogethires.com/ - Redirects to www"
echo ""
echo "🌐 Your site will be live at: https://www.gogethires.com"
