$(document).ready(function() {
    // Form Validation and Submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        // Basic validation
        let isValid = true;
        let errorMessage = '';

        if (!formData.name.trim()) {
            isValid = false;
            errorMessage = 'Please enter your name';
        } else if (!isValidEmail(formData.email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (!formData.subject.trim()) {
            isValid = false;
            errorMessage = 'Please enter a subject';
        } else if (!formData.message.trim()) {
            isValid = false;
            errorMessage = 'Please enter your message';
        }

        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }

        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        // Here you would typically make an AJAX call to your backend
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            this.reset();
        }, 2000);
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show notification helper
    function showNotification(message, type = 'info') {
        const notification = $('<div>', {
            class: `notification ${type}`,
            text: message
        }).appendTo('body');

        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 3000);
    }

    // FAQ Accordion functionality
    $('.faq-question').click(function() {
        const faqItem = $(this).parent();
        const answer = faqItem.find('.faq-answer');
        
        // If this item is already active
        if (faqItem.hasClass('active')) {
            faqItem.removeClass('active');
            answer.css('max-height', '0');
        } else {
            // Close other active FAQs
            $('.faq-item.active').removeClass('active')
                .find('.faq-answer').css('max-height', '0');
            
            // Open this FAQ
            faqItem.addClass('active');
            answer.css('max-height', answer[0].scrollHeight + 'px');
        }
    });

    // Form input animation
    $('.contact-form input, .contact-form textarea').on('focus', function() {
        $(this).parent('.form-group').addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent('.form-group').removeClass('focused');
        }
    });

    // Initialize Google Maps (if you have an API key)
    // function initMap() {
    //     const location = { lat: 23.7937, lng: 90.4066 }; // Dhaka coordinates
    //     const map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 15,
    //         center: location
    //     });
    //     const marker = new google.maps.Marker({
    //         position: location,
    //         map: map,
    //         title: 'Dhaka Metro Rail Headquarters'
    //     });
    // }

    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }

        .notification.success {
            background: var(--primary-color);
            color: white;
        }

        .notification.error {
            background: #ff4444;
            color: white;
        }

        .notification.info {
            background: #0099cc;
            color: white;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);

    // Optional: Add smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });

    // Optional: Add form field character counter
    $('textarea[maxlength]').on('input', function() {
        const maxLength = $(this).attr('maxlength');
        const currentLength = $(this).val().length;
        const remaining = maxLength - currentLength;
        
        let counter = $(this).next('.char-counter');
        if (!counter.length) {
            counter = $('<div>', {
                class: 'char-counter',
                text: `${remaining} characters remaining`
            }).insertAfter(this);
        } else {
            counter.text(`${remaining} characters remaining`);
        }
    });
});