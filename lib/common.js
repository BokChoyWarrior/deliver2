const User = require('../models/user')

exports.findOrCreateShopBasket = async function (user, shopId) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('Timeout waiting to contact DB')), 1000)
    User.findById(user._id).populate({
      path: 'baskets.basket.item',
      shop: { $eq: shopId }
    }).then((userModel) => {
      const baskets = userModel.baskets
      // eslint-disable-next-line eqeqeq
      let basketIndex = baskets.findIndex(x => x.shop == shopId)
      if (basketIndex === -1) {
        console.log(basketIndex, 'not found!')
        baskets.push({
          shop: shopId,
          basket: []
        })
        userModel.save()
        // eslint-disable-next-line eqeqeq
        basketIndex = baskets.findIndex(x => x.shop == shopId)
      }
      // console.log(typeof userModel.baskets[basketIndex].basket)
      // .then(data => promise.resolve(data))

      resolve(userModel.baskets[basketIndex].basket)
    })
  })
  return promise
}

// let result2 = await Post.aggregate([
//   // Only get documents with a matching entry
//   { "$match": {
//     "targets.kind": "Foo"
//   }},
//   // Optionally filter the array
//   { "$addFields": {
//     "targets": {
//       "$filter": {
//         "input": "$targets",
//         "cond": {
//           "$eq": [ "$$this.kind", "Foo" ]
//          }
//       }
//     }
//   }},
//   // Lookup from single source
//   { "$lookup": {
//     "from": Target.collection.name,
//     "localField": "targets.item",
//     "foreignField": "_id",
//     "as": "matches"
//   }},
//   // Marry up arrays
//   { "$project": {
//     "name": 1,
//     "targets": {
//       "$map": {
//         "input": "$targets",
//         "in": {
//           "kind": "$$this.kind",
//           "item": {
//             "$arrayElemAt": [
//               "$matches",
//               { "$indexOfArray": [ "$matches._id", "$$this.item" ] }
//             ]
//           }
//         }
//       }
//     }
//   }}
// ]);
// log(result2);
