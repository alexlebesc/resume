/**
 * Created by alex on 08/05/17.
 */

$('.full-height').each(function(){
   var el = $(this);
   var row = el.closest('.row');

   el.height(row.height());
});
