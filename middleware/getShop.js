// TBI
const Shop = require('../models/shop')

module.exports = async function (req, res, next) {
  if (typeof req.user !== 'undefined') {
    console.log(req.user)
    if (req.user.type === 1) {
      req.shop = await Shop.findById(req.user.shopId)
    }
  }
  next()
}
