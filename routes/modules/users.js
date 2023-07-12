const express = require('express')
const flash = require('connect-flash')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const errors = []
  User.findOne({ email })
    .lean()
    .then(user => {
      if (!user) {
        errors.push({ message: '使用者信箱不存在' })
        return res.render('login', { errors })
      }
      if (user.password !== password) {
        errors.push({ message: '密碼錯誤' })
        return res.render('login', { errors })
      } else {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.user = user;
        res.redirect('/')
      }
    })
});

router.get('/logout', (req, res) => {
  return req.session.destroy(() => {
    const success_msg = '你已經成功登出'
    res.render('login', { success_msg })
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此信箱已註冊過' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      }
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })

})

module.exports = router