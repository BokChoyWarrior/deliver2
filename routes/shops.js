var express = require('express');
var router = express.Router();
var Shops = require('../models/shop');
var Items = require('../models/items');

router.get('/', (req, res) =>{
    Shops.find().then(data => {
        res.send(data);
    }).catch(err => console.log(err));
});

router.post('/add', (req, res) =>{
    const {name} = req.body;
    var shop = new Shops({
        name: name
    });
    shop.save().then(res.redirect('/')).catch(err => console.log(err));
});

router.get('/:id', async (req, res) =>{
    console.log('got something');
    var id = req.params.id;
    var items = await Items.find({shop: id});
    Shops.findOne({_id: id}).then(data => {
        console.log(data);
        res.render('shop', {shop: data, items:items, user: req.user});
    }).catch(err => console.log(err));
})

module.exports = router;