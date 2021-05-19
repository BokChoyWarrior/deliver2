var express = require('express');
var router = express.Router();
var Shops = require('../../models/shop');
var Items = require('../../models/items');

router.get('/shops', function (req, res) {
    // var shops = await Shops.find();
    // res.json(shops);
    res.send("Hello")
})

module.exports = router;