module.exports = {
  async up (db, client) {
    await db.collection('shops').updateMany({}, { $set: { categories: [] } })
  },

  async down (db, client) {
    await db.collection('shops').updateMany({}, { $unset: { categories: null } })
  }
}
