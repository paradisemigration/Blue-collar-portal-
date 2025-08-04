# 🚀 Go Get Hire - Hostinger Deployment Guide

## Overview
This guide will help you deploy your Go Get Hire website to Hostinger hosting. The website is built with Next.js and optimized for production deployment.

## 📋 Prerequisites

### Hostinger Account Requirements
- **Business hosting plan or higher** (needed for Node.js support)
- **SSH access enabled**
- **Domain name configured**
- **SSL certificate** (free with Hostinger)

### Technical Requirements
- Node.js 18+ support
- NPM package manager
- Apache server (default on Hostinger)

## 🛠️ Deployment Process

### Step 1: Prepare Your Files
Run the deployment script to prepare your files:

```bash
chmod +x deploy.sh
./deploy.sh
```

This will create:
- `deployment-package/` - All files needed for deployment
- `gogethire-hostinger-deployment.zip` - Ready-to-upload ZIP file
- Apache configuration (.htaccess)
- Environment file template

### Step 2: Upload to Hostinger

#### Option A: File Manager Upload
1. Login to your Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html/`
4. Upload `gogethire-hostinger-deployment.zip`
5. Extract the ZIP file
6. Delete the ZIP file after extraction

#### Option B: FTP Upload
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger FTP:
   - **Host**: your-domain.com
   - **Username**: your FTP username
   - **Password**: your FTP password
3. Upload all files from `deployment-package/` to `public_html/`

### Step 3: Configure Node.js on Hostinger

1. **Enable Node.js**:
   - Go to Hostinger control panel
   - Find **Node.js** section
   - Enable Node.js (version 18+)
   - Set document root to `public_html`

2. **Install Dependencies**:
   - Open **Terminal** in Hostinger panel, or SSH in
   - Navigate to your domain folder:
     ```bash
     cd public_html
     npm install --production
     ```

### Step 4: Configure Domain & SSL

1. **Domain Setup**:
   - Ensure your domain points to your Hostinger hosting
   - Update DNS if necessary (may take 24-48 hours)

2. **SSL Certificate**:
   - Go to **SSL** section in Hostinger panel
   - Enable free SSL certificate
   - Wait for SSL to activate (usually 15-30 minutes)

3. **HTTPS Redirect**:
   - After SSL is active, edit `.htaccess`
   - Uncomment the HTTPS redirect lines:
     ```apache
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```

### Step 5: Start Your Application

1. **Start the Application**:
   ```bash
   cd public_html
   npm start
   ```

2. **Configure Process Manager** (if available):
   - Some Hostinger plans include PM2
   - Use PM2 to keep your app running:
     ```bash
     pm2 start npm --name "gogethire" -- start
     pm2 save
     pm2 startup
     ```

### Step 6: Configure Environment Variables

1. Create `.env.production` file:
   ```bash
   cp .env.production.example .env.production
   ```

2. Edit with your production values:
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_DOMAIN=yourdomain.com
   ```

## 🔧 Hostinger-Specific Configuration

### Apache Configuration
The included `.htaccess` file provides:
- **Compression** for faster loading
- **Caching** for static assets
- **Security headers**
- **HTTPS redirect** (when enabled)
- **SPA routing** support

### Performance Optimization
- Images are optimized for web delivery
- Static assets are cached
- Compression is enabled
- Console logs removed in production

## 🐛 Troubleshooting

### Common Issues

#### "Node.js not found"
- Ensure Node.js is enabled in Hostinger panel
- Check if your hosting plan supports Node.js
- Contact Hostinger support for Node.js setup

#### "npm install fails"
- Check available disk space
- Ensure you're in the correct directory
- Try: `npm cache clean --force`

#### "Application won't start"
- Check error logs: `npm run start 2>&1 | tee startup.log`
- Verify all files uploaded correctly
- Check file permissions

#### "404 errors on page refresh"
- Ensure `.htaccess` is uploaded
- Check Apache mod_rewrite is enabled
- Verify routing configuration

### Performance Issues
- Enable Cloudflare (free with Hostinger)
- Optimize images further if needed
- Monitor resource usage in Hostinger panel

## 📊 Post-Deployment Checklist

### Functionality Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Search functionality works
- [ ] Profile creation works
- [ ] Contact forms work (if applicable)
- [ ] All city/job pages load
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### SEO & Analytics
- [ ] Google Search Console setup
- [ ] Google Analytics setup (if desired)
- [ ] Sitemap accessible: `yourdomain.com/sitemap.xml`
- [ ] Robots.txt accessible: `yourdomain.com/robots.txt`
- [ ] SSL certificate active
- [ ] Page speed optimization

### Security
- [ ] HTTPS redirect working
- [ ] Security headers active
- [ ] No sensitive data exposed
- [ ] Regular backups scheduled

## 🆘 Support Resources

### Hostinger Support
- **Knowledge Base**: hpanel.hostinger.com/help
- **Live Chat**: Available 24/7
- **Ticket System**: For technical issues

### Documentation
- **Next.js Deployment**: nextjs.org/docs/deployment
- **Hostinger Node.js Guide**: hostinger.com/tutorials/nodejs

## 🎉 Success!

Once deployed, your Go Get Hire website will be live at:
- **Main Site**: https://yourdomain.com
- **Worker Profiles**: https://yourdomain.com/browse
- **City Pages**: https://yourdomain.com/city/job (e.g., /riyadh/driver)

**Total Pages**: 2,107+ dynamically generated city/job combinations across the Gulf region!

---

**Need Help?** Contact Hostinger support or refer to their Node.js hosting documentation.
