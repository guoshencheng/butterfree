$(function() {
  var table = $('#tips-table').DataTable({
    searching: false,
    ordering: false,
    pageLength: 10,
    lengthChange: false,
    processing: true,
    paging: false,
    autoWidth: false,
    ajax: {
      url: '/api/v1/tips',
      dataSrc: function(data) {
        return data.data;
      }
    },
    columns: [{
      data: 'id'
    }, {
      data: 'tipText'
    }, {
      data: null,
      render: function(data) {
        return '<span class="operation-container" data-id="' + data.id + '">' +
        '<a class="fa fa-edit" href="/posts/' + data.id + '" ></a>' +
        '</span>'
      }
    }]
  });
  $('.create-tip').on('click', function() {
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
