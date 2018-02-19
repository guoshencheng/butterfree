$(function() {
  var id = $('#id').val();
  $('.submit-button').on('click', function() {
    const postForm = $('#post');;
    const params = postForm.serializeObject();
    $.ajax({
      method: 'PUT',
      url: '/api/v1/posts/' + id,
      data: $.extend({}, params, { id: id })
    }).then(function(response) {
      if (response.success) {
        layer.confirm('修改成功!', {
          btn: ['确定']
        }, function(){
          window.location.href = '/posts';
        });
      } else {
        layer.alert(res.message)
      }
    })
  })
})
