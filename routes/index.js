var express = require('express');
var router = express.Router();

/* GET home page test - make sure you only have one of the '/' routes un-commented. */

// router.get('/', function (req, res) {
//   res.send('Hello World!')
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  res.render('index', { title: 'Secret!' });
  // res.redirect('/'); // redirects back to '/' route defined above
})

module.exports = router;
