/**
 * Created by alex on 08/05/17.
 */


$('.full-height-reference').each(function() {
    var $el = $(this);
    $el.siblings('.full-height').each(function() {
        $(this).height($el.height());
    });

    new ResizeSensor($el, function() {
        $el.siblings('.full-height').each(function() {
           $(this).height($el.height());
        });
    });
});





