$(function() {
  $('#login-btn').on('click', function() {
    const loginForm = $('#login-form');
    const params = loginForm.serializeObject();
    $.ajax({
      method: 'post',
      url: '/api/login',
      data: params,
    }).then(function(data) {
      if (data.success) {
        window.location.href = '/'
      } else {
        alert(data.message)
      }
    })
  })
})
