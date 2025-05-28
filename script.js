/*

Document Name: script.js
Last Updated: August 2, 2023

# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- #
# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- NICHOLAS AYAT -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- #
# -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- #

*/

$(document).ready(function () {
  $(window).scroll(function () {
    
    // Sticky Navigation Bar When Scrolling

    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // Show/Hide Scroll Button

    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // Slide-Up Scroll

  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    
    // Removes smooth scroll when scroll is clicked
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // Applies smooth scroll when menu items are clicked
    $("html").css("scrollBehavior", "smooth");
  });

  // Toggle Navigation Bar
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // Typing Text Seen on Home Page
  var typed = new Typed(".typing", {
    strings: ["Computer Science Student", "Software Engineer", "Team Player"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Computer Science Student Student",
      "Software Engineer",
      "Team Player",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
});

// Mail Section

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact form");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Validation for form fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    try {
      await sendMessage(data);
      showMessage("Message sent successfully!", "success");
      contactForm.reset();
    } catch (error) {
      showMessage("An error occurred. Please try again later.", "error");
    }
  });

  async function sendMessage(data) {
    // Server-side script
    const url = "smtp.elasticemail.com";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  function showMessage(message, type) {
    console.log(message);
  }
});

// Contact Form Handling
$(document).ready(function() {
    $('form[action*="formspree.io"]').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const messageDiv = $('#form-message');
        
        // Disable submit button and show loading state
        const submitBtn = form.find('button[type="submit"]');
        const originalBtnText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Sending...');
        
        // Clear previous messages
        messageDiv.removeClass('success error').empty();
        
        // Send form data
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                messageDiv.addClass('success').text('Message sent successfully! I will get back to you soon.');
                form[0].reset();
            },
            error: function(xhr) {
                let errorMessage = 'An error occurred. Please try again later.';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMessage = xhr.responseJSON.error;
                }
                messageDiv.addClass('error').text(errorMessage);
            },
            complete: function() {
                // Re-enable submit button
                submitBtn.prop('disabled', false).text(originalBtnText);
            }
        });
    });
});

// Section Fade-In on Scroll
$(document).ready(function() {
    const $sections = $('section');
    $sections.addClass('fade-in-section');
    function revealSections() {
        $sections.each(function() {
            const $section = $(this);
            const rect = this.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                $section.addClass('visible');
            }
        });
    }
    revealSections();
    $(window).on('scroll resize', revealSections);
});

// Intro Overlay Animation on Page Load
window.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        // Hide scrollbar during intro
        document.body.classList.add('intro-active');
        
        // Add a subtle pulse effect to the overlay
        overlay.style.animation = 'overlay-pulse 6s ease-in-out infinite';
        
        // Timing breakdown:
        // 1.8s (typewriter delay) + 1.5s (typewriter duration) + 0.4s (flicker duration) = 3.7s
        setTimeout(() => {
            overlay.classList.add('hide');
            setTimeout(() => {
                overlay.remove();
                // Show scrollbar after intro completes
                document.body.classList.remove('intro-active');
                document.body.classList.add('intro-complete');
            }, 1200);
        }, 3700); // Transition right after the flicker ends
    } else {
        // If no intro overlay, show scrollbar immediately
        document.body.classList.add('intro-complete');
    }
});

