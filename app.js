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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var shopsRouter = require('./routes/shops');
var addItemRouter = require('./routes/addItem');


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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/shops', shopsRouter);
app.use('/birds', birdsRouter);
app.use('/addItem', addItemRouter);


app.use('/api', apiRouter)

module.exports = app
