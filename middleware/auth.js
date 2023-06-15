module.exports = {
  authenticator: (req, res, next) => {
    if (req.session.isLoggedIn) {
      return next()
    }
    // req.flash('warning_msg', '請先登入')
    res.redirect('/users/login')
  }
}