# 🚨 Hostinger Deployment Troubleshooting Guide

## Quick Diagnosis Checklist

Go through these steps in order to identify and fix the issue:

### ✅ **Step 1: Verify Hostinger Plan**
**Check if your hosting plan supports Node.js:**
- Login to Hostinger Control Panel
- Look for "Node.js" section
- **Required**: Business plan or higher
- **If not available**: Upgrade your hosting plan

### ✅ **Step 2: Enable Node.js**
**In Hostinger Control Panel:**
1. Go to "Advanced" → "Node.js"
2. Click "Create Application"
3. **Node.js Version**: Select 18.x or higher
4. **Document Root**: Set to `public_html`
5. **Startup File**: Set to `server.js` (we'll create this)
6. Click "Create"

### ✅ **Step 3: Check File Upload**
**Verify these files exist in public_html/:**
```
✅ package.json
✅ next.config.js
✅ app/ folder
✅ components/ folder
✅ .htaccess
✅ .env.production
```

### ✅ **Step 4: Install Dependencies**
**SSH into your Hostinger account or use Terminal:**
```bash
cd public_html
npm install --production
```

### ✅ **Step 5: Create Server File**
**Create a server.js file for Hostinger:**
```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```

### ✅ **Step 6: Build Application**
```bash
npm run build
```

### ✅ **Step 7: Start Application**
```bash
node server.js
```

## 🔧 **Common Error Solutions**

### **Error: "Node.js not found"**
**Solution:**
- Ensure Node.js is enabled in control panel
- Contact Hostinger support to enable Node.js
- Verify you have Business hosting plan

### **Error: "npm command not found"**
**Solution:**
```bash
# Check if npm is installed
which npm
# If not found, install it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### **Error: "Permission denied"**
**Solution:**
```bash
# Fix file permissions
chmod 755 public_html
chmod 644 public_html/*.js
chmod 644 public_html/*.json
```

### **Error: "Port already in use"**
**Solution:**
```bash
# Kill existing processes
pkill -f node
# Or find and kill specific process
lsof -ti:3000 | xargs kill
```

### **Error: "Module not found"**
**Solution:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install --production
```

## 🌐 **Domain Configuration**

### **Check Domain Setup:**
1. **DNS Settings**: Ensure domain points to Hostinger
2. **Nameservers**: Use Hostinger's nameservers
3. **Propagation**: Wait 24-48 hours for DNS propagation

### **SSL Certificate:**
1. Go to "SSL" in Hostinger panel
2. Enable free SSL certificate
3. Wait 15-30 minutes for activation

## 📞 **Get Help**

### **Hostinger Support:**
- **Live Chat**: 24/7 in control panel
- **Phone**: Available in your region
- **Tickets**: For complex technical issues

### **What to Tell Hostinger Support:**
1. "I need help deploying a Next.js application"
2. "Please enable Node.js on my hosting account"
3. "I need assistance with the startup file configuration"

## ⚡ **Alternative: Static Export**

**If Node.js isn't available, try static export:**

1. **Update next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

2. **Build static version:**
```bash
npm run build
```

3. **Upload the 'out' folder contents** to public_html

## 🎯 **Success Checklist**

**Your site is working when:**
- [ ] Domain loads without errors
- [ ] Homepage displays correctly
- [ ] Navigation links work
- [ ] Browse page loads workers
- [ ] City/job pages work (e.g., /riyadh/driver)
- [ ] SSL certificate is active (https://)

---

**Still not working?** Contact Hostinger support and mention you're deploying a Next.js application. They can help with Node.js configuration.
