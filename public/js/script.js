$(function(){

  // AJAX call to remove article
  $('.remove').on('click',function(event){
    event.preventDefault();
    var removeButton = $(this);
    if(confirm('Would you really like to remove this article?'));
      var myUrl = $(this).attr('href');
      $.ajax({
        method:'DELETE',
        url:myUrl,
      }).done(function(data){
        // console.log(data);
        removeButton.closest('tr').fadeOut(1500,function(){
          $(this).remove();
        })
      });
  });

  // AJAX call to save article.
  $('#trellis-form').on('click',function(event){
    event.preventDefault();
    var myUrl = $(this).attr('action');
    var myData = $(this).serialize();
    $.ajax({
      method:'POST',
      url:myUrl,
      data:myData
    }).done(function(data){
      $('#trellis-form').fadeOut(1000);
    })
  });

});

console.log('Goliath Online.')