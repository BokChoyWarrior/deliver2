// unfortunately this middleware only can validate one ID for now...
module.exports.validateMongoId = (req, res, next) => {
  if (req.params.id.length === 24) {
    next()
    // next() does not act as a return statement! It is simply a function call similar to "console.log()" - after executing, the subsequent code will run
  } else {
    res.status(400).json({
      status: '400',
      title: 'Invalid ID',
      detail: 'ID given must be 24 hex characters'
    })
  }
}

module.exports.respond404 = async (req, res, thing) => {
  await res.status(404).json({
    status: '404',
    title: 'Resource not found',
    detail: `${thing} not found`
  })
}
