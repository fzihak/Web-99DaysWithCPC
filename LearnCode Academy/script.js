// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.95)';
    } else if (currentScroll > lastScroll) {
        navbar.style.backgroundColor = 'rgba(26, 26, 46, 0.98)';
    }
    lastScroll = currentScroll;
});

// Animate features on scroll
const featureCards = document.querySelectorAll('.feature-card');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInOnScroll.observe(card);
});

// Testimonials functionality
const testimonials = [
    {
        text: "This platform transformed my career path. The interactive lessons made learning to code enjoyable and effective.",
        author: "Sarah Johnson",
        position: "Frontend Developer"
    },
    {
        text: "The best coding education platform I've ever used. The curriculum is well-structured and comprehensive.",
        author: "Michael Rodriguez",
        position: "Full Stack Developer"
    },
    {
        text: "I went from complete beginner to landing my dream job in tech within 6 months. The support from the community was incredible.",
        author: "David Kim",
        position: "Software Engineer"
    }
];

// Create testimonial slider structure
function createTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    
    // Create container for testimonials
    const container = document.createElement('div');
    container.className = 'testimonial-container';
    
    // Create testimonials
    testimonials.forEach(t => {
        const testimonial = document.createElement('div');
        testimonial.className = 'testimonial';
        testimonial.innerHTML = `
            <p>${t.text}</p>
            <div class="author">${t.author}</div>
            <div class="position">${t.position}</div>
        `;
        container.appendChild(testimonial);
    });
    
    // Create navigation dots
    const nav = document.createElement('div');
    nav.className = 'testimonial-nav';
    testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        nav.appendChild(dot);
    });
    
    // Add everything to slider
    slider.appendChild(container);
    slider.appendChild(nav);
}

let currentSlide = 0;

function changeSlide(direction) {
    const container = document.querySelector('.testimonial-container');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    currentSlide = (currentSlide + direction + testimonials.length) % testimonials.length;
    
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function goToSlide(index) {
    const container = document.querySelector('.testimonial-container');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    currentSlide = index;
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createTestimonialSlider();
    setInterval(() => changeSlide(1), 5000); // Change slide every 5 seconds
});

// Animate stats when they come into view
const statCards = document.querySelectorAll('.stat-card');

const animateStats = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('h3');
            const targetNumber = parseInt(numberElement.textContent);
            animateNumber(numberElement, targetNumber);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => {
    animateStats.observe(card);
});

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 24 ? '/7' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current) + (target === 24 ? '/7' : '+');
        }
    }, stepTime);
}

// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navItems = document.querySelector('.nav-items');
const body = document.body;

mobileMenuButton.addEventListener('click', () => {
    navItems.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navItems.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        navItems.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Add loading animation to course cards
const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});