# 🚀 Hostinger Deployment Guide - ConvertFlow

## 📋 Prerequisites

- Hostinger hosting account (any plan with PHP support)
- FTP/SFTP access or File Manager access
- Domain name (optional, can use Hostinger subdomain)

## 📁 Files to Upload

Upload ALL these files to your Hostinger `public_html` directory:

```
public_html/
├── .htaccess              ← IMPORTANT: Enables clean URLs
├── index.html
├── about.html
├── contact.html
├── convert.html
├── styles.css
├── script.js
├── convert-api.php        ← Optional: For actual file conversion
└── README.md
```

## 🔧 Step-by-Step Deployment

### **Method 1: Using File Manager (Easiest)**

1. **Login to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Access File Manager**
   - Click on your hosting plan
   - Click "File Manager" in the Files section

3. **Navigate to public_html**
   - Open the `public_html` folder
   - This is your website root directory

4. **Upload Files**
   - Click "Upload Files" button
   - Select ALL files from your project folder
   - Wait for upload to complete

5. **Verify .htaccess**
   - Make sure `.htaccess` file is visible
   - If not visible, enable "Show Hidden Files" in File Manager settings

### **Method 2: Using FTP/SFTP (Recommended for Developers)**

1. **Get FTP Credentials**
   - In Hostinger panel, go to Files → FTP Accounts
   - Note down: Hostname, Username, Password, Port

2. **Connect with FTP Client**
   - Use FileZilla, WinSCP, or Cyberduck
   - Connect to your hosting account

3. **Upload Files**
   - Navigate to `public_html` folder
   - Upload all project files
   - Ensure `.htaccess` is uploaded

## ✅ Testing Clean URLs

After deployment, test these URLs:

- `https://yourdomain.com/` (Home page)
- `https://yourdomain.com/about` (About page)
- `https://yourdomain.com/convert` (Convert page)
- `https://yourdomain.com/contact` (Contact page)

**All should work WITHOUT the .html extension!**

## 🔍 Troubleshooting

### **Problem: Clean URLs not working (404 errors)**

**Solution:**
1. Check if `.htaccess` file exists in `public_html`
2. Verify Apache mod_rewrite is enabled (it's enabled by default on Hostinger)
3. Check file permissions: `.htaccess` should be 644

### **Problem: .htaccess file not visible**

**Solution:**
1. In File Manager, click Settings (gear icon)
2. Enable "Show Hidden Files"
3. Refresh the page

### **Problem: Pages show but without styling**

**Solution:**
1. Check if `styles.css` is in the same directory as HTML files
2. Clear browser cache (Ctrl + F5)
3. Check browser console for errors

### **Problem: File conversion not working**

**Solution:**
1. Check if PHP GD library is installed (it's included in Hostinger)
2. Create `uploads/` and `converted/` folders with 755 permissions
3. Check PHP error logs in Hostinger panel

## 🔐 Security Recommendations

1. **Create .htpasswd for admin areas** (if needed)
2. **Enable SSL Certificate** (free with Hostinger)
   - Go to Hostinger panel → SSL
   - Install free Let's Encrypt SSL
3. **Set proper file permissions:**
   - Files: 644
   - Directories: 755
   - .htaccess: 644

## ⚡ Performance Optimization

### **1. Enable GZIP Compression**
Already configured in `.htaccess` file ✅

### **2. Enable Browser Caching**
Already configured in `.htaccess` file ✅

### **3. Optimize Images** (before uploading)
- Use WebP format for images
- Compress images using TinyPNG or similar

### **4. Enable Cloudflare** (Optional but Recommended)
- Free CDN and DDoS protection
- Can be enabled in Hostinger panel

## 📊 Monitoring

### **Check Website Status:**
- Use Hostinger's built-in analytics
- Google Search Console
- Google Analytics (add tracking code)

### **Monitor Errors:**
- Check error logs in Hostinger panel
- Files → Error Logs

## 🔄 Updating Your Website

### **To update files:**
1. Edit files locally
2. Upload changed files via File Manager or FTP
3. Clear browser cache to see changes

### **To update .htaccess:**
1. Make changes locally
2. Upload new .htaccess file
3. Test clean URLs again

## 🌐 Custom Domain Setup

1. **Point Domain to Hostinger:**
   - Update nameservers to:
     - ns1.dns-parking.com
     - ns2.dns-parking.com

2. **Add Domain in Hostinger:**
   - Go to Domains → Add Domain
   - Follow the wizard

3. **Wait for DNS Propagation:**
   - Can take 24-48 hours
   - Check status: https://dnschecker.org

## 📱 Mobile Testing

Test your website on mobile devices:
- https://www.responsinator.com
- Chrome DevTools (F12 → Toggle Device Toolbar)

## 🎯 SEO Setup

1. **Add Google Analytics:**
   - Get tracking code from Google Analytics
   - Add before `</head>` tag in all HTML files

2. **Submit Sitemap:**
   - Create sitemap.xml (optional)
   - Submit to Google Search Console

3. **Add Meta Tags:**
   - Already included in HTML files ✅

## 📞 Support

### **Hostinger Support:**
- 24/7 Live Chat
- Email: support@hostinger.com
- Knowledge Base: https://support.hostinger.com

### **Common Hostinger Locations:**
- **File Manager:** Files → File Manager
- **PHP Settings:** Advanced → PHP Configuration
- **Error Logs:** Files → Error Logs
- **SSL:** Security → SSL
- **Backups:** Files → Backups

## 🎉 Post-Deployment Checklist

- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is present and working
- [ ] Clean URLs working (test all pages)
- [ ] SSL certificate installed and working
- [ ] All images and CSS loading correctly
- [ ] Mobile responsive design working
- [ ] Contact form tested (if using PHP backend)
- [ ] File conversion tested (if using convert-api.php)
- [ ] Google Analytics added (optional)
- [ ] Custom domain configured (if applicable)

## 🚀 Go Live!

Once everything is tested and working:
1. Share your website URL
2. Test on multiple devices
3. Monitor for any errors
4. Enjoy your live website!

---

**Your website will be live at:**
- `https://yourdomain.com`
- `https://yourdomain.com/about`
- `https://yourdomain.com/convert`
- `https://yourdomain.com/contact`

**All with clean URLs - no .html extensions! 🎉**