// High Performance Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.init();
    }
    
    init() {
        // Direct mouse tracking for instant response
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Immediate cursor update for responsiveness
            this.updateCursor();
        }, { passive: true });
        
        // Hover effects for interactive elements
        const hoverElements = 'a, button, .card, .scroll-up-btn, input, textarea, .menu-btn';
        document.querySelectorAll(hoverElements).forEach(el => {
            el.addEventListener('mouseenter', () => this.addHoverEffect(), { passive: true });
            el.addEventListener('mouseleave', () => this.removeHoverEffect(), { passive: true });
        });
        
        // Click effects
        document.addEventListener('mousedown', () => this.addClickEffect(), { passive: true });
        document.addEventListener('mouseup', () => this.removeClickEffect(), { passive: true });
        
        // Text selection cursor only for form inputs
        const textInputElements = 'input[type="text"], input[type="email"], textarea';
        document.querySelectorAll(textInputElements).forEach(el => {
            el.addEventListener('mouseenter', () => this.addTextEffect(), { passive: true });
            el.addEventListener('mouseleave', () => this.removeTextEffect(), { passive: true });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        }, { passive: true });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        }, { passive: true });
    }
    
    updateCursor() {
        // Much faster easing for snappier response
        const ease = 0.4;
        this.cursorX += (this.mouseX - this.cursorX) * ease;
        this.cursorY += (this.mouseY - this.cursorY) * ease;
        
        // Direct transform for maximum performance
        this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0) translate(-50%, -50%)`;
    }
    
    addHoverEffect() {
        this.cursor.classList.add('hover');
    }
    
    removeHoverEffect() {
        this.cursor.classList.remove('hover');
    }
    
    addClickEffect() {
        this.cursor.classList.add('click');
    }
    
    removeClickEffect() {
        this.cursor.classList.remove('click');
    }
    
    addTextEffect() {
        this.cursor.classList.add('text');
    }
    
    removeTextEffect() {
        this.cursor.classList.remove('text');
    }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768 || isTouchDevice;
    
    // Only initialize custom cursor on desktop non-touch devices
    if (!isMobile && !isTouchDevice) {
        new CustomCursor();
    } else {
        // Completely remove custom cursor on mobile/touch devices
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.remove();
        }
        
        // Restore default cursor behavior on mobile
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
        
        // Override the global cursor: none rule for mobile
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px), (pointer: coarse) {
                * {
                    cursor: auto !important;
                }
                
                a, button, input, textarea, .card, .scroll-up-btn, .menu-btn {
                    cursor: pointer !important;
                }
                
                input[type="text"], input[type="email"], textarea {
                    cursor: text !important;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
});

// Magnetic Button Effects
function initMagneticButtons() {
    const magneticButtons = [
        '.home .home-content a',
        '.about .about-content .right a:not(.about-link)', 
        '.form-submit button',
        '.scroll-up-btn',
        '#contact-form input',
        '#contact-form textarea'
    ];

    magneticButtons.forEach(selector => {
        const buttons = document.querySelectorAll(selector);
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Magnetic strength (adjust these values to control attraction)
                const strength = 0.3;
                const maxDistance = 80; // Maximum distance for magnetic effect
                
                const distance = Math.sqrt(x * x + y * y);
                
                if (distance < maxDistance) {
                    const magneticX = x * strength;
                    const magneticY = y * strength;
                    
                    button.style.transform = `translate(${magneticX}px, ${magneticY}px)`;
                    
                    // Move checkmark with input field if it exists
                    const checkmark = button.parentElement?.querySelector('.field-success');
                    if (checkmark) {
                        if (button.tagName.toLowerCase() === 'textarea') {
                            checkmark.style.transform = `translate(${magneticX}px, ${magneticY}px)`;
                        } else {
                            checkmark.style.transform = `translate(${magneticX}px, ${magneticY}px) translateY(-50%)`;
                        }
                    }
                }
            }, { passive: true });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px)';
                
                // Reset checkmark position if it exists
                const checkmark = button.parentElement?.querySelector('.field-success');
                if (checkmark) {
                    if (button.tagName.toLowerCase() === 'textarea') {
                        checkmark.style.transform = 'none';
                    } else {
                        checkmark.style.transform = 'translateY(-50%)';
                    }
                }
            }, { passive: true });
        });
    });
}

// Initialize magnetic buttons after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop devices (same check as custom cursor)
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        initMagneticButtons();
    }
});

// Smart Preloading System
class SmartPreloader {
    constructor() {
        this.preloadedSections = new Set();
        this.preloadQueue = [];
        this.isPreloading = false;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
        this.preloadThreshold = 200; // pixels before section comes into view
        
        this.init();
    }
    
    init() {
        // Track scroll direction and position
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        // Preload on hover for navigation links
        document.querySelectorAll('.navbar .menu li a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const targetSection = link.getAttribute('href').substring(1);
                this.preloadSection(targetSection, 'hover');
            }, { passive: true });
        });
        
        // Preload on scroll pause (user likely reading)
        this.setupScrollPauseDetection();
        
        // Initial preload of next logical section
        this.preloadInitialContent();
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
        
        // Check which sections are approaching viewport
        this.checkUpcomingSections();
    }
    
    checkUpcomingSections() {
        const sections = document.querySelectorAll('section');
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = scrollY + rect.top;
            const distanceToSection = sectionTop - (scrollY + viewportHeight);
            
            // Preload if section is approaching viewport
            if (distanceToSection <= this.preloadThreshold && distanceToSection > -rect.height) {
                const sectionId = section.id;
                if (sectionId && !this.preloadedSections.has(sectionId)) {
                    this.preloadSection(sectionId, 'scroll');
                }
            }
        });
    }
    
    setupScrollPauseDetection() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // User paused scrolling - preload next section
                this.preloadNextSection();
            }, 150);
        }, { passive: true });
    }
    
    preloadInitialContent() {
        // Preload home section assets immediately
        this.preloadSection('home', 'initial');
        
        // Preload about section after a short delay (user likely to scroll there next)
        setTimeout(() => {
            this.preloadSection('about', 'predictive');
        }, 1000);
    }
    
    preloadNextSection() {
        const currentSection = this.getCurrentSection();
        const nextSection = this.getNextSection(currentSection);
        
        if (nextSection && !this.preloadedSections.has(nextSection)) {
            this.preloadSection(nextSection, 'pause');
        }
    }
    
    getCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollY = window.scrollY + window.innerHeight / 2;
        
        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollY >= sectionTop && scrollY <= sectionBottom) {
                return section.id;
            }
        }
        return 'home';
    }
    
    getNextSection(currentSection) {
        const sectionOrder = ['home', 'about', 'projects', 'contact'];
        const currentIndex = sectionOrder.indexOf(currentSection);
        return currentIndex < sectionOrder.length - 1 ? sectionOrder[currentIndex + 1] : null;
    }
    
    async preloadSection(sectionId, trigger) {
        if (this.preloadedSections.has(sectionId) || this.isPreloading) {
            return;
        }
        
        this.isPreloading = true;
        this.preloadedSections.add(sectionId);
        
        try {
            await this.preloadSectionAssets(sectionId, trigger);
            console.log(`✓ Preloaded ${sectionId} section (${trigger})`);
        } catch (error) {
            console.warn(`Failed to preload ${sectionId}:`, error);
            this.preloadedSections.delete(sectionId);
        } finally {
            this.isPreloading = false;
        }
    }
    
    async preloadSectionAssets(sectionId, trigger) {
        const preloadPromises = [];
        
        switch (sectionId) {
            case 'home':
                // Background image is critical - highest priority
                preloadPromises.push(this.preloadImage('images/sfskyline.jpg', 'high'));
                break;
                
            case 'about':
                // Profile image
                preloadPromises.push(this.preloadImage('images/portrait.jpg', 'medium'));
                // CV file (if user hovers download button)
                if (trigger === 'hover') {
                    preloadPromises.push(this.preloadFile('path/to/cv.pdf'));
                }
                break;
                
            case 'projects':
                // Project images and any external resources
                preloadPromises.push(this.preloadProjectAssets());
                break;
                
            case 'contact':
                // Form submission endpoint warmup
                preloadPromises.push(this.warmupFormEndpoint());
                break;
        }
        
        // Add section-specific content preloading
        preloadPromises.push(this.preloadSectionContent(sectionId));
        
        await Promise.allSettled(preloadPromises);
    }
    
    preloadImage(src, priority = 'low') {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            
            // Set loading priority
            if (priority === 'high') {
                img.loading = 'eager';
                img.fetchPriority = 'high';
            } else {
                img.loading = 'lazy';
                img.fetchPriority = priority;
            }
            
            img.src = src;
        });
    }
    
    preloadFile(src) {
        return fetch(src, { 
            method: 'HEAD',
            mode: 'no-cors'
        }).catch(() => {
            // Silently fail for cross-origin resources
        });
    }
    
    async preloadProjectAssets() {
        // Preload any project thumbnails or external links
        const projectLinks = document.querySelectorAll('.projects .card-link');
        const promises = [];
        
        projectLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('http')) {
                // Warm up external project links
                promises.push(this.warmupExternalLink(href));
            }
        });
        
        return Promise.allSettled(promises);
    }
    
    warmupExternalLink(url) {
        // DNS prefetch and preconnect for external links
        return new Promise((resolve) => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = url;
            document.head.appendChild(link);
            
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = new URL(url).origin;
            document.head.appendChild(preconnect);
            
            setTimeout(resolve, 100);
        });
    }
    
    warmupFormEndpoint() {
        // Warm up the form submission endpoint
        const form = document.querySelector('form[action*="formspree.io"]');
        if (form) {
            const action = form.getAttribute('action');
            return fetch(action, { 
                method: 'HEAD',
                mode: 'no-cors'
            }).catch(() => {
                // Silently fail - just warming up the connection
            });
        }
        return Promise.resolve();
    }
    
    preloadSectionContent(sectionId) {
        // Preload any dynamic content or prepare animations
        const section = document.getElementById(sectionId);
        if (!section) return Promise.resolve();
        
        // Prepare any heavy animations or computations
        const animations = section.querySelectorAll('[class*="animation"]');
        animations.forEach(el => {
            // Force browser to calculate styles
            el.offsetHeight;
        });
        
        return Promise.resolve();
    }
}

// Mobile Touch Feedback System
class MobileTouchFeedback {
    constructor() {
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.activeElements = new Set();
        
        if (this.isTouchDevice) {
            this.init();
        }
    }
    
    init() {
        // Add touch feedback classes to interactive elements
        this.setupTouchElements();
        
        // Add touch event listeners
        this.addTouchListeners();
    }
    
    setupTouchElements() {
        // Define elements that should have touch feedback
        const touchElements = [
            { selector: 'button, .home .home-content a, .about .about-content .right a, .scroll-up-btn', type: 'button' },
            { selector: '.projects .card, .navbar .menu li a', type: 'card' },
            { selector: 'input, textarea', type: 'input' },
            { selector: '.navbar .logo, .menu-btn', type: 'button' }
        ];
        
        touchElements.forEach(({ selector, type }) => {
            document.querySelectorAll(selector).forEach(element => {
                element.classList.add('touch-feedback', `touch-feedback-${type}`);
            });
        });
    }
    
    addTouchListeners() {
        // Use passive listeners for better performance
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        document.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Handle touch move to cancel feedback if user scrolls
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    }
    
    handleTouchStart(e) {
        const target = this.findTouchFeedbackElement(e.target);
        if (target) {
            this.activateFeedback(target, e.touches[0]);
        }
    }
    
    handleTouchEnd(e) {
        // Don't clear animations immediately - let them run for a few seconds like desktop hover
        setTimeout(() => {
            this.activeElements.forEach(element => {
                this.deactivateFeedback(element);
            });
            this.activeElements.clear();
        }, 3000); // Wait 3 seconds to let animations complete (like a long hover)
    }
    
    handleTouchMove(e) {
        // If user moves finger significantly, cancel feedback
        const touch = e.touches[0];
        this.activeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isStillOver = touch.clientX >= rect.left && 
                               touch.clientX <= rect.right && 
                               touch.clientY >= rect.top && 
                               touch.clientY <= rect.bottom;
            
            if (!isStillOver) {
                this.deactivateFeedback(element);
                this.activeElements.delete(element);
            }
        });
    }
    
    findTouchFeedbackElement(target) {
        // Walk up the DOM tree to find an element with touch feedback
        let element = target;
        while (element && element !== document.body) {
            if (element.classList && element.classList.contains('touch-feedback')) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }
    
    activateFeedback(element, touch) {
        if (this.activeElements.has(element)) return;
        
        this.activeElements.add(element);
        element.classList.add('touch-active');
        
        // Position the ripple effect at touch point
        const rect = element.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        // Update CSS custom properties for ripple position
        element.style.setProperty('--touch-x', `${x}px`);
        element.style.setProperty('--touch-y', `${y}px`);
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(10); // Very subtle vibration
        }
    }
    
    deactivateFeedback(element) {
        element.classList.remove('touch-active');
        
        // Clean up after animation
        setTimeout(() => {
            element.style.removeProperty('--touch-x');
            element.style.removeProperty('--touch-y');
        }, 600);
    }
}

// Enhanced Touch Feedback with Custom Positioning
function enhanceTouchFeedback() {
    // Update CSS to use custom properties for positioning
    const style = document.createElement('style');
    style.textContent = `
        .touch-feedback::before {
            top: var(--touch-y, 50%);
            left: var(--touch-x, 50%);
        }
        
        /* Enhanced feedback for specific elements */
        /* Project cards use CSS-only animations - no JS transform */
        
        .navbar .menu li a.touch-feedback.touch-active {
            color: #d6212e;
            transition: color 0.1s ease-out;
        }
        
        button.touch-feedback.touch-active,
        .home .home-content a.touch-feedback.touch-active,
        .about .about-content .right a.touch-feedback.touch-active {
            transform: scale(0.96);
            transition: transform 0.1s ease-out;
        }
        
        input.touch-feedback.touch-active,
        textarea.touch-feedback.touch-active {
            transform: scale(1.02);
            transition: transform 0.1s ease-out;
        }
        
        /* Restore normal state after touch - exclude project cards */
        .touch-feedback:not(.touch-active):not(.projects .card) {
            transform: scale(1) !important;
            transition: transform 0.2s ease-out !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize Smart Preloader
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on good connections to avoid wasting bandwidth
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const isGoodConnection = !connection.saveData && 
                                (connection.effectiveType === '4g' || 
                                 connection.effectiveType === '3g');
        
        if (isGoodConnection) {
            new SmartPreloader();
        }
    } else {
        // Fallback: initialize on desktop with good assumed connection
        if (window.innerWidth > 768) {
            new SmartPreloader();
        }
    }
    
    // Initialize Mobile Touch Feedback
    new MobileTouchFeedback();
    enhanceTouchFeedback();
    
    // Initialize new features
    initScrollProgress();
    initSectionNavigation();
    initEnhancedFormValidation();
});

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial update
    updateScrollProgress();
}

