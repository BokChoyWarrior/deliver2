// Please give functions have descriptive names and easily predictable behavious
// Add functions as below
// -------------------------------------------------------
// exports.functionName = function(arg1, arg2, ...) { ... };
// -------------------------------------------------------

exports.quantityInBasket = function (itemId, user) {
  // Check for item in users basket.
  // Return Quantity of item in the basket.
  if (user) {
    const result = user.basket.find(x => x.item === itemId)
    if (result) {
      console.log(`Found item ${itemId}`)
      return result.quantity
    } else {
      return 0
    }
  } else {
    // user not logged in, just return null
    return false
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
