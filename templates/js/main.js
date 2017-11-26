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

$('#portfolio').slick({
    arrows: false,
    slidesToShow: 2,
    autoplay: true,
    dots: true,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});





