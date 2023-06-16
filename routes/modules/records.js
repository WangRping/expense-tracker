const express = require('express')
const moment = require('moment')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const record = require('../../models/record')
const category = require('../../models/category')

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

router.post('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
})

router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categorys = await Category.find().lean()
    const record = await Record.findOne({ userId, _id }).lean()

    for (let i = 0; i < categorys.length; i++) {
      if (categorys[i]._id.toString() === record.categoryId.toString()) {
        categorys[i].selected = true
      }
    }

    console.log(categorys)

    record.date = moment(record.date).format('YYYY-MM-DD')
    res.render('edit', { record, categorys })

  } catch (err) {
    console.log(err)
  }
})

module.exports = router