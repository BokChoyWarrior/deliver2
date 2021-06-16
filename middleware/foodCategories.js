let currentFoodCategories = []
const FoodCategories = require('../models/meta/foodCategory')
FoodCategories.find({}).then((res, _err) => { currentFoodCategories = res })

module.exports = function (req, res, next) {
  res.locals.shopCategories = currentFoodCategories
  next()
}
