const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
  name: String,
  description: String,
  shown: { type: Boolean, default: false },
  categories: [{ category: { type: String, ref: 'ShopCategory' } }]
}, { timestamps: true })

module.exports = mongoose.model('Shop', shopSchema)
