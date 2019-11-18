$(function() {

  function buildHTML(comment){

     var image = comment.image? `<img src="${comment.image}", class = 'lower-message-image'>` : "";

 
     var html = `<p>
                   <strong>
                     <a href=/users/${comment.id}>${comment.user_name}>
                     ${image}
                     </a>
                   </strong>
                   ${comment.content}
                 </p>`
     return html;
    }

    function ScrollToNewMessage() {
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      ScrollToNewMessage();
                 $('.form__message').val('');
                 $(".form__submit").prop('disabled', false);
    })
    .fail (function(){
      alert('メッセージ送信に失敗しました');
    });
   });
   var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");  
      $.ajax({ 
        url: "api/messages", 
        data: {last_id: last_message_id},
        type: 'get', 
        dataType: 'json'
      })

      .done(function (messages) { 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
          ScrollToNewMessage();
      })
    })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
    setInterval(reloadMessages, 5000);
  });
