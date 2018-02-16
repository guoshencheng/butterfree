$(function() {
  $('#login-btn').on('click', function() {
    const loginForm = $('#login-form');
    const params = loginForm.serializeObject();
    $.ajax({
      method: 'post',
      url: '/api/login'
    }).then(function(data) {
      console.log(data)
    })
  })
})
