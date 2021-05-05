var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
const saltRounds = 10;


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

router.get('/register', (req, res) => {
  console.log('got request');
  res.render('adduser');
})

router.get('/user')

module.exports = router;