// Section Navigation Dots
function initSectionNavigation() {
    const sections = ['home', 'about', 'projects', 'contact'];
    const sectionNames = ['Home', 'About', 'Projects', 'Contact'];
    let currentSection = 0;
    let hideTimeout;
    let isScrolling = false;
    
    // Create navigation container
    const nav = document.createElement('div');
    nav.className = 'section-nav';
    
    // Create dots for each section
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'section-nav-dot';
        dot.setAttribute('data-section', sectionNames[index]);
        dot.addEventListener('click', () => {
            showNavigation();
            document.getElementById(section).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
        nav.appendChild(dot);
    });
    
    document.body.appendChild(nav);
    
    // Show navigation dots
    function showNavigation() {
        nav.classList.add('show');
        clearTimeout(hideTimeout);
        
        // Hide after 3 seconds of no interaction
        hideTimeout = setTimeout(() => {
            if (!isScrolling) {
                nav.classList.remove('show');
            }
        }, 3000);
    }
    
    // Hide navigation dots
    function hideNavigation() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            nav.classList.remove('show');
        }, 1000);
    }
    
    // Update active dot and detect section changes
    function updateActiveDot() {
        const scrollY = window.scrollY + window.innerHeight / 2;
        let activeIndex = 0;
        
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = window.scrollY + rect.top;
                const elementBottom = elementTop + rect.height;
                
                if (scrollY >= elementTop && scrollY <= elementBottom) {
                    activeIndex = index;
                }
            }
        });
        
        // Check if section changed
        if (activeIndex !== currentSection) {
            currentSection = activeIndex;
            showNavigation(); // Show dots when section changes
        }
        
        // Update active state
        nav.querySelectorAll('.section-nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Scroll detection
    let scrollTimeout;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveDot();
                ticking = false;
            });
            ticking = true;
        }
        
        // Detect when scrolling stops
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            hideNavigation();
        }, 150);
        
    }, { passive: true });
    
    // Show on mouse movement near the right edge
    document.addEventListener('mousemove', (e) => {
        const windowWidth = window.innerWidth;
        const rightEdgeZone = windowWidth - 100; // 100px from right edge
        
        if (e.clientX > rightEdgeZone && windowWidth > 768) {
            showNavigation();
        }
    }, { passive: true });
    
    // Initial update
    updateActiveDot();
}

