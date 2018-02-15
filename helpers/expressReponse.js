var { response } = require('express');
var pages = require('../constants/pages');
const timestamp = new Date().getTime();
response.makeRender = function(view, options) {
  this.render(view, Object.assign({}, options, { viewPath: this.req.path, pages, timestamp }))
}
