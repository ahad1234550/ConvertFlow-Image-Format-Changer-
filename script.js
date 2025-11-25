// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.nav-wrapper')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// ===================================
// SET ACTIVE NAVIGATION LINK
// ===================================
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinksElements = document.querySelectorAll('.nav-link');
    
    navLinksElements.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = new URL(link.href).pathname;
        
        // Match exact path or root
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === '/') ||
            (currentPath === '/index.html' && linkPath === '/') ||
            (currentPath.includes('/about') && linkPath.includes('/about')) ||
            (currentPath.includes('/convert') && linkPath.includes('/convert')) ||
            (currentPath.includes('/contact') && linkPath.includes('/contact'))) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// ANIMATED COUNTER FOR STATS
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                stat.removeAttribute('data-target'); // Prevent re-animation
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        formMessage.textContent = 'Sending message...';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        formMessage.style.background = '#E0E7FF';
        formMessage.style.color = '#3730A3';
        
        // Simulate API call
        setTimeout(() => {
            formMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

// ===================================
// FILE CONVERSION FUNCTIONALITY
// ===================================
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadArea = document.getElementById('uploadArea');
const uploadContent = document.getElementById('uploadContent');
const filePreview = document.getElementById('filePreview');
const conversionOptions = document.getElementById('conversionOptions');
const progressSection = document.getElementById('progressSection');
const downloadSection = document.getElementById('downloadSection');
const removeFileBtn = document.getElementById('removeFileBtn');
const convertBtn = document.getElementById('convertBtn');
const outputFormat = document.getElementById('outputFormat');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const convertAnotherBtn = document.getElementById('convertAnotherBtn');
const downloadBtn = document.getElementById('downloadBtn');

let selectedFile = null;

// Browse button click
if (browseBtn) {
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
}

// Upload area click
if (uploadArea) {
    uploadArea.addEventListener('click', () => {
        if (!selectedFile) {
            fileInput.click();
        }
    });
}

// File input change
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    });
}

// Drag and drop functionality
if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    });
}

// Handle file selection
function handleFileSelect(file) {
    selectedFile = file;
    
    // Update preview
    const previewFilename = document.getElementById('previewFilename');
    const previewFilesize = document.getElementById('previewFilesize');
    const previewImage = document.getElementById('previewImage');
    const previewImageContainer = document.getElementById('previewImageContainer');
    
    previewFilename.textContent = file.name;
    previewFilesize.textContent = formatFileSize(file.size);
    
    // Show preview for images
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewImageContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImageContainer.style.display = 'none';
    }
    
    // Show file preview and hide upload content
    uploadContent.style.display = 'none';
    filePreview.style.display = 'block';
    uploadArea.style.cursor = 'default';
    uploadArea.style.border = '3px solid var(--gray-300)';
    
    // Show conversion options
    if (conversionOptions) {
        conversionOptions.style.display = 'block';
    }
}

// Remove file button
if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetConverter();
    });
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Quality slider update
if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value;
    });
}

// Output format change
if (outputFormat) {
    outputFormat.addEventListener('change', () => {
        if (outputFormat.value && selectedFile) {
            convertBtn.disabled = false;
        } else {
            convertBtn.disabled = true;
        }
    });
}

// Convert button click
if (convertBtn) {
    convertBtn.addEventListener('click', () => {
        startConversion();
    });
}

// Start conversion process
function startConversion() {
    // Hide options, show progress
    conversionOptions.style.display = 'none';
    progressSection.style.display = 'block';
    
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    let progress = 0;
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 33) {
            progress = 33;
            clearInterval(uploadInterval);
            
            // Move to processing step
            step1.classList.remove('active');
            step2.classList.add('active');
            
            // Start processing
            const processInterval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 66) {
                    progress = 66;
                    clearInterval(processInterval);
                    
                    // Move to complete step
                    step2.classList.remove('active');
                    step3.classList.add('active');
                    
                    // Finish conversion
                    const finishInterval = setInterval(() => {
                        progress += Math.random() * 8;
                        if (progress >= 100) {
                            progress = 100;
                            clearInterval(finishInterval);
                            
                            // Show download section after a brief delay
                            setTimeout(() => {
                                showDownloadSection();
                            }, 500);
                        }
                        updateProgress(progress);
                    }, 100);
                }
                updateProgress(progress);
            }, 150);
        }
        updateProgress(progress);
    }, 100);
    
    function updateProgress(value) {
        const rounded = Math.min(Math.round(value), 100);
        progressFill.style.width = rounded + '%';
        progressPercentage.textContent = rounded + '%';
    }
}

// Show download section
function showDownloadSection() {
    progressSection.style.display = 'none';
    downloadSection.style.display = 'block';
    
    // Update download filename
    const downloadFilename = document.getElementById('downloadFilename');
    const downloadFilesize = document.getElementById('downloadFilesize');
    const format = outputFormat.value.toUpperCase();
    const originalName = selectedFile.name.split('.')[0];
    
    downloadFilename.textContent = `${originalName}.${format.toLowerCase()}`;
    
    // Simulate slightly smaller file size for converted file
    const newSize = selectedFile.size * 0.85;
    downloadFilesize.textContent = formatFileSize(newSize);
}

// Download button
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // In a real application, this would download the converted file
        // For demo purposes, we'll create a simple download simulation
        
        const format = outputFormat.value;
        const originalName = selectedFile.name.split('.')[0];
        const filename = `${originalName}.${format}`;
        
        // Create a temporary link and trigger download
        // In production, this would be the actual converted file from the server
        const link = document.createElement('a');
        link.href = URL.createObjectURL(selectedFile); // In production, use converted file
        link.download = filename;
        link.click();
        
        // Show success message
        const btn = downloadBtn;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        btn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    });
}

// Convert another file button
if (convertAnotherBtn) {
    convertAnotherBtn.addEventListener('click', () => {
        resetConverter();
    });
}

// Reset converter to initial state
function resetConverter() {
    selectedFile = null;
    fileInput.value = '';
    
    // Reset display states
    uploadContent.style.display = 'flex';
    filePreview.style.display = 'none';
    conversionOptions.style.display = 'none';
    progressSection.style.display = 'none';
    downloadSection.style.display = 'none';
    
    // Reset upload area
    uploadArea.style.cursor = 'pointer';
    uploadArea.style.border = '3px dashed var(--gray-300)';
    
    // Reset form
    outputFormat.value = '';
    qualitySlider.value = 75;
    qualityValue.textContent = '75';
    convertBtn.disabled = true;
    
    // Reset progress
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    if (progressFill) progressFill.style.width = '0%';
    if (progressPercentage) progressPercentage.textContent = '0%';
    if (step1) {
        step1.classList.add('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
    }
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// FADE IN ANIMATION ON SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to feature cards, tech cards, etc.
document.querySelectorAll('.feature-card, .tech-card, .value-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(card);
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🚀 ConvertFlow', 'font-size: 24px; font-weight: bold; color: #4F46E5;');
console.log('%cWelcome to ConvertFlow - The Modern File Conversion Tool', 'font-size: 14px; color: #6B7280;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'font-size: 12px; color: #9CA3AF;');
