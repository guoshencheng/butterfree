var express = require('express');
var router = express.Router();
var pages = require('../constants/pages');
var api = require('./api');
var { checkPageAccess, checkApiAccess } = require('../middlewares/auth');

router.use('/api', api);

router.get('/', checkPageAccess, (req, res, next) => {
  res.redirect(pages.posts.path);
})

router.get('/login', (req, res, next) => {
  const redirect = req.query.redirect;
  console.log(redirect)
  res.render('login', {
    title: '登陆',
    redirect: decodeURIComponent(redirect),
    layout: 'outside'
  })
});

Object.keys(pages).forEach(key => {
  const page = pages[key];
  router.get(page.path, checkPageAccess, function(req, res, next) {
    res.makeRender(page.view, { title: page.title });
  })
})

module.exports = router;
