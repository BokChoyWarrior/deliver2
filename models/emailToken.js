var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const emailTokenSchema = new Schema({
    _userId: { type: String, required: true, ref: 'User' },
    token: { type: String, required: true },
}, { timestamps: true })