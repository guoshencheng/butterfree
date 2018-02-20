$(function() {
  var template =  doT.template($("#TipEditor").html());
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
      data: null,
      render: function(data) {
        return '<span class="tipTextContainer">' + data.tipText +'</span>'
      }
    }, {
      data: null,
      render: function(data) {
        return '<span class="operation-container" data-id="' + data.id + '">' +
        '<a class="fa fa-edit" href="javascript:void(0)" data-id="' + data.id + '"></a>' +
        '</span>'
      }
    }]
  });
  function createOrEdit(id, tipText) {
    var params = { id: id || '', tipText: tipText || '' }
    var index = layer.open({
      type: 1,
      title: '编辑tip',
      btn: ['确定', '取消'],
      zIndex: 99,
      area: ['400px', '350px'],
      content: template(params),
      yes: function() {
        var tipForm = $('#tipform');;
        var params = tipForm.serializeObject();
        if (id) {
          $.ajax({
            method: 'PUT',
            url: '/api/v1/tips/' + id,
            data: params
          }).then(function(res) {
            if (res.success) {
              layer.close(index);
              table.ajax.reload();
            } else {
              layer.alert(res.message)
            }
          })
        } else {
          $.ajax({
            method: 'POST',
            url: '/api/v1/tips',
            data: params
          }).then(function(res) {
            if (res.success) {
              layer.close(index);
              table.ajax.reload();
            } else {
              layer.alert(res.message)
            }
          })

        }
      }
    })
  }
  $('body').on('click', '.fa-edit', function() {
    var id = $(this).data('id');
    var tipText;
    if (id) {
      tipText = $(this).closest('tr').find('.tipTextContainer').text();
    }
    createOrEdit(id, tipText)
  });

  $('body').on('click', '.create-tip', function() {
    createOrEdit()
  });
})
