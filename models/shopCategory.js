var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const shopCategorySchema = new Schema({
  name: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('ShopCategory', shopCategorySchema);