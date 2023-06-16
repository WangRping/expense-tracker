const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categorys => res.render('new', { categorys }))
})

router.post('/new', (req, res) => {
  const record = req.body
  record.userId = req.user._id
  Record.create(record)
    .then(() => res.redirect('/'))
})

module.exports = router