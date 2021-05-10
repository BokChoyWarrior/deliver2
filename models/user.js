var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: String,
  password: String,
  address: String,
  postcode: String,
  basket: [
    {
      item: {
        type: String,
        ref: 'Item'
      },
      quantity: Number
    }
  ]
}, {timestamps: true});

userSchema.methods.verify = async function(password){
    await bcrypt.compare(password, this.password, function(error, result){
        console.log(result);
        return result;
    });
}

module.exports = mongoose.model('User', userSchema);