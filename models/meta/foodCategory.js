const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodCategorySchema = new Schema({
  name: String,
  count: Number
}, { timestamps: false })

module.exports = mongoose.model('FoodCategories', foodCategorySchema)
