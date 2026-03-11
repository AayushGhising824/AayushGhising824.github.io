// Theme Toggle Functionality
class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Add click event listener
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update the theme toggle icon
        this.updateThemeIcon(theme);
    }

    updateThemeIcon(theme) {
        const darkIcon = this.themeToggle.querySelector('.theme-icon-dark');
        const lightIcon = this.themeToggle.querySelector('.theme-icon-light');
        
        if (theme === 'light') {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        } else {
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        }
    }
}

// Enhanced animations and interactions
class EnhancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateGeometricShapes();
        this.addParallaxEffect();
        this.enhanceScrollAnimations();
        this.addMicroInteractions();
    }

    animateGeometricShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Random floating animation
            const randomDuration = 6 + Math.random() * 4;
            const randomDelay = Math.random() * 2;
            
            shape.style.animationDuration = `${randomDuration}s`;
            shape.style.animationDelay = `${randomDelay}s`;
            
            // Add rotation animation
            this.addRotationAnimation(shape, index);
        });
    }

    addRotationAnimation(shape, index) {
        const keyframes = `
            @keyframes rotate-${index} {
                0% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
                100% { transform: translateY(0) rotate(360deg); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        shape.style.animation = `rotate-${index} ${8 + index * 2}s ease-in-out infinite`;
    }

    addParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        const geometricShapes = document.querySelector('.geometric-shapes');
        
        if (heroSection && geometricShapes) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                
                geometricShapes.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }

    enhanceScrollAnimations() {
        // Enhanced intersection observer for better animations
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        this.addStaggerAnimation(entry.target);
                    }, index * 100);
                }
            });
        }, options);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    addStaggerAnimation(element) {
        // Add stagger effect to child elements
        const children = element.querySelectorAll('li, .skill-item, .achievement-item');
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `all 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    addMicroInteractions() {
        // Enhanced button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });

        // Card hover effects
        document.querySelectorAll('.experience-card, .education-content, .skill-category').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addCardGlow(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeCardGlow(e.target);
            });
        });

        // Tech item interactions
        document.querySelectorAll('.tech-item').forEach(item => {
            item.addEventListener('click', () => {
                this.animateTechItem(item);
            });
        });
    }

    createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    addCardGlow(card) {
        card.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.2)';
        card.style.transform = 'translateY(-5px)';
    }

    removeCardGlow(card) {
        card.style.boxShadow = '';
        card.style.transform = '';
    }

    animateTechItem(item) {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1) translateY(-5px)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        }, 100);
    }
}

// Enhanced typing effect with multiple phrases
class AdvancedTypingEffect {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title .title');
        if (this.heroTitle) {
            this.init();
        }
    }

    init() {
        const titles = [
            'IT Engineer',
            'Linux System Administrator',
            'Cybersecurity Enthusiast',
            'RHCSA Certified',
            'Network Administrator'
        ];
        
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let pauseDuration = 2000;
        
        const type = () => {
            const currentTitle = titles[titleIndex];
            
            if (!isDeleting) {
                // Typing
                this.heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
                
                if (charIndex === currentTitle.length) {
                    isDeleting = true;
                    typingSpeed = pauseDuration;
                }
            } else {
                // Deleting
                this.heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    titleIndex = (titleIndex + 1) % titles.length;
                    typingSpeed = 500;
                }
            }
            
            // Add cursor effect
            this.addCursorEffect();
            
            setTimeout(type, typingSpeed);
        };
        
        type();
    }

    addCursorEffect() {
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.cssText = `
            color: var(--primary-color);
            animation: blink 1s infinite;
            font-weight: normal;
        `;
        
        if (!this.heroTitle.querySelector('span')) {
            this.heroTitle.appendChild(cursor);
        }
    }
}

// Enhanced particle system
class AdvancedParticleSystem {
    constructor() {
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(this.canvas);
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 60;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00ff88' : '#00ccff',
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.02;
                particle.vy -= (dy / distance) * force * 0.02;
            }
            
