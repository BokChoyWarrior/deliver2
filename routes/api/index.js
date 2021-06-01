// This simple file is searched for when we "require()" a whole directory. In this case: /routes/api/
// Since we then "app.use('/api', apiRouter);", we know that "/api" will be prepended to any route used here

const { ensureAuthenticatedAPI } = require('../../strategies/auth')

const router = require('express').Router()

router.use('/shops', require('./shops'))
router.use('/items', require('./items'))
router.use('/account', ensureAuthenticatedAPI, require('./account'))

module.exports = router
