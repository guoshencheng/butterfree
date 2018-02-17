var express = require('express');
var router = express.Router();
var axios = require('axios');
var config = require('config');

var request = axios.create({
  baseURL: config.apiServer,
  headers: {
    "admin-token": config.accessToken
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const response = await request.get(`/api/adminUser/username/${username}`)
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

module.exports = router;
