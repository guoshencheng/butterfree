$(function() {
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
      data: 'name'
    }, {
      data: 'description',
      width: '300'
    }, {
      data: null,
      render: function(data) {
        return '<span class="operation-container" data-id="' + data.id + '">' +
        '<a class="fa fa-edit" href="/posts/' + data.id + '" ></a>' +
        '</span>'
      }
    }]
  });
})
