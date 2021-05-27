const User = require('../models/user')

exports.findOrCreateShopBasket = async function (user, shopId) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('Timeout waiting to contact DB')), 1000)
    User.findById(user._id).then((userModel) => {
      const baskets = userModel.baskets
      // eslint-disable-next-line eqeqeq
      let basketIndex = baskets.findIndex(x => x.shop == shopId)
      if (basketIndex === -1) {
        console.log(basketIndex, 'not found!')
        baskets.push({
          shop: shopId,
          basket: []
        })
        userModel.save()
        // eslint-disable-next-line eqeqeq
        basketIndex = baskets.findIndex(x => x.shop == shopId)
      }
      resolve(userModel.baskets[basketIndex])
    })
  })
  return promise
}
