module.exports = {
  async up(db, client) {
    await db.collection('users').updateMany({}, { $set: { type: 0 } })
  },

  async down(db, client) {
    await db.collection('users').updateMany({}, { $unset: { type: null } })
  }
};
