var express = require('express');
var router = express.Router();
var Shops = require('../../models/shop');
var Items = require('../../models/items');

function is_valid_mongo_id(id) {
    return id.length == 24;
}
router.route('/shops')

    .get(async function (req, res) {
        var shops = await Shops.find();
        res.json(shops);
        // res.send("Hello")
    })

    .post(async function(req, res) {
        res.json({"success": false, "message": "Cannot POST this endpoint."});
    })

// Should we just return items of this shop at the same time? It will not be called often so the bandwidth used is negligible
router.route('/shops/:shop_id')
    .get(async function(req, res) {
        var shop_id = req.params.shop_id;
        if (is_valid_mongo_id(shop_id)) {
            await Shops.findById(shop_id, function (err, shop) {
                res.json(shop)
            }).catch(err => console.log(err));
        } else {
            res.json({"success": false, "message": "ID given was invalid"});
        }
    })

// we could just return the items with the shop
router.route('/shops/:shop_id/items')
    .get(async function(req, res) {
        var shop_id = req.params.shop_id;
        if (is_valid_mongo_id(shop_id)) {
            // https://mongoosejs.com/docs/api.html#model_Model.find
            await Items.find({"shop" : shop_id }, "_id name price description", function (err, items) {
                res.json(items)
            }).catch(err => console.log(err));
        } else {
            res.json({"success": false, "message": "ID given was invalid"});
        }
    })

module.exports = router;