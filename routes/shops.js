const express = require('express')
const router = express.Router()
const Shops = require('../models/shop')
const Items = require('../models/items')
const { ensureAuthenticated } = require('../strategies/auth')
const { findOrCreateShopBasket } = require('../lib/common')

router.get('/', (req, res) => {
  Shops.find().then(data => {
    res.send(data)
  }).catch(err => console.log(err))
})

router.post('/add', (req, res) => {
  const { name } = req.body
  const shop = new Shops({
    name: name
  })
  shop.save().then(res.redirect('/')).catch(err => console.log(err))
})

router.get('/:id', ensureAuthenticated, async (req, res) => {
  const shopId = req.params.id
  const items = await Items.find({ shop: shopId })
  const basket = await findOrCreateShopBasket(req.user, shopId)
  // console.log(basket, '<== basket! ======', items, '<== items!')
  console.log(basket);
  Shops.findOne({ _id: shopId }).then(data => {
    res.render('shop', { shop: data, items: items, user: req.user, basket: basket })
  }).catch(err => { console.log(err); res.status(500) })
})

module.exports = router
