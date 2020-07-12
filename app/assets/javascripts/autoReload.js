$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="message">
          <div class="message__info">
            <div class="message__info__name">
              ${ message.user_name }
            </div>
            <div class="message__info__date">
              ${ message.created_at }
            </div>
          </div>
          <div class="message__text">
            <p class="message__content">
              ${ message.content }
            </p>
            <img class="message__image" src="${ message.image }">
          </div>
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="messages" data-message-id=${message.id}>
        <div class="message">
          <div class="message__info">
            <div class="message__info__name">
              ${ message.user_name }
            </div>
            <div class="message__info__date">
              ${ message.created_at }
            </div>
          </div>
          <div class="message__text">
            <p class="message__content">
              ${ message.content }
            </p>
          </div>
        </div>
      </div>`
      return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.messages:last').data("message-id");
    if (last_message_id == undefined) {
      last_message_id = 0
    }
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main').append(insertHTML);
        $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});