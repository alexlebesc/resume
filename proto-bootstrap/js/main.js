/**
 * Created by alex on 08/05/17.
 */

console.log('test');

var fullHeight = function() {
    console.log('hey');

   $('.full-height').each(function(){
        var el = $(this);
        var row = el.closest('.row');

        el.height(row.height());
    });
};

fullHeight();


$('.collapse')
    .on('show.bs.collapse', function () { fullHeight(); })
    .on('shown.bs.collapse', function () { fullHeight(); })
    .on('hide.bs.collapse', function () { fullHeight(); })
    .on('hidden.bs.collapse', function () { fullHeight(); });
