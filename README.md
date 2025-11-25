# 🚀 ConvertFlow - Modern File Conversion Website

<div align="center">

![ConvertFlow](https://img.shields.io/badge/ConvertFlow-File%20Converter-4F46E5?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)

**A beautiful, modern, and responsive file conversion website with clean URLs**

[Live Demo](#) • [Features](#features) • [Installation](#installation) • [Deployment](#deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**ConvertFlow** is a professional, modern file conversion website built with HTML, CSS, and JavaScript. It features a beautiful UI with gradient designs, smooth animations, and full responsive support. The website includes clean URLs powered by Apache `.htaccess` for production and a PHP router for local development.

### ✨ Key Highlights

- 🎨 **Modern Design** - Beautiful gradients, animations, and glassmorphism effects
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Clean URLs** - SEO-friendly URLs without `.html` extensions
- 🔒 **Secure** - Built-in security headers and best practices
- 🚀 **Fast** - Optimized with GZIP compression and browser caching
- 🎯 **SEO Ready** - Unique meta tags for each page

---

## 🎯 Features

### 📄 Pages

1. **Home Page**
   - Hero section with animated gradient orbs
   - Floating file format cards
   - Features grid with 6 key benefits
   - Statistics counter with animations
   - Call-to-action section

2. **About Page**
   - Mission statement and company vision
   - Technology stack showcase
   - Core values section
   - Animated statistics

3. **Convert Page**
   - Drag & drop file upload
   - File preview with image display
   - Format selection (PNG, JPG, SVG, WebP, GIF, BMP, ICO)
   - Quality slider (50-100%)
   - Animated progress tracker
   - Download functionality

4. **Contact Page**
   - Working contact form with validation
   - Contact information cards
   - Social media links
   - Quick FAQ section

### 🎨 Design Features

- ✅ Soft blue/purple gradient color palette
- ✅ Modern typography (Inter + Outfit fonts)
- ✅ Smooth animations and transitions
- ✅ Hover effects on all interactive elements
- ✅ Mobile-first responsive design
- ✅ Custom favicon with gradient background

### 🔧 Technical Features

- ✅ Clean URLs (e.g., `/about` instead of `/about.html`)
- ✅ Apache `.htaccess` configuration
- ✅ PHP router for local development
- ✅ Unique SEO meta tags per page
- ✅ Active navigation state detection
- ✅ Form validation and submission
- ✅ File upload simulation
- ✅ Progress tracking animation

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Home+Page)

### Convert Page
![Convert Page](https://via.placeholder.com/800x400/06B6D4/FFFFFF?text=Convert+Page)

### About Page
![About Page](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=About+Page)

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, animations
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Font Awesome** - Icons
- **Google Fonts** - Inter & Outfit fonts

### Backend (Optional)
- **PHP** - Backend API for file conversion
- **GD Library** - Image processing

### Server
- **Apache** - Production server (Hostinger)
- **PHP Built-in Server** - Local development

---

## 📥 Installation

### Prerequisites

- PHP 7.4 or higher (for local development)
- Git
- Web browser

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahad1234550/ConvertFlow-Image-Format-Changer-.git
   cd ConvertFlow-Image-Format-Changer-
   ```

2. **Start the PHP development server**
   ```bash
   php -S localhost:8000 router.php
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Test Clean URLs

- Home: `http://localhost:8000/`
- About: `http://localhost:8000/about`
- Convert: `http://localhost:8000/convert`
- Contact: `http://localhost:8000/contact`

---

## 🎮 Usage

### For Users

1. **Navigate** to the website
2. **Click** "Start Converting" or go to Convert page
3. **Upload** your file (drag & drop or browse)
4. **Select** output format
5. **Adjust** quality slider (50-100%)
6. **Click** "Convert File"
7. **Download** the converted file

### For Developers

#### Customize Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4F46E5;
    --secondary-color: #06B6D4;
    --accent-color: #8B5CF6;
}
```

#### Add New Page

1. Create `newpage.html`
2. Add route to `router.php`:
   ```php
   'newpage' => 'newpage.html',
   ```
3. Update navigation in all HTML files

#### Modify Meta Tags

Each page has unique meta tags in the `<head>` section:

```html
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords">
<title>Your Page Title</title>
```

---

## 🚀 Deployment

### Deploy to Hostinger

1. **Login** to Hostinger hPanel
2. **Open** File Manager
3. **Navigate** to `public_html` folder
4. **Upload** these files:
   - `.htaccess` (IMPORTANT!)
   - `index.html`
   - `about.html`
   - `contact.html`
   - `convert.html`
   - `styles.css`
   - `script.js`
   - `favicon.png`
   - `convert-api.php` (optional)

5. **Test** your website:
   - `https://yourdomain.com/`
   - `https://yourdomain.com/about`
   - `https://yourdomain.com/convert`
   - `https://yourdomain.com/contact`

### Important Notes

- ✅ `.htaccess` handles clean URLs on Apache
- ✅ `router.php` is only for local development
- ✅ Don't upload `router.php` to Hostinger
- ✅ Enable SSL certificate (free on Hostinger)

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📁 Project Structure

```
ConvertFlow/
├── .htaccess              # Apache URL rewriting (for production)
├── router.php             # PHP router (for local development)
├── index.html             # Home page
├── about.html             # About page
├── contact.html           # Contact page
├── convert.html           # File conversion page
├── styles.css             # Main stylesheet (~35KB)
├── script.js              # JavaScript functionality (~16KB)
├── favicon.png            # Website favicon
├── convert-api.php        # PHP backend API (optional)
├── README.md              # This file
├── DEPLOYMENT.md          # Deployment guide
└── CLEAN_URLS_SETUP.md    # Clean URLs documentation
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#4F46E5` | Buttons, links, accents |
| Secondary | `#06B6D4` | Secondary elements |
| Accent | `#8B5CF6` | Highlights |
| Gray 50 | `#F9FAFB` | Backgrounds |
| Gray 900 | `#111827` | Text |

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

---

## 📝 Features Roadmap

- [ ] Add Django backend for real file conversion
- [ ] Implement user authentication
- [ ] Add file history/dashboard
- [ ] Batch file conversion
- [ ] Cloud storage integration
- [ ] API for developers
- [ ] Dark mode toggle
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ahad**

- GitHub: [@ahad1234550](https://github.com/ahad1234550)
- Repository: [ConvertFlow](https://github.com/ahad1234550/ConvertFlow-Image-Format-Changer-)

---

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Hostinger for hosting platform
- All contributors and users

---

## 📞 Support

If you have any questions or need help, please:

1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
2. Open an issue on GitHub
3. Contact via the website's contact form

---

<div align="center">

**Built with ❤️ using HTML, CSS, and JavaScript**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#-convertflow---modern-file-conversion-website)

</div>
