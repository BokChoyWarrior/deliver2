const express = require('express')
const router = express.Router()
const Shop = require('../models/shop')
const User = require('../models/user')
const Items = require('../models/items')
const ShopCategories = require('../models/meta/shopCategory')
const { ensureAuthenticated } = require('../strategies/auth')
const { postcodeValidator } = require('postcode-validator')
const { isEqual } = require('lodash')
const multer = require('../multer.js')
const cloudinary = require('../cloudinary.js')

const checkboxToBool = { on: true, off: false }

router.get('/', ensureAuthenticated, async (req, res) => {
  let shop = null
  if (req.user.type === 1) {
    shop = await Shop.findById(req.user.shopId)
  }
  res.render('account/account', { user: req.user, shop: shop })
})

router.route('/settings', ensureAuthenticated)

  .get(async (req, res) => {
    let shop = null
    if (req.user.type === 1) {
      shop = await Shop.findById(req.user.shopId)
      res.render('account/settings', { user: req.user, shop: shop })
    } else {
      res.render('account/settings', { user: req.user })
    }
  })

  .post(multer.single('image'), async (req, res) => {
    const flashes = []
    let successMsg = false
    const oldUser = req.user
    const newUser = await User.findById(oldUser._id)
    if (!newUser) { res.status(500); return }

    // handle user input...
    const { postcode, address, shopName, shopDescription, shopShown, shopCategories } = req.body
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

        const realCategories = []
        const promises = []
        for await (const category of [].concat(shopCategories)) {
          promises.push(
            ShopCategories.findById(category)
              .then((res, _err) => { if (res) { realCategories.push(category) } })
              .catch((_err) => {}))
        }

        await Promise.all(promises)
          .then(() => {
            shop.categories = []
            shop.categories = realCategories
          })
          .catch((_err) => {})

        if (req.file !== undefined) {
          await cloudinary.uploader.upload(req.file.path,
            {
              resource_type: 'image',
              public_id: `shopImages/${req.user.shopId}`,
              overwrite: true
            },
            function (_error, result) { shop.imagefile = result.url })
        }
        console.log('saving shop!')
        shop.save()
          .then(successMsg = 'Successfully updated details')
          .catch(_err => flashes.push({ type: 'error', msg: 'Something went wrong while updating your shop. Please try again' }))
      }
    }

    if (successMsg) {
      flashes.push({ type: 'success', msg: successMsg })
    }

    res.redirect('/account/settings')
    // res.render('account/settings', { user: newUser, shop: shop, flashes: flashes }) // TODO: Redirect with flashes rather than render.
  })

router.route('/inventory', ensureAuthenticated)
  .get(async (req, res, next) => {
    if (req.user.type !== 1) {
      res.redirect('/')
    } else {
      res.render('account/inventory', { user: req.user })
    }
  })
  .post(async (req, res, next) => {
    if (req.user.type !== 1) {
      res.redirect('/users/login')
      return
    }

    const { itemName, itemDescription, price } = req.body
    const item = new Items({
      name: itemName,
      description: itemDescription,
      price: price
    })
    console.log(item)

  // item.save()
  // redirect user to add another, or actually accept the item via react/jquery?
  })

module.exports = router
