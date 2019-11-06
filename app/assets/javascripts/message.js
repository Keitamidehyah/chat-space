$(function(){   
 function buildHTML(comment){
    var html = `<p>
                  <strong>
                    <a href=/users/${meessage.user_id}>${comment.user_name}</a>
                    :
                  </strong>
                  ${content.meessage}
                </p>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url)

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comments').append(html);
      $('.messagebox').val('');
      $('message').animate({scrollTop: $(messages)[0].scrollHeight});
      $('form').get(0).reset();
    })
    .fail (function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
   })
  })