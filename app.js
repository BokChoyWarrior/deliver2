require('dotenv').config()
const express = require('express')
const session = require('express-session') // express sessions middleware (documentation can be found at https://www.npmjs.com/package/express-session)
const MongoStore = require('connect-mongo') // this will allow us to use mongodb to store our sessions.
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport') // passport is our authentication middleware, we can configure this to allow login via google, facebook, etc... for now we'll just be using our own local authentication strategy.
require('./strategies/users')(passport) // if you want to know how our local strategy works check the ./strategies/users.js file, basic stuff really.
const nunjucks = require('nunjucks')
mongoose.set('debug', true)

let verifyEnvVars;
// eslint-disable-next-line no-unused-vars
(verifyEnvVars = () => {
  const envVars = [
    'DB_URL',
    'CLOUDINARY_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ]
  const notFoundVars = []
  for (const index in envVars) {
    const envVar = envVars[index]
    if (!process.env[envVar]) {
      notFoundVars.push(envVar)
    }
  }
  if (notFoundVars.length > 0) {
    console.error(`
🛑 Error: Could not find the following environment variables
🛑 =========================================================
\x1b[31m
🛑 ${notFoundVars.join('\n🛑 ')}
\x1b[0m
🛑 Please request them from another member of the team.
    `)
    process.exit(1)
  }
})()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const shopsRouter = require('./routes/shops')
const accountRouter = require('./routes/account')

const apiRouter = require('./routes/api')

const birdsRouter = require('./routes/birds') // for testing!

const app = express()
// sessions will be stored inside the mongodb atlas under the sessions collection.
app.use(session({
  secret: 'appleteasers', // good ol apple teasers ;P
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    autoRemove: 'native',
    ttl: 1 * 60 * 60 * 24 // this is where we set how long the session will last in seconds. (for now i've set it for 1 Day) These cookies will be destroyed automatically once they expire.
  }),
  resave: true,
  saveUninitialized: false // we don't want to store sessions of users that are not logged in.
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log('connected!')).catch(err => console.log(err))

// View engine/Nunjucks stuff //
const njenv = nunjucks.configure('views', {
  autoescape: true,
  express: app
})
app.set('view engine', 'njk')

// Add global functions which our .njk files can execute
const nunjucksGlobals = require('./lib/nunjucks_globals')
// Adding each global by name
for (const funcName in nunjucksGlobals) {
  njenv.addGlobal(funcName, nunjucksGlobals[funcName])
};

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./middleware/getShop'))
app.use(require('./middleware/shopCategories'))

app.use('/', indexRouter)

app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/shops', shopsRouter)
app.use('/birds', birdsRouter)
app.use('/account', accountRouter)

app.use('/api', apiRouter)

module.exports = app
