var express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../strategies/auth');
const handlebars = require('hbs');
var router = express.Router();
var Shops = require('../models/shop');
var Items = require('../models/items');

/* GET home page test - make sure you only have one of the '/' routes un-commented. */

// router.get('/', function (req, res) {
//   res.send('Hello World!')
// });

handlebars.registerHelper("iteminbasket", function(itemid, options){
  if(options.data.root.user){
    var result = options.data.root.user.basket.find( x => x.item == itemid);
    if(result){
      return result.quantity;
    }else{
      return 0;
    }
  }else{
    return null;
  }
});

router.get('/', async function(req, res, next) {
  var shops = await Shops.find(); //let's get all the shops
  var items = await Items.find(); //and all the items
  //to send the current user logged in to handlebars we just pass the req.user variable. that's where the user information is attached to.
  res.render('index', { title: 'Delivery App', user: req.user, shops: shops, items: items});
});

router.all('/secret', ensureAuthenticated, function (req, res, next) {
  console.log('Accessing the secret section ...')
  res.render('index', { title: 'Not so secret!' });
  // res.redirect('/'); // redirects back to '/' route defined above
})

module.exports = router;
