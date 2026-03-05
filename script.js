// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Handle brochure downloads
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Let the link open normally - no preventDefault
        // This ensures the download/view happens immediately
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Contact form submission - Now handled by FormSubmit
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // FormSubmit handles the submission automatically
    // No custom JavaScript needed - form submits directly to email
    contactForm.addEventListener('submit', function(e) {
        // Let the form submit naturally to FormSubmit
        // Show a loading message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    });
}

// Project details buttons
document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projectName = this.closest('.project-card').querySelector('h3').textContent;
        
        // Create email for project inquiry
        const emailSubject = `Project Inquiry: ${projectName} - Aaryan Anuj Enterprises`;
        const emailBody = `
I am interested in learning more about ${projectName}.

Please provide me with:
- Detailed project information
- Pricing details
- Available units
- Site visit schedule
- Payment plans

Thank you.

---
Project: ${projectName}
Inquiry sent from: Aaryan Anuj Enterprises website
        `.trim();
        
        const mailtoLink = `mailto:xaaryananuj@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        setTimeout(() => {
            alert(`Your inquiry for ${projectName} has been sent. We will contact you soon with detailed information.`);
        }, 500);
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for project cards
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat-item h3');
            stats.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0+';
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .details-btn, .download-btn, button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '0.8rem 0';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.2)';
    } else {
        header.style.padding = '1.2rem 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    // Prevent form submission on button click
    const newsletterBtn = newsletterForm.querySelector('button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input.value && input.checkValidity()) {
                // Create email for newsletter subscription
                const emailSubject = 'Newsletter Subscription - Aaryan Anuj Enterprises';
                const emailBody = `
New newsletter subscription request:

Email: ${input.value}

Please add this email to the newsletter mailing list.

---
Subscribed from: Aaryan Anuj Enterprises website
                `.trim();
                
                const mailtoLink = `mailto:xaaryananuj@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                setTimeout(() => {
                    alert(`Thank you for subscribing! We'll send updates to ${input.value}`);
                    input.value = '';
                }, 500);
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
}
