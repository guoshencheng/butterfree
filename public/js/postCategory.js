$(function() {
  var template =  doT.template($("#post-cate-editor").html());
  var table = $('#cate-table').DataTable({
    searching: false,
    ordering: false,
    pageLength: 10,
    lengthChange: false,
    processing: true,
    paging: false,
    autoWidth: false,
    ajax: {
      url: '/api/v1/posts/categories',
      dataSrc: function(data) {
        return data.data;
      }
    },
    columns: [{
      data: 'id'
    }, {
      data: null,
      render: function(data) {
        return '<span class="name-container">' + data.name + '</span>'
      }
    }, {
      data: null,
      render: function(data) {
        return '<span class="desc-container">' + data.description + '</span>'
      },
      width: '300'
    }, {
      data: null,
      render: function(data) {
        return '<span class="operation-container" data-id="' + data.id + '">' +
        '<a class="fa fa-edit" href="javascript:void(0)" ></a>' +
        '</span>'
      }
    }]
  });

  function createOrEdit(id, params) {
    params = params || {};
    var index = layer.open({
      type: 1,
      title: '编辑tip',
      btn: ['确定', '取消'],
      zIndex: 99,
      area: ['400px', '350px'],
      content: template($.extend({ id: id }, params)),
      yes: function() {
        var postCategoryForm = $('#post-cate-form');;
        var params = postCategoryForm.serializeObject();
        const callback = function(res) {
          if (res.success) {
            layer.close(index);
            table.ajax.reload();
          } else {
            layer.alert(res.message)
          }
        }
        $.ajax({
          method: id ? 'PUT' : 'POST',
          data: params,
          url: id ? ('/api/v1/posts/categories/' + id) : '/api/v1/posts/categories'
        }).then(callback)
      }
    })
  }
  $('.create-cate').on('click', function() {
    createOrEdit();
  })
  $('body').on('click', '.fa-edit', function() {
    var name = $(this).closest('tr').find('.name-container').text();
    var description = $(this).closest('tr').find('.desc-container').text();
    var id = $(this).closest('tr').find('.operation-container').data('id');
    console.log(name, description, id)
    createOrEdit(id, { name: name, description: description })
  })
})
