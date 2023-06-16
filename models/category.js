const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  }, img: {
    type: String
  }
})

module.exports = mongoose.model('Category', categorySchema)