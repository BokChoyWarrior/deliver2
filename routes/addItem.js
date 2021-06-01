var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Items = require('../models/items');
const { ensureAuthenticated } = require('../strategies/auth');
const { head } = require('./users');

// your code here

router.get('/', ensureAuthenticated, async(req, res, next) => {
    if (req.user.type !== 1) {
        res.redirect('/')
    }else{
        res.render('additem', { user: req.user }); 
    }
    

});
router.post('/', ensureAuthenticated, function (req, res, next) {
    if (req.user.type !== 1) {  
        res.redirect('/users/login')
        return
    }

    var { item, itemdescription, price } = req.body
    console.log(item, itemdescription, price)
    var item = new Items({
    name:item,
    description:itemdescription,
    price:price });
    console.log(item);
    item.save();



    // for reference:

    //Item name; item description and item price in PENCE! 
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
module.exports=router