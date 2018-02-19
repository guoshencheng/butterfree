var express = require('express');
var router = express.Router();
var { commonRequest, adminRequest } = require('../helpers/requests');

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const response = await adminRequest.get(`/api/adminUser/username/${username}`)
    const { data } = response;
    const user = data.data;
    if (data.success && user && user.password == password) {
      req.session.user = {
        id: user.id,
        username: user.username,
        level: user.level
      }
      res.json({
        success: true
      })
    } else {
      res.json({
        success: false,
        message: `用户名或密码错误`
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.use('*', async (req, res, next) => {
  const path = req.params[0];
  try {
    const response = await commonRequest({
      url: path,
      method: req.method,
      params: req.query,
      data: req.body
    })
    const { data } = response;
    res.json(data);
  } catch (e) {
    if (e.response) {
      res.json(e.response.data);
    } else {
      console.log(e)
      res.json({
        success: false
      })
    }
  }
})

module.exports = router;
