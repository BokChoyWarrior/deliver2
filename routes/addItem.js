const express = require('express')
const router = express.Router()
const Items = require('../models/items')
const { ensureAuthenticated } = require('../strategies/auth')

// your code here

router.route('/', ensureAuthenticated)
  .get(async (req, res, next) => {
    if (req.user.type !== 1) {
      res.redirect('/')
    } else {
      res.render('additem', { user: req.user })
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
