var express = require('express');
var router = express.Router();
var Shops = require('../models/shop');

router.get('/', (req, res) =>{
    Shops.find().then(data => {
        res.send(data);
    }).catch(err => console.log(err));
});

module.exports = router;