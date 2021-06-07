const express = require('express')
const router = express.Router()
const Shop = require('../models/shop')
const Item = require('../models/items')
const User = require('../models/user')
const { ensureAuthenticated } = require('../strategies/auth')
const { postcodeValidator } = require('postcode-validator')
const { isEqual } = require('lodash')
const multer = require('../multer.js')
const cloudinary = require('../cloudinary.js')

const checkboxToBool = { on: true, off: false }

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

  .post(multer.single('image'), async (req, res) => {
    const flashes = []
    let successMsg = false
    const oldUser = req.user
    const newUser = await User.findById(oldUser._id)
    if (!newUser) { res.status(500); return }

    // handle user input...
    const { postcode, address, shopName, shopDescription, shopShown } = req.body

    // for all users including shops
    // Postcode should be checked ideally clientside...
    if (postcode !== oldUser.postcode) {
      if (postcodeValidator(postcode, 'GB')) {
        newUser.postcode = postcode
      } else {
        flashes.push({ type: 'error', msg: 'Postcode was invalid' })
      }
    }

    if (address !== oldUser.address) { newUser.address = address }

    // using Lodash isEqual function here because we are comparing objects
    // eslint-disable-next-line eqeqeq
    if (!isEqual(newUser, oldUser)) {
      newUser.save()
        .then(successMsg = 'Successfully updated details')
        .catch(_err => flashes.push({ type: 'error', msg: 'Something went wrong while updating your user. Please try again' }))
    }

    // for shops only
    let shop
    if (req.user.type === 1) {
      shop = await Shop.findById(oldUser.shopId)
      if (!shop) {
        flashes.push({ type: 'error', msg: 'Something went wrong while updating your shop. Please try again' })
      } else {
        shop.shown = checkboxToBool[shopShown]

        shop.name = shopName

        shop.description = shopDescription

        console.log('file:::::', req.file)
        if (req.file !== undefined) {
          await cloudinary.uploader.upload(req.file.path,
            {
              resource_type: 'image',
              public_id: `shopImages/${req.user.shopId}`,
              overwrite: true
            },
            function (_error, result) { shop.imagefile = result.url })
        }
        shop.save()
          .then(successMsg = 'Successfully updated details')
          .catch(_err => flashes.push({ type: 'error', msg: 'Something went wrong while updating your shop. Please try again' }))
      }
    }

    if (successMsg) {
      flashes.push({ type: 'success', msg: successMsg })
    }

    res.render('account', { user: newUser, shop: shop, flashes: flashes })
  })

module.exports = router