// Enhanced Form Validation
function initEnhancedFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const formFields = form.querySelectorAll('.form-field');
    
    // Setup validation for each field
    formFields.forEach(wrapper => {
        const field = wrapper.querySelector('input, textarea');
        const errorMsg = wrapper.querySelector('.field-error');
        
        if (!field || !errorMsg) return;
        
        // Real-time validation
        field.addEventListener('blur', () => {
            validateField(field, wrapper, errorMsg);
        });
        
        field.addEventListener('input', () => {
            // Only update validation state, don't clear errors too aggressively
            const isValid = checkFieldValidity(field);
            const hasValue = field.value.trim();
            
            if (isValid && hasValue) {
                // Field is valid and has content - show success
                wrapper.classList.remove('error');
                wrapper.classList.add('success');
                errorMsg.textContent = '';
            } else if (!hasValue) {
                // Field is empty - clear all states
                wrapper.classList.remove('success', 'error');
                errorMsg.textContent = '';
            }
            // If field has content but is invalid, keep existing error state
            // This prevents the error from disappearing while user is still typing
        });
        
        // Clear states when field loses focus if empty
        field.addEventListener('focusout', () => {
            if (!field.value.trim()) {
                wrapper.classList.remove('success', 'error');
                errorMsg.textContent = '';
            }
        });
    });
    
    // Form submission validation
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        let hasErrors = false;
        
        // First, validate all fields and force error display
        formFields.forEach(wrapper => {
            const field = wrapper.querySelector('input, textarea');
            const errorMsg = wrapper.querySelector('.field-error');
            
            if (!validateField(field, wrapper, errorMsg)) {
                isValid = false;
                hasErrors = true;
            }
        });
        
        // Double-check: also verify no error classes exist
        const errorFields = form.querySelectorAll('.form-field.error');
        if (errorFields.length > 0) {
            hasErrors = true;
            isValid = false;
        }
        
        // Additional check: validate field contents directly
        const nameField = form.querySelector('input[name="name"]');
        const emailField = form.querySelector('input[name="email"]');
        const subjectField = form.querySelector('input[name="subject"]');
        const messageField = form.querySelector('textarea[name="message"]');
        
        if (!nameField?.value.trim() || nameField.value.trim().length < 2) {
            isValid = false;
        }
        
        if (!emailField?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
            isValid = false;
        }
        
        if (!subjectField?.value.trim() || subjectField.value.trim().length < 3) {
            isValid = false;
        }
        
        if (!messageField?.value.trim() || messageField.value.trim().length < 10) {
            isValid = false;
        }
        
        // Only submit if all validations pass
        if (isValid && !hasErrors) {
            await submitForm(form);
        } else {
            // Show an alert or message if there are still errors
            console.log('Form submission prevented due to validation errors');
            
            // Show user-friendly message
            showMessage('Please fix the errors below before submitting.', 'error');
            
            // Scroll to first error field
            const firstErrorField = form.querySelector('.form-field.error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const inputField = firstErrorField.querySelector('input, textarea');
                if (inputField) {
                    setTimeout(() => inputField.focus(), 300);
                }
            }
        }
    });
}

