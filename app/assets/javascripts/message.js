$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="messages">
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
      `<div class="messages">
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
      let html = buildHTML(data);
      $('.main').append(html);
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      $('form')[0].reset();
      $(".send").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});