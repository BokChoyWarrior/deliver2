const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailTokenSchema = new Schema({
  _userId: { type: String, required: true, ref: 'User' },
  token: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('EmailToken', emailTokenSchema)
