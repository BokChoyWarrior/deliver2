var express = require('express');
var router = express.Router();
var Items = require('../models/items');
const readline = require('readline');
const fs = require('fs');

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

router.get('/', (req, res) => {
    Items.find().then(data => {
        res.send(data);
    }).catch(err => console.log(err));
});

router.post('/add', (req, res) => {
    const { name, shopid, price, description } = req.body;
    var item = new Items({
        shop: shopid,
        name: name,
        price: price,
        description: description
    });
    item.save().then(res.redirect('/')).catch(err => console.log(err));
});

// router.get('/loaditems', (req, res) => {
//     const shops = ['6093ea59730ee125986269e9', '6093ea7b730ee125986269ea', '6093ef2eeadadd29a8c7e69a'];

//     const readInterface = readline.createInterface({
//         input: fs.createReadStream('./foodlist.txt'),
//         output: process.stdout,
//         console: false
//     });
//     readInterface.on('line', function (line) {
//         var price = between(50, 3000);
//         var shopid = shops[between(0,2)];
//         var item = new Items({
//             shop: shopid,
//             name: line,
//             price: price,
//             description: 'This is just test data, stop reading the damn description.'
//         });
//         item.save();
//     });
// });

module.exports = router;