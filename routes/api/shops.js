const express = require('express')
const router = express.Router()
const Shops = require('../../models/shop')
const Items = require('../../models/items')

const { respond404, validateMongoId } = require('../../lib/api')
const thing = 'shop'

router.route('/')

  .get(async (req, res) => {
    const shops = await Shops.find()
    res.json(shops)
  })

// .post(async (req, res) => {
//     res.json({ "error": "Cannot POST this endpoint." });
// })

// Should we just return items of this shop at the same time? It will not be called often so the bandwidth used is negligible
router.route('/:id')
// we insert "validateMongoId" as middleware
  .get(validateMongoId, async (req, res) => {
    const shopId = req.params.id
    await Shops.findById(shopId, '_id name description imagefile', (_err, shop) => {
      if (shop) {
        res.json(shop)
      } else {
        respond404(req, res, thing)
      }
    })
  })

// we could just return the items with the shop
router.route('/:id/items')
  .get(validateMongoId, async (req, res) => {
    const shopId = req.params.id
    await Items.find({ shop: shopId }, '_id name price description', async (_err, items) => {
      res.json(items)
    })
  })

module.exports = router
