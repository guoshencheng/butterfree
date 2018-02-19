var express = require('express');
var router = express.Router();
var pages = require('../constants/pages');
var api = require('./api');
var { checkPageAccess, checkApiAccess } = require('../middlewares/auth');
var { commonRequest } = require('../helpers/requests');

router.use('/api', api);

router.get('/', checkPageAccess, (req, res, next) => {
  res.redirect(pages.posts.path);
})

router.get('/login', (req, res, next) => {
  const redirect = req.query.redirect;
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

router.get('/posts/:id', async (req, res, next) => {
  const id = req.params.id;
  if (id == 'create') {
    res.makeRender('post', { pageTitle: '创建博客' })
  } else {
    try {
      const response = await commonRequest({
        url: `/v1/posts/${id}`
      })
      res.makeRender('post', Object.assign({}, response.data.data, { pageTitle: '编辑博客' }));
    } catch (e) {
    }
  }
});

module.exports = router;
