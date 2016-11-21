(function ($) {
    "use strict"; // Start of use strict
    registerServiceWorker();
    function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            // Service worker is not supported on this platform
            return;
        }
        navigator.serviceWorker.register('sw.js', {
            scope: '/'
        }).then(function (registration) {
            // console.log('Service worker is registered.');
            var isUpdate = false;
            // If this fires we should check if there's a new Service Worker
            // waiting to be activated. If so, ask the user to force refresh.
            if (registration.active) {
                isUpdate = true;
            }
            registration.onupdatefound = function (updateEvent) {
                console.log('A new version has been found...');
                // If an update is found the spec says that there is a new Service
                // Worker installing, so we should wait for that to complete then
                // show a notification to the user.
                registration.installing.onstatechange = function (event) {
                    if (this.state === 'installed') {
                        if (isUpdate) {
                            var message = "App updated. Restart for the new version.";
                            console.log(message);
                            var toastElem = document.querySelector('.toast-view');
                            if (toastElem) {
                                toastElem.textContent = message;
                                toastElem.classList.add('toast-view--visible');
                                setTimeout(function () {
                                    toastElem.classList.remove('toast-view--visible');
                                }, 5000);
                            }
                        }
                        // ToasterSingleton.getToaster().toast('App updated. Restart for the new version.');

                        else {
                            // ToasterSingleton.getToaster().toast('App ready for offline use.');
                            console.log('App ready for offline use.');

                        }
                    }
                }
            };

        })
            .catch(function (err) {
                console.log('Unable to register worker.', err);
            });
    }

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('.page-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        if ($(this).hasClass("page-scroll"))
            event.preventDefault();
    });
    $('.nav-external').on('click', function (event) {
        var $anchor = $(this);
        window.open($anchor.prop("href"));
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.member-img', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);


    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})
(jQuery); // End of use strict