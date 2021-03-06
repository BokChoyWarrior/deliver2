/* eslint-disable no-unused-vars */
function convertPrice (price) {
  let sPrice = price.toString()
  const length = sPrice.length

  if (length <= 2) {
    return '£0.' + sPrice
  } else {
    sPrice = [sPrice.slice(0, length - 2), '.', sPrice.slice(length - 2)].join('')
    return `£${sPrice}`
  }
}
