$(function() {

  function buildHTML(comment){

     var image = message.image.url? 
     `<img src="${message.image.url}", class = 'lower-message-image'>` : "";
 
     var html = `<p>
                   <strong>
                     <a href=/users/${comment.user.id}>${comment.user.name}>${message.image.url}</a>
                     :
                   </strong>
                   ${comment.message.content}
                 </p>`
     return html;

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

  
    function ScrollToNewMessage() {
      $('.chat__message').animate({scrollTop: $('.chat__message')[0].scrollHeight}, 'fast');
   }
   var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id"); 

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id} 
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
});