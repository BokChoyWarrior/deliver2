const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopCategorySchema = new Schema({
  name: String,
  count: Number
}, { timestamps: false })

module.exports = mongoose.model('ShopCategories', shopCategorySchema)
