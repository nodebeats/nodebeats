/**
 * Created by lakhe on 8/17/16.
 */
$(document).ready(function () {
    $('#ChildVerticalTab_1').on('click', 'ul.resp-tabs-list > li', function(){
        var scrollClass = $(this).parents('#ChildVerticalTab_1').children('div.resp-tabs-container').find('div.docpanel:visible').prop('class');
        var targetClass= scrollClass.split(' ');
        $('html, body').animate({
            'scrollTop' : $('.' + targetClass[1]).position().top
        });
    });
});