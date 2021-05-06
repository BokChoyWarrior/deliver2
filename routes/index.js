var express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../strategies/auth');
var router = express.Router();

/* GET home page test - make sure you only have one of the '/' routes un-commented. */

// router.get('/', function (req, res) {
//   res.send('Hello World!')
// });

router.get('/', function(req, res, next) {
  //to send the current user logged in to handlebars we just pass the req.user variable. that's where the user information is attached to.
  res.render('index', { title: 'Delivery App', user: req.user });
});

router.all('/secret', ensureAuthenticated, function (req, res, next) {
  console.log('Accessing the secret section ...')
  res.render('index', { title: 'Not so secret!' });
  // res.redirect('/'); // redirects back to '/' route defined above
})

module.exports = router;
