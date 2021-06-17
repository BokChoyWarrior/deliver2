const express = require('express')
const router = express.Router()
const Items = require('../models/items')
// const readline = require('readline')
// const fs = require('fs')

// function between (min, max) {
//   return Math.floor(
//     Math.random() * (max - min) + min
//   )
// }

router.get('/', (req, res) => {
  Items.find().then(data => {
    res.send(data)
  }).catch(err => console.log(err))
})

router.post('/add', (req, res) => {
  const { name, shopid, price, description } = req.body
  const item = new Items({
    shop: shopid,
    name: name,
    price: price,
    description: description
  })
  item.save().then(res.redirect('/')).catch(err => console.log(err))
})

module.exports = router
