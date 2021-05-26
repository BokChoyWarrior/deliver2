var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Items = require('../models/items');
const { ensureAuthenticated } = require('../strategies/auth');

// your code here

router.get('/', function (req, res, next) {
    res.render('additem', { user: req.user });
});

router.post('/', async (req, res, next) => {


    // for reference:
    // ============================================================
    // console.log(req.body);
    // var { email, password, userType } = req.body;
    // var type = 0;
    // if (userType == "on") {
    //     type = 1;
    // }

    // console.log(type);
    // await bcrypt.genSalt(saltRounds, async function (err, salt) {
    //     bcrypt.hash(password, salt, function (err, hash) {
    //         var user = new User({
    //             type: type,
    //             email: email,
    //             password: hash
    //         });
    //         user.save().then(data => {
    //             console.log(data);
    //             res.send({ msg: email + " has been registered" });
    //         }).catch(err => console.log(err));
    //     });
    // });
});


module.exports = router;