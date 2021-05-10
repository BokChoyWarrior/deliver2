var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Items = require('../models/items');
var passport = require('passport');
const { ensureAuthenticated } = require('../strategies/auth');
var saltRounds = 10;


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
  console.log(req.body);
  var { email, password } = req.body;
  await bcrypt.genSalt(saltRounds, async function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      var user = new User({
        email: email,
        password: hash
      });
      user.save().then(data => {
        console.log(data);
        res.send({ msg: email + " has been registered" });
      }).catch(err => console.log(err));
    });
  });
});

router.get('/login', (req, res) => {
  res.render('logintesting', { user: req.user });
});

router.get('/register', (req, res) => {
  console.log('got request');
  res.render('adduser');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
})

router.get('/basket', ensureAuthenticated, async (req, res, next) => {
  //first we need to get a list of the items inside the users basket.
  //instead of just using the req.user we have to fetch the user from the database.
  //we have to query for the user Using the User model. We do this because we can then populate each item inside the user.basket. with .populate('basket.item')
  //this will give us all the information about each product that we need.
  var user = await User.findOne({ _id: req.user._id }).populate('basket.item');
  console.log(user.basket);
  var total_price = 0;
  user.basket.forEach(item => {
    total_price += (item.item.price * item.quantity);
  });

  res.render('basket', { user: user, total_price : total_price});
  console.log(total_price);
});

router.post('/add2basket', ensureAuthenticated, async (req, res, next) => {
  var userid = req.user._id;
  const { itemid, amount } = req.body;
  console.log(req.body);

  var user = await User.findOne({ _id: userid }).catch(err => console.log(err));
  var basket = user.basket;
  var result = basket.findIndex(x => x.item == itemid);
  console.log(result);
  if (result >= 0) {
    console.log(result);
    // please CHECK that the value passed is correct and can be added/removed from basket!!!!!!!!!!!!!!!!
    user.basket[result].quantity += +amount;

    user.save().then(data => {
      res.send({ success: true });
    }).catch(err => console.log(err));
  } else {
    var item = {
      item: itemid,
      quantity: 1
    }
    user.basket.push(item);
    user.save().then(data => {
      res.send({ success: true });
    }).catch(err => console.log(err));
  }
});

module.exports = router;
