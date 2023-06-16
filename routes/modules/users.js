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
        req.user = user;
        res.redirect('/')
      }
    })
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
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
    console.log(errors)
    return res.render('register', { name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('信箱已經註冊')
        return res.render('register', { name, email, password, confirmPassword })
      }
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })

})

module.exports = router