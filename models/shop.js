var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: String,
  description: String,
  categories: [{category: {type: String, ref: 'ShopCategory'}}]
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);