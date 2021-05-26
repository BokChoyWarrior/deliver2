const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const { ensureAuthenticated } = require('../strategies/auth')
const saltRounds = 10

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/register', async (req, res, next) => {
  console.log(req.body)
  const { email, password, userType } = req.body
  let type = 0
  if (userType === 'on') {
    type = 1
  }

  console.log(type)
  await bcrypt.genSalt(saltRounds, async function (_err, salt) {
    bcrypt.hash(password, salt, function (_err, hash) {
      const user = new User({
        type: type,
        email: email,
        password: hash
      })
      user.save().then(data => {
        console.log(data)
        res.send({ msg: email + ' has been registered' })
      }).catch(err => console.log(err))
    })
  })
})

router.get('/login', (req, res) => {
  res.render('logintesting', { user: req.user })
})

router.get('/register', (req, res) => {
  console.log('got request')
  res.render('adduser')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

router.get('/basket', ensureAuthenticated, async (req, res, next) => {
  // first we need to get a list of the items inside the users basket.
  // instead of just using the req.user we have to fetch the user from the database.
  // we have to query for the user Using the User model. We do this because we can then populate each item inside the user.basket. with .populate('basket.item')
  // this will give us all the information about each product that we need.
  const user = await User.findOne({ _id: req.user._id }).populate('basket.item')
  let totalPrice = 0
  console.log(totalPrice, user.basket)
  user.basket.forEach(item => {
    totalPrice += (item.item.price * item.quantity)
  })

  res.render('basket', { user: user, basket_price: totalPrice })
})

router.post('/add2basket', ensureAuthenticated, async (req, res, next) => {
  let response = {}
  try {
    const userid = req.user._id
    let { itemid, amount } = req.body
    // First we check that the amount to add is valid
    amount = +amount
    if (!Number.isInteger(amount)) {
      throw new TypeError('Amount to add was not an integer')
    }
    // TODO
    // We should also check that the shop actually has the item requested! (If the user doesn't already have in basket)
    // ^ ^ ^ ^
    const user = await User.findOne({ _id: userid }).populate('basket.item')
    const basket = user.basket
    const itemIndex = basket.findIndex(x => x.item._id === itemid)
    // console.log(user.basket[itemIndex]);
    let item
    // If item is in basket
    // console.log(itemIndex);
    if (itemIndex !== -1) {
      // console.log(user.basket[itemIndex]);
      const quantity = Math.max(user.basket[itemIndex].quantity + amount, 0)
      if (quantity === 0) {
        user.basket.pull({ _id: user.basket[itemIndex]._id })
        item = undefined
      } else {
        user.basket[itemIndex].quantity = quantity
      }
      item = user.basket[itemIndex]
    } else if (amount > 0) {
      item = {
        item: itemid,
        quantity: amount
      }
      user.basket.push(item)
    }
    user.save()

    response = {
      success: true,
      message: 'Item successfully updated.',
      new_item: item
    }
  } catch (err) {
    console.log(err)
    response = {
      success: false,
      message: err.message
    }
  } finally {
    res.send(response)
  }
})

module.exports = router
