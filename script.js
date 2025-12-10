// Pokethree Website JavaScript
// Modern web functionality

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a legal section (handled separately)
            if (href === '#privacy-policy' || href === '#terms-of-service') {
                return;
            }
            
            // Handle anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Button hover effects enhancement
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Legal sections functionality
    const legalCloseButtons = document.querySelectorAll('.legal-close');
    legalCloseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove hash from URL to close modal
            if (window.history.pushState) {
                window.history.pushState('', document.title, window.location.pathname);
            } else {
                window.location.hash = '';
            }
            // Hide the section
            const legalSection = this.closest('.legal-section');
            if (legalSection) {
                legalSection.style.display = 'none';
            }
        });
    });
    
    // Close legal sections when clicking outside
    const legalSections = document.querySelectorAll('.legal-section');
    legalSections.forEach(section => {
        section.addEventListener('click', function(e) {
            if (e.target === this) {
                if (window.history.pushState) {
                    window.history.pushState('', document.title, window.location.pathname);
                } else {
                    window.location.hash = '';
                }
                this.style.display = 'none';
            }
        });
    });
    
    // Handle hash changes for legal sections
    function handleHashChange() {
        const hash = window.location.hash;
        legalSections.forEach(section => {
            if (section.id === hash.substring(1)) {
                section.style.display = 'flex';
                setTimeout(() => {
                    section.style.opacity = '1';
                }, 10);
            } else {
                section.style.opacity = '0';
            }
        });
    }
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on page load
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close legal sections with Escape key
        if (e.key === 'Escape') {
            const openSection = document.querySelector('.legal-section:target');
            if (openSection) {
                if (window.history.pushState) {
                    window.history.pushState('', document.title, window.location.pathname);
                } else {
                    window.location.hash = '';
                }
                openSection.style.display = 'none';
            }
        }
        
        // Allow Enter key to activate buttons when focused
        if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
            document.activeElement.click();
        }
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
