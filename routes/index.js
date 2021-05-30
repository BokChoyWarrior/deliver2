const express = require('express')
const router = express.Router()
const Shop = require('../models/shop')
const Item = require('../models/items')
const User = require('../models/user')
const { ensureAuthenticated } = require('../strategies/auth')
const { postcodeValidator } = require('postcode-validator')

router.get('/', async function (req, res, next) {
  const shops = await Shop.find({ shown: true }) // let's get all the shops
  const items = await Item.find() // and all the items
  // to send the current user logged in to handlebars we just pass the req.user variable. that's where the user information is attached to.
  res.render('index', { title: 'Delivery App', user: req.user, shops: shops, items: items })
})

router.route('/account', ensureAuthenticated)
  .get(async (req, res) => {
    let shop = null
    if (req.user.type === 1) {
      shop = await Shop.findById(req.user.shopId)
    }
    res.render('account', { user: req.user, shop: shop })
  })
  .post(async (req, res) => {
    console.log(req.body)

    const flashes = []
    const oldUser = req.user
    const newUser = await User.findById(oldUser._id)
    if (!newUser) { res.status(500); return }
    // handle user input...
    // eslint-disable-next-line no-unused-vars
    const { postcode, address, shopName, shopDescription, shopShown } = req.body
    // for all users including shops
    if (postcodeValidator(postcode, 'GB') === false) {
      flashes.push({ type: 'error', msg: 'Error: postcode was invalid' })
    } else {
      newUser.postcode = postcode
      if (address) { newUser.address = address }
    }
    newUser.save()
      .then(flashes.push({ type: 'success', msg: 'User details updated successfully!' }))
      .catch(_err => flashes.push({ type: 'error', msg: 'Something went wrong while updating your user. Please try again' }))

    // for shops only
    let shown = false
    if (shopShown === 'on') { shown = true }

    if (req.user.type === 1) {
      const shop = await Shop.findById(oldUser.shopId)
      if (!shop) {
        flashes.push({ type: 'error', msg: 'Something went wrong while updating your shop. Please try again' })
      } else {
        // shown
        shop.shown = shown
        // shop name
        if (!shopName) {
          flashes.push({ type: 'error', msg: 'You need to provide a shop name.' })
        } else {
          shop.name = shopName
        }

        // shop description
        if (!shopDescription) {
          flashes.push({ type: 'error', msg: 'You need to provide a shop description.' })
        } else {
          shop.description = shopDescription
        }
        shop.save()
          .then(flashes.push({ type: 'success', msg: 'Shop details updated successfully!' }))
          .catch(_err => flashes.push({ type: 'error', msg: 'Something went wrong while updating your shop. Please try again' }))
      }
    }

    res.render('account', { user: newUser, flashes: flashes })
  })

module.exports = router
