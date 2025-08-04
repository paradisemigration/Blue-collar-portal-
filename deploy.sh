#!/bin/bash

# Go Get Hire - Hostinger Deployment Script
echo "🚀 Starting Go Get Hire deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the application
echo "🔨 Building the application for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Create production package
echo "📦 Creating deployment package..."

# Create deployment directory
mkdir -p deployment-package

# Copy necessary files
cp -r .next deployment-package/
cp -r public deployment-package/
cp package.json deployment-package/
cp package-lock.json deployment-package/
cp next.config.js deployment-package/

# Copy additional config files if they exist
[ -f "tailwind.config.js" ] && cp tailwind.config.js deployment-package/
[ -f "postcss.config.js" ] && cp postcss.config.js deployment-package/
[ -f "tsconfig.json" ] && cp tsconfig.json deployment-package/

echo "✅ Deployment package created in 'deployment-package' directory"

# Create .htaccess for Apache (Hostinger uses Apache)
cat > deployment-package/.htaccess << 'EOF'
# Go Get Hire - Apache Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirect to HTTPS (uncomment after SSL setup)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Next.js routing
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF

echo "✅ Apache configuration (.htaccess) created"

# Create deployment instructions
cat > deployment-package/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# Go Get Hire - Hostinger Deployment Instructions

## Prerequisites
- Hostinger hosting account with Node.js support
- Domain name configured
- SSH access to your hosting account

## Deployment Steps

### 1. Upload Files
Upload all files from this `deployment-package` directory to your Hostinger public_html folder:
- `.next/` - Next.js build output
- `public/` - Static assets
- `package.json` - Dependencies
- `next.config.js` - Configuration
- `.htaccess` - Apache configuration

### 2. Install Node.js Dependencies
SSH into your Hostinger account and run:

cd public_html
npm install --production
```

### 3. Start the Application
```bash
npm start
```

### 4. Configure Domain
- Point your domain to your Hostinger hosting
- Set up SSL certificate in Hostinger control panel
- Uncomment HTTPS redirect in .htaccess after SSL is active

### 5. Environment Variables (if needed)
Create a `.env.production` file with:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Important Notes
- Make sure Node.js is enabled in your Hostinger control panel
- The application will run on port 3000 by default
- Configure your domain to point to the correct port in Hostinger settings
- Enable SSL for better SEO and security

## Support
If you encounter issues, check Hostinger's Node.js documentation or contact their support.
EOF

echo "✅ Deployment instructions created"

# Create ZIP file for easy upload
if command -v zip &> /dev/null; then
    echo "📦 Creating ZIP file for upload..."
    cd deployment-package
    zip -r ../gogethire-hostinger-deployment.zip .
    cd ..
    echo "✅ ZIP file created: gogethire-hostinger-deployment.zip"
else
    echo "⚠️  ZIP command not found. You can manually compress the deployment-package folder."
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload the 'deployment-package' contents to your Hostinger public_html folder"
echo "2. Or upload the 'gogethire-hostinger-deployment.zip' file and extract it"
echo "3. SSH into your Hostinger account and run 'npm install --production'"
echo "4. Start the application with 'npm start'"
echo "5. Configure your domain and SSL"
echo ""
echo "📖 Full instructions are available in DEPLOYMENT_INSTRUCTIONS.md"
