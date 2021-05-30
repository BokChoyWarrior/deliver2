module.exports = {
  async up (db, client) {
    await db.collection('users').updateMany({ type: 1 }, { $set: { shopId: null } })
  },

  async down (db, client) {
    await db.collection('users').updateMany({ type: 1 }, { $unset: { shopId: null } })
  }
}
