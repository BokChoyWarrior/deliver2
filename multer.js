const multer = require('multer')
const path = require('path')
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
      cb(new Error('File type is not supported'), false)
      return
    }
    cb(null, true)
  },
  filename: async (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${req.user.shopId}-${Date.now()}.${ext}`)
  }
})
