module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $set: { baskets: [] } })
    await db.collection('users').updateMany({}, { $unset: { basket: null } })
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $unset: { baskets: null } })
  }
};
