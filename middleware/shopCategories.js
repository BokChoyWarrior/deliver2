let currentShopCategories = []
const ShopCategories = require('../models/meta/shopCategory')
ShopCategories.find({}).then((res, _err) => { currentShopCategories = res })

module.exports = async function (req, res, next) {
  // console.log(req.shop)
  if (req.user.type === 1) {
    const newShopCategories = []
    for (const category in currentShopCategories) {
      let shown = false
      if (req.shop.categories.includes(currentShopCategories[category]._id)) {
        shown = true
      }
      newShopCategories.push({ id: currentShopCategories[category]._id, name: currentShopCategories[category].name, shown: shown })
    }
    res.locals.shopCategories = newShopCategories
  }
  next()
}