            // Draw particle with pulse effect
            particle.pulsePhase += 0.02;
            const pulseSize = particle.radius + Math.sin(particle.pulsePhase) * 0.5;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced skill bars with better animations
class EnhancedSkillBars {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = false;
        this.init();
    }

    init() {
        if (this.skillBars.length > 0) {
            this.observeSkillsSection();
        }
    }

    observeSkillsSection() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            const progress = bar.dataset.progress;
            
            setTimeout(() => {
                // Animate to target progress
                bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = `${progress}%`;
                
                // Add glow effect during animation
                bar.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
                
                setTimeout(() => {
                    bar.style.boxShadow = '';
                }, 2000);
                
                // Add percentage counter
                this.addPercentageCounter(bar, progress);
            }, index * 200);
        });
    }

    addPercentageCounter(bar, targetProgress) {
        const counter = document.createElement('span');
        counter.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary-color);
            font-weight: 600;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
        `;
        
        const skillBar = bar.parentElement;
        skillBar.style.position = 'relative';
        skillBar.appendChild(counter);
        
        // Animate counter
        let currentProgress = 0;
        const increment = targetProgress / 50;
        const timer = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(timer);
            }
            counter.textContent = `${Math.round(currentProgress)}%`;
        }, 40);
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        });

        // Active navigation highlighting
        this.updateActiveLink();
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createObserver();
        this.animateOnScroll();
    }

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        // Observe elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateOnScroll() {
        // Add animation classes to elements
        const elements = [
            { selector: '.section-title', class: 'fade-in' },
            { selector: '.about-text', class: 'slide-in-left' },
            { selector: '.about-image', class: 'slide-in-right' },
            { selector: '.experience-card', class: 'fade-in' },
            { selector: '.skill-category', class: 'fade-in' },
            { selector: '.certification-card', class: 'fade-in' },
            { selector: '.education-item', class: 'fade-in' },
            { selector: '.learning-card', class: 'fade-in' },
            { selector: '.objective-content', class: 'fade-in' },
            { selector: '.contact-item', class: 'fade-in' },
            { selector: '.contact-form', class: 'fade-in' }
        ];

        elements.forEach(({ selector, class: animationClass }) => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add(animationClass);
                el.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
}

// Skills animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = false;
        this.init();
    }

    init() {
        if (this.skillBars.length > 0) {
            this.observeSkillsSection();
        }
    }

    observeSkillsSection() {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    animateSkills() {
        this.skillBars.forEach(bar => {
            const progress = bar.dataset.progress;
            setTimeout(() => {
                bar.style.width = `${progress}%`;
            }, 200);
        });
    }
}

// Contact form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Message sent successfully! I'll get back to you soon.</p>
        `;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #00ff88, #00ccff);
            color: #0a0a0a;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// Typing effect for hero section
class TypingEffect {
    constructor() {
        this.heroTitle = document.querySelector('.hero-title .title');
        if (this.heroTitle) {
            this.init();
        }
    }

    init() {
        const titles = [
            'IT Engineer',
            'Linux System Administrator',
            'Cybersecurity Enthusiast'
        ];
        
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                this.heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                this.heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500; // Pause before next title
            }

            setTimeout(type, typingSpeed);
        };

        type();
    }
}

// Particle background effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Resume download functionality
class ResumeDownload {
    constructor() {
        this.resumeBtn = document.getElementById('resume-btn');
        if (this.resumeBtn) {
            this.init();
        }
    }

