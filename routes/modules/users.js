const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .lean()
    .then(user => {
      if (!user) {
        console.log('信箱不存在')
        return res.render('login')
      }
      if (user.password !== password) {
        console.log('密碼錯誤')
        return res.render('login')
      } else {
        req.session.isLoggedIn = true;
        req.session.user = user
        res.redirect('/')
      }
    })
});

module.exports = router