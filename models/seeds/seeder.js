if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const Category = require('../category');
const category = require('../category');
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    await Category.create({ category_name: '家居物業', img: '<i class="fa-solid fa-house"></i>' });
    await Category.create({ category_name: '交通出行', img: '<i class="fa-solid fa-van-shuttle"></i>' });
    await Category.create({ category_name: '休閒娛樂', img: '<i class="fa-solid fa-face-grin-beam"></i>' });
    await Category.create({ category_name: '餐飲食品', img: '<i class="fa-solid fa-utensils"></i>' });
    await Category.create({ category_name: '其他', img: '<i class="fa-solid fa-pen"></i>' });

    await User.create({ name: 'user', password: 'user', email: 'user@example.com' });
    await User.create({ name: 'admin', password: 'admin', email: 'admin@example.com' });

    const user = await User.findOne({ name: 'user' }).lean();
    const userId = user._id.toString();

    let category = await Category.findOne({ category_name: '家居物業' }).lean();
    let categoryId = category._id.toString();

    for (let i = 1; i <= 3; i++) {
      const amount = Math.floor(Math.random() * 900 + 1);
      await Record.create({ name: `name-${i}`, userId, categoryId, date: '2023-06-01', amount });
    }

    category = await Category.findOne({ category_name: '休閒娛樂' })
    categoryId = category._id.toString()

    for (let i = 4; i <= 7; i++) {
      const amount = Math.floor(Math.random() * 900 + 1);
      await Record.create({ name: `name-${i}`, userId, categoryId, date: '2023-06-08', amount });
    }


    console.log('done');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});