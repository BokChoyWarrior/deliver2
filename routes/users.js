var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Items = require('../models/items');
var passport = require('passport');
const { ensureAuthenticated } = require('../strategies/auth');
var saltRounds = 10;


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', async(req, res, next) => {
    console.log(req.body);
    var { email, password } = req.body;
    await bcrypt.genSalt(saltRounds, async function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
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

router.get('/basket', ensureAuthenticated, async(req, res, next) => {
    //first we need to get a list of the items inside the users basket.
    //instead of just using the req.user we have to fetch the user from the database.
    //we have to query for the user Using the User model. We do this because we can then populate each item inside the user.basket. with .populate('basket.item')
    //this will give us all the information about each product that we need.
    var user = await User.findOne({ _id: req.user._id }).populate('basket.item');
    var total_price = 0;
    console.log(total_price, user.basket);
    user.basket.forEach(item => {
        total_price += (item.item.price * item.quantity);
    });

    res.render('basket', { user: user, basket_price: total_price });

});

router.post('/add2basket', ensureAuthenticated, async(req, res, next) => {
    try {
        var userid = req.user._id;
        var { itemid, amount } = req.body;
        var response;
        // First we check that the amount to add is valid
        amount = +amount;
        if (!Number.isInteger(amount)) {
            throw new TypeError('Amount to add was not an integer');
        }
        // TODO
        // We should also check that the shop actually has the item requested! (If the user doesn't already have in basket)
        // ^ ^ ^ ^
        var user = await User.findOne({ _id: userid }).populate('basket.item');
        var basket = user.basket;
        var item_index = basket.findIndex(x => x.item._id == itemid);
        // console.log(user.basket[item_index]);
        var item;
        // If item is in basket
        // console.log(item_index);
        if (item_index != -1) {
            // console.log(user.basket[item_index]);
            var quantity = Math.max(user.basket[item_index].quantity + amount, 0);
            if (quantity == 0) {
                user.basket.pull({ _id: user.basket[item_index]._id });
                item = undefined;
            } else {
                user.basket[item_index].quantity = quantity;
            }
            item = user.basket[item_index];
        } else if (amount > 0) {
            item = {
                item: itemid,
                quantity: amount,
            }
            user.basket.push(item);
        }
        user.save();

        response = {
            success: true,
            message: 'Item successfully updated.',
            new_item: item,
        };

    } catch (err) {
        console.log(err);
        response = {
            success: false,
            message: err.message,
        };
    } finally {
        res.send(response);
    }
});

module.exports = router;