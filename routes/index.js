var express = require('express');
const { ensureAuthenticated } = require('../strategies/auth');
var router = express.Router();
var Shops = require('../models/shop');
var Items = require('../models/items');

router.get('/', async function(req, res, next) {
  var shops = await Shops.find(); //let's get all the shops
  var items = await Items.find(); //and all the items
  //to send the current user logged in to handlebars we just pass the req.user variable. that's where the user information is attached to.
  res.render('index.html', { title: 'Delivery App', user: req.user, shops: shops, items: items});
});

router.all('/secret', ensureAuthenticated, function (req, res, next) {
  console.log('Accessing the secret section ...')
  res.render('index.html', { title: 'Not so secret!' });
  // res.redirect('/'); // redirects back to '/' route defined above
})

module.exports = router;
