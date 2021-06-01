// Please give functions have descriptive names and easily predictable behavious
// Add functions as below
// -------------------------------------------------------
// exports.functionName = function(arg1, arg2, ...) { ... };
// -------------------------------------------------------
const _ = require('lodash')

exports.quantityInBasket = function (basket, itemId) {
  // Check for item in users basket.
  // Return Quantity of item in the basket.
  // eslint-disable-next-line eqeqeq
  const result = basket.find(x => _.isEqual(x.item._id, itemId))
  
  if (typeof result !== 'undefined') {
    console.log(`Found item ${itemId}`)
    return result.quantity
  } else {
    return 0
  }
}

exports.convertPrice = function (price) {
  let sPrice = price.toString()
  const length = sPrice.length

  if (length <= 2) {
    return '£0.' + sPrice
  } else {
    sPrice = [sPrice.slice(0, length - 2), '.', sPrice.slice(length - 2)].join('')
    return '£' + sPrice
  }
}
