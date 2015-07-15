$(function(){

  // AJAX call to remove article
  $('.remove').on('click',function(event){
    var removeButton = $(this);
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'Click "Yes" to remove this article from your Trellis.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm) {
      if (isConfirm) {
        swal('Pruned!', 'You have removed the article from your Trellis.', 'success');
        var myUrl = removeButton.attr('href');
        $.ajax({
          method:'DELETE',
          url:myUrl,
        }).done(function(data){
          removeButton.closest('tr').fadeOut(1500,function(){
            removeButton.remove(); // Fade out article on profile page.
          });
        });
      } else {
        swal('Cancelled', 'The article is still saved in your Trellis.', 'error');
      }
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
      swal('Article Saved!', 'Head to your Trellis to read it if you\'re saving it for later!', 'success');
      $('#trellis-form').fadeOut(1000); // Fade out save button on show page.
    });
  });

  // Disable spacebar in search box.
  $('#search-box').keydown(function(e){
    if(e.keyCode == 32){
      return false;
    }
  });

});