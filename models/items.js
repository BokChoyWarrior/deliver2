var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const itemSchema = new Schema({
  shop: {
    type: String,
    ref: 'Shop'
  },
  name: String,
  price: Number,
  description: String
}, {timestamps: true});

module.exports = mongoose.model('Item', itemSchema);