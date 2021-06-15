// TBI
const Shop = require('../models/shop')

module.exports = async function (req, res, next) {
  if (req.user.type === 1) {
    req.shop = await Shop.findById(req.user.shopId)
  }
  next()
}
