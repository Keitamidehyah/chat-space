$(function() {

  function buildHTML(comment){

     var image = comment.image? `<img src="${comment.image}", class = 'lower-message-image'>` : "";

 
     var html = `<div class="message" data-message-id="${comment.id}"> 
     <div class="upper-message">
       <div class="upper-message__user-name">
         ${comment.user_name}
       </div>
       <div class="upper-message__date">
         ${comment.created_at}
       </div>
     </div>
     <div class="lower-meesage">
       <p class="lower-message__content">
         ${comment.content}
       </p>
       ${image}
     </div>
   </div>`
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
                 $('.messages').append(html);
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
     var last_message_id = $('.messages .message:last').data('messageId');
     $.ajax({ 
      url: "api/messages", 
      data: {id: last_message_id},
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