    init() {
        this.resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.downloadResume();
        });
    }

    downloadResume() {
        // Create a sample resume text (replace with actual resume file)
        const resumeContent = `
AAYUSH GHISING
IT Engineer | Linux System Administrator | Cybersecurity Enthusiast

CONTACT
Email: aayushghising482@gmail.com
Phone: +977 9702075730
Location: Nepal

PROFESSIONAL SUMMARY
Motivated IT Engineer with hands-on experience in Linux systems, networking, and system administration. 
RHCSA certified with a strong foundation in cybersecurity principles and currently expanding expertise 
in application penetration testing.

EXPERIENCE
Software Shark Tech Pvt Ltd | IT Engineer | Dec 2025 – Present
• Manage and maintain Linux-based servers (RHEL/CentOS)
• Administer users, groups, and permissions using RBAC
• Monitor system performance and network metrics
• Configure network interfaces and firewalls
• Implement system hardening and security patches
• Automate tasks using Bash scripting
• Manage system backups and restoration procedures
• Handle technical support tickets
• Perform vulnerability assessments

SKILLS
• Linux System Administration (RHEL/CentOS)
• TCP/IP Fundamentals & Network Configuration
• System Hardening & Security Best Practices
• Bash Scripting & Linux CLI Tools
• Problem Solving & Technical Troubleshooting

CERTIFICATIONS
• RHCSA - Red Hat Certified System Administrator

EDUCATION
• Diploma in Computer Application - Global Computer Training Center
• SEE - Sunrise English Boarding School (2023)
• SLC - Manakamana Secondary English Boarding School
        `;

        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aayush_Ghising_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Toggle
    new ThemeToggle();

    // Initialize Matrix Rain (kept for compatibility)
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        const matrixRain = new MatrixRain(matrixCanvas);
        matrixRain.animate();
    }

    // Initialize enhanced animations
    new EnhancedAnimations();

    // Initialize Navigation
    new Navigation();

    // Initialize Scroll Animations
    new ScrollAnimations();

    // Initialize Enhanced Skill Bars
    new EnhancedSkillBars();

    // Initialize Contact Form
    new ContactForm();

    // Initialize Advanced Typing Effect
    new AdvancedTypingEffect();

    // Initialize Advanced Particle System
    new AdvancedParticleSystem();

    // Initialize Resume Download
    new ResumeDownload();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    body.loaded {
        overflow-x: hidden;
    }

    .success-message i {
        font-size: 1.5rem;
    }

    /* Enhanced hover effects */
    .responsibility-category h4:hover {
        transform: translateX(5px);
        transition: transform 0.3s ease;
    }

    .education-courses h4:hover,
    .education-achievements h4:hover,
    .education-grades h4:hover {
        transform: translateX(5px);
        transition: transform 0.3s ease;
    }

    /* Enhanced button animations */
    .btn {
        position: relative;
        overflow: hidden;
    }

    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }

    .btn:hover::before {
        left: 100%;
    }

    /* Enhanced card animations */
    .skill-category,
    .certification-card,
    .learning-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .skill-category:hover {
        transform: translateY(-10px) scale(1.02);
    }

    .certification-card:hover {
        transform: translateY(-10px) rotateZ(1deg);
    }

    .learning-card:hover {
        transform: translateY(-10px) rotateZ(-1deg);
    }

    /* Enhanced timeline animations */
    .education-item {
        opacity: 0;
        animation: fadeInUp 0.8s ease forwards;
    }

    .education-item:nth-child(1) { animation-delay: 0.2s; }
    .education-item:nth-child(2) { animation-delay: 0.4s; }
    .education-item:nth-child(3) { animation-delay: 0.6s; }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Enhanced stat item animations */
    .stat-item {
        animation: slideIn 0.6s ease forwards;
        opacity: 0;
    }

    .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stat-item:nth-child(3) { animation-delay: 0.3s; }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Enhanced tech stack animations */
    .tech-item {
        animation: bounceIn 0.6s ease forwards;
        opacity: 0;
    }

    .tech-item:nth-child(1) { animation-delay: 0.1s; }
    .tech-item:nth-child(2) { animation-delay: 0.2s; }
    .tech-item:nth-child(3) { animation-delay: 0.3s; }
    .tech-item:nth-child(4) { animation-delay: 0.4s; }

    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
