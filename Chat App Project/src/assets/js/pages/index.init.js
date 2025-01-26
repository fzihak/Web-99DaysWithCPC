/*
Template Name: Chatvia - Responsive Bootstrap 5 Chat App
Author: Themesbrand
Version: 2.4.0
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Index init js
*/

$(document).ready(function () {
    $('.popup-img').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });

    // user-status carousel

    $('#user-status-carousel').owlCarousel({
        items: 4,
        loop: false,
        margin: 16,
        nav: false,
        dots: false,
    });

    // chat input more link carousel
    $('#chatinputmorelink-carousel').owlCarousel({
        items: 2,
        loop: false,
        margin: 16,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 5,
                nav: false
            },
            992: {
                items: 8,
            }
        }
    });

    $("#user-profile-hide").click(function () {
        $(".user-profile-sidebar").hide();
    });
});


// collapse
const toggleButton = document.getElementById('toggleButton');
const collapseElement = document.getElementById('collapseElement');

toggleButton.addEventListener('click', () => {
    collapseElement.classList.toggle('hidden');
});



