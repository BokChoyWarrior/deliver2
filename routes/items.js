var express = require('express');
var router = express.Router();
var Items = require('../models/items');

router.get('/', (req, res) =>{
    Items.find().then(data => {
        res.send(data);
    }).catch(err => console.log(err));
});

module.exports = router;