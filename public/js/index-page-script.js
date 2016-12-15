$(document).ready(function() {
    $("#owl-slider-images").owlCarousel({
        items : 1,
        lazyLoad : true,
        navigation : false,
        autoPlay: true
    });

    $("#partners-slider").owlCarousel({
        items : 4,
        lazyLoad : true,
        navigation : false,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
    });
});