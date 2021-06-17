const express = require('express')
const router = express.Router()
const { findOrCreateShopBasket } = require('../../lib/common')

router.route('/')

  .get(async (req, res) => {
  })

router.route('/baskets')
  .get(async (req, res) => {
    console.log(req.user)
  })
router.route('/baskets/:id')
  .get(async (req, res) => {
    const basket = await findOrCreateShopBasket(req.user, req.params.id)
    res.json(basket)
  })

router.route('/baskets/:id')
  .put(async (req, res) => {
    let response = {}
    try {
      // const userid = req.user._id
      // const user = await User.findOne({ _id: userid })
      // or
      const user = req.user

      const shopId = req.params.id
      let { itemId, amount } = req.body
      // First we check that the amount to add is valid
      amount = +amount
      if (!Number.isInteger(amount)) {
        throw new TypeError('Amount to add was not an integer')
      }
      // TODO
      // We should also check that the shop actually has the item requested! (If the user doesn't already have in basket)
      // ^ ^ ^ ^
      const baskets = user.baskets
      let basketIndex = baskets.findIndex(x => x.shop === shopId)
      if (basketIndex === -1) {
        await findOrCreateShopBasket(user, shopId)
        basketIndex = baskets.findIndex(x => x.shop === shopId)
      }

      const basket = user.baskets[basketIndex].basket
      // console.log('Basket:', basket)
      const itemIndex = basket.findIndex(x => x.item === itemId)
      // console.log(user.basket[itemIndex]);
      let item
      // If item is in basket
      // console.log(itemIndex);
      if (itemIndex !== -1) {
        // console.log(user.basket[itemIndex]);
        const quantity = Math.max(basket[itemIndex].quantity + amount, 0)
        if (quantity === 0) {
          basket.pull({ _id: basket[itemIndex]._id })
          item = undefined
        } else {
          basket[itemIndex].quantity = quantity
        }
        item = basket[itemIndex]
      } else if (amount > 0) {
        item = {
          item: itemId,
          quantity: amount
        }
        basket.push(item)
      }
      user.save()

      response = {
        success: true,
        message: `Item successfully updated. shopID: ${shopId}`,
        new_item: item
      }
    } catch (err) {
      // console.log(err)
      response = {
        success: false,
        message: err.message
      }
    } finally {
      res.json(response)
    }
  })
module.exports = router
