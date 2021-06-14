const express = require('express')
const router = express.Router()
const Shop = require('../models/shop')
const Item = require('../models/items')

router.get('/', async function (req, res, next) {
  const shops = await Shop.find({ shown: true }) // let's get all the shops
  const items = await Item.find() // and all the items
  // to send the current user logged in to handlebars we just pass the req.user variable. that's where the user information is attached to.
  res.render('index', { title: 'Delivery App', user: req.user, shops: shops, items: items })
})

module.exports = router
