var express = require('express');
var router = express.Router();
var Shops = require('../../models/shop');
var Items = require('../../models/items');

const { respond_404, validate_mongo_id } = require('../../lib/api');
const thing = "shop"

router.route('/')

    .get(async (req, res) => {
        var shops = await Shops.find();
        res.json(shops);
    })

    // .post(async (req, res) => {
    //     res.json({ "error": "Cannot POST this endpoint." });
    // })

// Should we just return items of this shop at the same time? It will not be called often so the bandwidth used is negligible
router.route('/:id')
    // we insert "validate_mongo_id" as middleware
    .get(validate_mongo_id, async (req, res) => {
        var shop_id = req.params.id;
        await Shops.findById(shop_id, "_id name description", (err, shop) => {
            if (shop) {
                res.json(shop)
            } else {
                respond_404(req, res, thing)
            }

        });
    })

// we could just return the items with the shop
router.route('/:id/items')
    .get(validate_mongo_id, async (req, res) => {
        var shop_id = req.params.id;
        await Items.find({ "shop": shop_id }, "_id name price description", async (err, items) => {
            res.json(items)
        });
    })

module.exports = router;