module.exports = {
  authenticator: (req, res, next) => {
    if (req.session.isLoggedIn) {
      return next()
    }
    req.flash('warning_msg', '請先登入才可使用')
    res.redirect('/users/login')
  }
}