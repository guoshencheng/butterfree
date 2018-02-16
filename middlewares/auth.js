

const checkPageAccess = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

const checkApiAccess = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.json({
      code: 401,
      message: '登陆失效'
    })
  }
}

module.exports = {
  checkPageAccess, checkApiAccess
};
