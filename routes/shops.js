const express = require('express')
const router = express.Router()
const Shops = require('../models/shop')
const Items = require('../models/items')

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

router.get('/:id', async (req, res) => {
  console.log('got something')
  const id = req.params.id
  const items = await Items.find({ shop: id })
  Shops.findOne({ _id: id }).then(data => {
    console.log(data)
    res.render('shop', { shop: data, items: items, user: req.user })
  }).catch(err => console.log(err))
})

module.exports = router
