(function ($) {
    $.fn.scrollingTo = function (opts) {
        var defaults = {
            animationTime: 1000,
            easing: '',
            callbackBeforeTransition: function () {},
            callbackAfterTransition: function () {}
        };
        var config = $.extend({}, defaults, opts);
        $(this).click(function (e) {
            var eventVal = e;
            e.preventDefault();
            var $section = $(document).find($(this).data('section'));
            if ($section.length < 1) {
                return false;
            };

            if ($('html, body').is(':animated')) {
                $('html, body').stop(true, true);
            };
            var scrollPos = $section.offset().top;
            if ($(window).scrollTop() == scrollPos) {
                return false;
            };
            config.callbackBeforeTransition(eventVal, $section);
            $('html, body').animate({
                'scrollTop': (scrollPos + 'px' )
            }, config.animationTime, config.easing, function () {
                config.callbackAfterTransition(eventVal, $section);
            });
        });
    };
    new WOW().init();
    (function () {
        jQuery('.smooth-scroll').scrollingTo();
    }());
    $("#contact-form").on('submit', function (e) {
        $.ajax({
            url: '/api/contact/info',
            dataType: 'text',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: $('#contact-form').serialize(),
            success: function (data, textStatus, jQxhr) {
                var _successHtml = '';
                _successHtml += '<div class="success_msg alert alert-success">';
                _successHtml += '<span>' + jQuery.parseJSON(data).message + '</span>';
                _successHtml += '<span><i class="fa fa-2x fa-check" aria-hidden="true"></i></span>';
                _successHtml += '</div>';
                $('#resMessage').html('');
                $('#resMessage').html(_successHtml);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                var _errorHtml = '';
                _errorHtml += '<div class="error_msg alert alert-danger">';
                if (_formId !== 'newsletterForm') {
                    _errorHtml += '<span>OOPS!!! Something went wrong.</span>';
                } else {
                    var _errorMessage = jQuery.parseJSON(jqXhr.responseText);
                    if (typeof _errorMessage === 'object' && !Array.isArray(_errorMessage.message) && _errorMessage !== null) {
                        _errorHtml += '<span>' + _errorMessage.message + '</span>';
                    } else {
                        _errorHtml += '<span>OOPS!!! Something went wrong.</span>';
                    }
                }
                _errorHtml += '<span><i class="fa fa-2x fa-close" aria-hidden="true"></i></span>';
                _errorHtml += '</div>';
                $('#resMessage').html('');
                $('#resMessage').html(_errorHtml);
            }
        });
        $(this).trigger('reset');
        e.preventDefault();
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $(".navbar-brand a").css("color", "#fff");
            $("#top-bar").removeClass("animated-header");
        } else {
            $(".navbar-brand a").css("color", "inherit");
            $("#top-bar").addClass("animated-header");
        }
    });
registerServiceWorker();
    function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            // Service worker is not supported on this platform
            return;
        }
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister()
            }
        });
    }
}(jQuery));