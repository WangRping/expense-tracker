const express = require('express')
const moment = require('moment');
const router = express.Router()
const user = require('./users')
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

// const { authenticator } = require('../middleware/auth')



router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const records = await Record.find({ userId }).lean();
    const renderRecords = [];

    for (const record of records) {
      const category = await Category.findOne({ _id: record.categoryId }).lean();
      record.img = category.img;
      record.date = moment(record.date).format('YYYY/MM/DD'); // 格式化日期
      renderRecords.push(record);
    }
    const categorys = await Category.find().lean()
    res.render('index', { records: renderRecords, categorys });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router