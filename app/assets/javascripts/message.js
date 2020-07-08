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

  $(".Form").on("submit", function(e) {
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.main').append(html)
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight})
      $('form')[0].reset()
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    })
    .always(function(){
      $(".send").prop("disabled", false)
    })
  })
});

$(function(){
  let reloadMessages = function() {
    let last_message_id = $('.messages:last').data("message-id");
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
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});