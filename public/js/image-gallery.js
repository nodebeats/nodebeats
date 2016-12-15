(function ($) {
    var first = 1;
    var $ps_albums = $('#ps_albums');
    var $ps_container = $('#ps_container');
    var $ps_overlay = $('#ps_overlay');
    var $ps_close = $('#ps_close');
    /**
     * when we click on an album,
     * we load with AJAX the list of pictures for that album.
     * we randomly rotate them except the last one, which is
     * the one the User sees first. We also resize and center each image.
     */
    $ps_albums.children('div').bind('click', function () {
        var $elem = $(this);
        var _hostUrl = location.protocol + '//' + location.host; //hostname for production website
        var album_id = $(this).prop('id');//'album' + parseInt($elem.index() + 1);
        var $loading = $('<div />', {class: 'loading'});
        $elem.append($loading);
        $ps_container.find('img').remove();
        $.get(_hostUrl + '/api/gallery/albumimage/' + album_id + '?active=true', function (data) {

            var _galleryImageList = data.dataList;
            var items_count = _galleryImageList.length;
            for (var i = 0; i < items_count; ++i) {
                var item_source = location.protocol + '//' + 'res.cloudinary.com/' + cloudinaryCloudName + '/image/upload/h_305,w_460/' + _galleryImageList[i].imageName;
                var cnt = 0;
                $('<img />').load(function () {
                    var $image = $(this);
                    ++cnt;
                    resizeCenterImage($image);
                    $ps_container.append($image);
                    var r = Math.floor(Math.random() * 41) - 20;
                    if (cnt < items_count) {
                        $image.css({
                            '-moz-transform': 'rotate(' + r + 'deg)',
                            '-webkit-transform': 'rotate(' + r + 'deg)',
                            'transform': 'rotate(' + r + 'deg)'
                        });
                    }
                    if (cnt == items_count) {
                        $loading.remove();
                        $ps_container.show();
                        $ps_close.show();
                        $ps_overlay.show();
                    }
                }).attr('src', item_source);
            }
        }, 'json');
    });
    /**
     * when hovering each one of the images,
     * we show the button to navigate through them
     */
    $ps_container.bind('mouseenter', function () {
        $('#ps_next_photo').show();
    }).bind('mouseleave', function () {
        $('#ps_next_photo').hide();
    });
    /**
     * navigate through the images:
     * the last one (the visible one) becomes the first one.
     * we also rotate 0 degrees the new visible picture
     */
    $('#ps_next_photo').bind('click', function () {
        var $current = $ps_container.find('img:last');
        var r = Math.floor(Math.random() * 41) - 20;
        var currentPositions = {
            marginLeft: $current.css('margin-left'),
            marginTop: $current.css('margin-top')
        };
        var $new_current = $current.prev();
        $current.animate({
            'marginLeft': '250px',
            'marginTop': '-385px'
        }, 250, function () {
            $(this).insertBefore($ps_container.find('img:first'))
                .css({
                    '-moz-transform': 'rotate(' + r + 'deg)',
                    '-webkit-transform': 'rotate(' + r + 'deg)',
                    'transform': 'rotate(' + r + 'deg)'
                })
                .animate({
                    'marginLeft': currentPositions.marginLeft,
                    'marginTop': currentPositions.marginTop
                }, 250, function () {
                    $new_current.css({
                        '-moz-transform': 'rotate(0deg)',
                        '-webkit-transform': 'rotate(0deg)',
                        'transform': 'rotate(0deg)'
                    });
                });
        });
    });

    /**
     * close the images view, and go back to albums
     */
    $('#ps_close').bind('click', function () {
        $ps_container.hide();
        $ps_close.hide();
        $ps_overlay.fadeOut(400);
    });
    /**
     * resize and center the images
     */
    function resizeCenterImage($image) {
        var theImage = new Image();
        theImage.src = $image.attr("src");
        var imgwidth = theImage.width;
        var imgheight = theImage.height;
        var containerwidth = 460;
        var containerheight = 330;
        var newwidth = 0;
        var ratio = 0;
        var newheight = 0;
        var newnewheight = 0;
        var newratio = 0;
        var newnewwidth = 0;
        if (imgwidth > containerwidth) {
            newwidth = containerwidth;
            ratio = imgwidth / containerwidth;
            newheight = imgheight / ratio;
            if (newheight > containerheight) {
                newnewheight = containerheight;
                newratio = newheight / containerheight;
                newnewwidth = newwidth / newratio;
                theImage.width = newnewwidth;
                theImage.height = newnewheight;
            }
            else {
                theImage.width = newwidth;
                theImage.height = newheight;
            }
        }
        else if (imgheight > containerheight) {
            newheight = containerheight;
            ratio = imgheight / containerheight;
            newwidth = imgwidth / ratio;
            if (newwidth > containerwidth) {
                newnewwidth = containerwidth;
                newratio = newwidth / containerwidth;
                newnewheight = newheight / newratio;
                theImage.height = newnewheight;
                theImage.width = newnewwidth;
            }
            else {
                theImage.width = newwidth;
                theImage.height = newheight;
            }
        }
        $image.css({
            'width': theImage.width,
            'height': theImage.height,
            'margin-top': -(theImage.height / 2) - 10 + 'px',
            'margin-left': -(theImage.width / 2) - 10 + 'px'
        });
    }
}(jQuery));