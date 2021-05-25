var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  address: String,
  postcode: String,
  type: { type: Number, default: 0 },// 0 = user, 1 = shop
  emailActive: { type: Boolean, default: false },
  baskets: [
    {
      shop: { type: String, ref: 'Shop' },
      basket: [
        {
          item: {
            type: String,
            ref: 'Item'
          },
          quantity: Number,
        }
      ]
    }
  ],
}, { timestamps: true });

userSchema.methods.verify = async function (password) {
  await bcrypt.compare(password, this.password, function (error, result) {
    console.log(result);
    return result;
  });
}

module.exports = mongoose.model('User', userSchema);