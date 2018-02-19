$(function() {
  var table = $('#posts-table').DataTable({
    searching: false,
    ordering: false,
    pageLength: 10,
    lengthChange: false,
    processing: true,
    paging: false,
    autoWidth: false,
    ajax: {
      url: '/api/v1/posts',
      dataSrc: function(data) {
        return data.data;
      }
    },
    columns: [{
      data: 'id'
    }, {
      data: 'title'
    }, {
      data: 'short',
      width: '300'
    }, {
      data: 'status'
    }, {
      data: null,
      render: function(data) {
        var statusOp = data.status == 1 ? '下线' : '上线';
        return '<span class="operation-container" data-id="' + data.id + '">' +
        '<a class="fa fa-edit" href="/posts/' + data.id + '" ></a>' +
        '<a class="fa change-status" href="javascript:void(0)" data-status="' + data.status + '" >' + statusOp + '</a>' +
        '</span>'
      }
    }]
  });
  $('body').on('click', '.change-status', function() {
    var status = $(this).data('status');
    var id = $(this).parent().data('id');
    var url = '/api/v1/posts/' + id + '/status/' + (status == 1 ? 0 : 1)
    $.ajax({
      method: 'put',
      url: url
    }).then(function(res) {
      if (res.success) {
        table.ajax.reload();
      } else {
        layer.alert(res.message)
      }
    })
  })
  $('.create-post').on('click', function() {
    $.ajax({
      method: 'post',
      url: '/api/v1/posts/empty'
    }).then(function(res) {
      if (res.success) {
        window.location.href = '/posts/' + res.data.id
      } else {
        layer.alert(res.message)
      }
    })
  })
})
