$(document).ready(function() {
    // Navigation Toggle
    $('#navToggle').click(function(e) {
        e.stopPropagation();
        $('.nav-links').toggleClass('active');
    });

    // Close menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.navbar').length) {
            $('.nav-links').removeClass('active');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').click(function(event) {
        const href = $(this).attr('href');
        if (href !== "#") {
            event.preventDefault();
            const offset = $(href).offset();
            if (offset) {
                $('html, body').animate({
                    scrollTop: offset.top - 70
                }, 500);
            }
        }
    });

    // Language toggle functionality
    window.toggleLanguage = function() {
        const currentLang = $('.language-switch button').text();
        if (currentLang.includes('EN')) {
            $('.language-switch button').text('বাং | EN');
            // Add Bengali translation logic here
        } else {
            $('.language-switch button').text('EN | বাং');
            // Add English translation logic here
        }
    };

    // Fare Calculator
    $('.calculate-btn').click(function() {
        const fromStation = $('#fromStation').val();
        const toStation = $('#toStation').val();
        
        // Simple fare calculation logic (replace with actual fare logic)
        let fare = 100; // Base fare
        let time = 25; // Base time

        if (fromStation === toStation) {
            fare = 20;
            time = 0;
        } else {
            // Add more complex fare calculation based on stations
            const stations = ['Uttara North', 'Agargaon', 'Farmgate', 'Motijheel'];
            const startIndex = stations.indexOf(fromStation);
            const endIndex = stations.indexOf(toStation);
            const stationCount = Math.abs(endIndex - startIndex);
            
            fare = 20 + (stationCount * 5);
            time = stationCount * 8;
        }

        $('.fare-amount').text('৳ ' + fare);
        $('.journey-time').text('Estimated time: ' + time + ' mins');
    });

    // Map zoom controls
    let scale = 1;
    $('.zoom-in').click(function() {
        scale = Math.min(scale + 0.1, 2);
        $('.route-map-img').css('transform', `scale(${scale})`);
    });

    $('.zoom-out').click(function() {
        scale = Math.max(scale - 0.1, 0.5);
        $('.route-map-img').css('transform', `scale(${scale})`);
    });

    // Live schedule updates simulation
    function updateSchedule() {
        $('.schedule-row').each(function() {
            const random = Math.random();
            if (random < 0.2) { // 20% chance of delay
                const delay = Math.floor(Math.random() * 10) + 1;
                $(this).find('.status')
                    .removeClass('on-time')
                    .addClass('delayed')
                    .text(delay + ' min late');
            }
        });
    }

    // Update schedule every 30 seconds
    setInterval(updateSchedule, 30000);

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = $('<div>', {
            class: `notification ${type}`,
            html: `<div class="notification-content">${message}</div>
                   <button class="notification-close">&times;</button>`
        }).appendTo('body');

        notification.find('.notification-close').click(function() {
            notification.fadeOut(() => notification.remove());
        });

        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 5000);
    }

    // Show welcome notification on first visit
    if (!localStorage.getItem('visitedBefore')) {
        showNotification('Welcome to Dhaka Metro Rail! Plan your journey with ease.');
        localStorage.setItem('visitedBefore', 'true');
    }

    // Newsletter subscription
    $('.subscribe-form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            $(this).find('input[type="email"]').val('');
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.feature-card, .news-card, .action-card').each(function() {
            const elementTop = $(this).offset().top;
            const viewportTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (elementTop < viewportTop + windowHeight - 100) {
                $(this).addClass('animate');
            }
        });
    }

    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Initial check for visible elements
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        max-width: 400px;
    }

    .notification.success {
        background: var(--primary-color);
    }

    .notification.error {
        background: #e74c3c;
    }

    .notification-content {
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.5rem;
        padding: 0;
        line-height: 1;
    }

    .feature-card, .news-card, .action-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }

    .feature-card.animate, .news-card.animate, .action-card.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .route-map-img {
        transition: transform 0.3s ease-out;
        transform-origin: center;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);