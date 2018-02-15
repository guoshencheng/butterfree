var express = require('express');
var router = express.Router();
var pages = require('../constants/pages');

router.get('/', (req, res, next) => {
  res.redirect(pages.home.path);
})

Object.keys(pages).forEach(key => {
  const page = pages[key];
  router.get(page.path, function(req, res, next) {
    res.makeRender(page.view, { title: page.title });
  })
})

module.exports = router;
