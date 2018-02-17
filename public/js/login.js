$(function() {
  $('#login-btn').on('click', function() {
    console.log($(this).data('redirect'))
    const redirect = $(this).data('redirect') || '/'
    const loginForm = $('#login-form');
    const params = loginForm.serializeObject();
    $.ajax({
      method: 'post',
      url: '/api/login',
      data: params,
    }).then(function(data) {
      if (data.success) {
        layer.confirm('登陆成功!', {
          btn: ['确定']
        }, function(){
          window.location.href = redirect;
        });
      } else {
        layer.alert(data.message)
      }
    })
  })
})
