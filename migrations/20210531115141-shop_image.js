module.exports = {
  async up (db, client) {
    await db.collection('shops').updateMany({}, { $set: { imagefile: 'default.jpg' } })
  },

  async down (db, client) {
    await db.collection('shops').updateMany({}, { $unset: { imagefile: null } })
  }
}
