const express = require('express')
const router = express.Router()
const Shops = require('../models/shop')
const Items = require('../models/items')

router.get('/', async function (req, res, next) {
  const shops = await Shops.find() // let's get all the shops
  const items = await Items.find() // and all the items
  // to send the current user logged in to handlebars we just pass the req.user variable. that's where the user information is attached to.
  res.render('index', { title: 'Delivery App', user: req.user, shops: shops, items: items })
})

module.exports = router
