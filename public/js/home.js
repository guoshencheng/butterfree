$(function() {
  var table = $('#posts-table').DataTable({
    searching: false,
    ordering: false,
    pageLength: 10,
    lengthChange: false,
    processing: true,
    paging: false,
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
      data: 'short'
    }, {
      data: 'status'
    }, {
      data: null,
      render: function(data) {
        return '<div></div>'
      }
    }]
  });
})