function checkFieldValidity(field) {
    const value = field.value.trim();
    
    // Required field validation
    if (!value) {
        return false;
    }
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
    
    // Message length validation
    if (field.name === 'message' && value.length < 10) {
        return false;
    }
    
    // Name validation (at least 2 characters)
    if (field.name === 'name' && value.length < 2) {
        return false;
    }
    
    // Subject validation (at least 3 characters)
    if (field.name === 'subject' && value.length < 3) {
        return false;
    }
    
    return true;
}

function validateField(field, wrapper, errorMsg) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Get field name for display
    const fieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
    
    // Required field validation
    if (!value) {
        isValid = false;
        message = `${fieldName} is required`;
    }
    // Email validation
    else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    // Name validation
    else if (field.name === 'name' && value.length < 2) {
        isValid = false;
        message = 'Name must be at least 2 characters long';
    }
    // Subject validation
    else if (field.name === 'subject' && value.length < 3) {
        isValid = false;
        message = 'Subject must be at least 3 characters long';
    }
    // Message length validation
    else if (field.name === 'message' && value.length < 10) {
        isValid = false;
        message = 'Message must be at least 10 characters long';
    }
    
    // Always update UI based on validation result
    if (!isValid) {
        wrapper.classList.add('error');
        wrapper.classList.remove('success');
        errorMsg.textContent = message;
    } else {
        wrapper.classList.remove('error');
        wrapper.classList.add('success');
        errorMsg.textContent = '';
    }
    
    return isValid;
}

async function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');
    
    // Disable form during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    form.classList.add('submitting');
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        
        // Submit to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form with animation
            setTimeout(() => {
                form.reset();
                form.querySelectorAll('.form-field').forEach(wrapper => {
                    wrapper.classList.remove('success', 'error');
                    wrapper.querySelector('.field-error').textContent = '';
                });
            }, 1000);
            
        } else {
            throw new Error('Network response was not ok');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        // Re-enable form
        submitButton.disabled = false;
        submitButton.textContent = 'Send message';
        form.classList.remove('submitting');
    }
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Add overlay pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes overlay-pulse {
        0%, 100% { background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%); }
        50% { background: linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 50%, #141414 100%); }
    }
`;
document.head.appendChild(style);
