var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: String
}, {timestamps: true});

module.exports = mongoose.model('Shop', shopSchema);