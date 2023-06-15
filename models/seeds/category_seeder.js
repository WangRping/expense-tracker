if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all([
    Category.create({ category_name: '家居物業' }),
    Category.create({ category_name: '交通出行' }),
    Category.create({ category_name: '休閒娛樂' }),
    Category.create({ category_name: '餐飲食品' }),
    Category.create({ category_name: '其他' })
  ]);
  console.log('done');
});