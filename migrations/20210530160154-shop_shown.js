module.exports = {
  async up (db, client) {
    await db.collection('shops').updateMany({}, { $set: { shown: false } })
  },

  async down (db, client) {
    await db.collection('shops').updateMany({}, { $unset: { shown: null } })
  }
}
