module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    // req.flash('error_msg', 'Please log in to access this feature')
    res.redirect('/users/login')
  },

  ensureAuthenticatedAPI: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    res.status(401).json({
      status: '401',
      title: 'Not authenticated',
      detail: 'This resource requires authentication.'
    })
  }
}
