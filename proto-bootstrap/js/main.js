/**
 * Created by alex on 08/05/17.
 */

var fullHeight = function() {
    $('.full-height').each(function(){
        var el = $(this);
        var row = el.closest('.row');

        el.height(row.height());
    });
};

// media query change
var WidthChange = function(mq) {
    if (mq.matches) {
        fullHeight();
    }
};

// media query event handler
if (matchMedia) {
    var mq = window.matchMedia( "(min-width: 992px)" );
    mq.addListener(WidthChange);
    WidthChange(mq);
} else {
    fullHeight();
}






