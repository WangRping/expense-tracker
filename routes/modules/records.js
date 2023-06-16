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

router.post('/new', async (req, res) => {
  const record = req.body
  const { name, date, categoryId, amount } = req.body
  const categorys = await Category.find().lean()
  if (!name || !date || !categoryId || !amount) {

    return res.render('new', { name, date, amount, categorys })
  }
  console.log(record)
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

    record.date = moment(record.date).format('YYYY-MM-DD')
    res.render('edit', { record, categorys })

  } catch (err) {
    console.log(err)
  }
})

router.post('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const editRecordy = req.body
  Record.findOne({ _id, userId })
    .then(record => {
      for (const key in editRecordy) {
        record[key] = editRecordy[key]
      }
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router