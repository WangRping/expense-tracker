const express = require('express')
const router = express.Router()
const user = require('./users')
const Record = require('../../models/record')

// const { authenticator } = require('../middleware/auth')


router.get('/', (req, res) => {

  console.log(req.user)
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(record => console.log(record))
    .then()
  res.render('index')
})

module.exports = router