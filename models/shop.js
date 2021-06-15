const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
  name: String,
  description: { type: String, default: 'Shop description here' },
  shown: { type: Boolean, default: false },
  imagefile: { type: String, default: 'shop-card-images/default.jpg' },
  categories: [{ type: String, ref: 'ShopCategory' }]
}, { timestamps: true })

module.exports = mongoose.model('Shop', shopSchema)
