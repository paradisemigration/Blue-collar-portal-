# 📤 How to Upload Go Get Hire to Hostinger

## ⚡ Quick Upload Guide

Since I cannot directly access your Hostinger account, here's exactly how to upload your Go Get Hire website:

### 🎯 **What You Need:**
- Hostinger hosting account (Business plan or higher for Node.js)
- Your domain name
- FTP access or File Manager access

### 📂 **Files to Upload:**

#### **Essential Files (Upload these to public_html/):**
```
✅ All files from /app/ folder
✅ All files from /components/ folder  
✅ All files from /types/ folder
✅ All files from /utils/ folder
✅ package.json
✅ next.config.js
✅ tailwind.config.js
✅ tsconfig.json
✅ postcss.config.js
✅ .htaccess (I just created this)
✅ .env.production (I just created this)
✅ globals.css
```

### 🚀 **Step-by-Step Upload Process:**

#### **Method 1: Hostinger File Manager (Easiest)**

1. **Login to Hostinger**
   ```
   → Go to hpanel.hostinger.com
   → Enter your username/password
   ```

2. **Open File Manager**
   ```
   → Click "File Manager" in hosting section
   → Navigate to your domain's public_html folder
   ```

3. **Upload All Files**
   ```
   → Select all project files
   → Drag & drop or use upload button
   → Keep folder structure intact
   ```

4. **Verify Upload**
   ```
   Check that you have:
   ✅ app/ folder with all pages
   ✅ components/ folder
   ✅ package.json file
   ✅ .htaccess file
   ```

#### **Method 2: FTP Upload**

1. **Get FTP Credentials**
   ```
   → Go to "FTP Accounts" in Hostinger panel
   → Note: hostname, username, password
   ```

2. **Use FTP Client**
   ```
   → Download FileZilla (free)
   → Connect with FTP credentials
   → Upload to public_html/ folder
   ```

### ⚙️ **Configure Hostinger After Upload:**

#### **1. Enable Node.js**
```
🔧 Hostinger Control Panel Steps:
1. Go to "Advanced" → "Node.js"
2. Click "Create Application"
3. Select Node.js version 18+
4. Set document root: public_html
5. Click "Create"
```

#### **2. Install Dependencies**
```bash
# Use Hostinger terminal or SSH:
cd public_html
npm install --production
```

#### **3. Build Application**
```bash
npm run build
```

#### **4. Start Application**
```bash
npm start
```

### 🌐 **Domain & SSL Setup:**

#### **SSL Certificate (Free)**
```
1. Go to "SSL" in Hostinger panel
2. Click "Manage SSL"  
3. Select "Generate SSL Certificate"
4. Wait 15-30 minutes for activation
```

#### **Enable HTTPS Redirect**
After SSL is active:
```
1. Edit .htaccess file
2. Uncomment these lines:
   # RewriteEngine On
   # RewriteCond %{HTTPS} off
   # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### ✅ **Verification Checklist:**

#### **After Upload, Check:**
- [ ] Website loads at yourdomain.com
- [ ] All pages work (browse, create-profile, etc.)
- [ ] City/job pages work (e.g., /riyadh/driver)
- [ ] Images load correctly
- [ ] Mobile view works
- [ ] SSL certificate active (https://)

#### **If Something Doesn't Work:**

**Node.js Issues:**
```
→ Ensure Node.js is enabled in control panel
→ Check your hosting plan supports Node.js
→ Contact Hostinger support
```

**File Issues:**
```
→ Check all files uploaded correctly
→ Verify folder structure
→ Check file permissions
```

**Domain Issues:**
```
→ Verify DNS settings
→ Wait for propagation (up to 48 hours)
→ Check nameservers point to Hostinger
```

### 📞 **Need Help?**

#### **Hostinger Support:**
- **Live Chat**: Available 24/7 in control panel
- **Knowledge Base**: help.hostinger.com
- **Ticket System**: For technical issues

#### **Common Hostinger Requirements:**
- **Hosting Plan**: Business or higher (for Node.js)
- **PHP Version**: 8.0+ recommended
- **Node.js**: Version 18+ required
- **Memory**: 1GB+ recommended

### 🎉 **Success!**

Once uploaded and configured:
- **Main Site**: https://yourdomain.com
- **Browse Workers**: https://yourdomain.com/browse  
- **All 2,107 City/Job Pages**: Automatically available
- **Mobile Optimized**: Works on all devices
- **SEO Ready**: All meta tags and sitemaps included

**Your Go Get Hire platform will be live across the Gulf region!** 🚀

---

**Need the files?** All files are ready in your project directory - just upload them to Hostinger's public_html folder following this guide.
