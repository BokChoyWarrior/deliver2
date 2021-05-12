require('dotenv').config();
var express = require('express');
var session = require('express-session'); //express sessions middleware (documentation can be found at https://www.npmjs.com/package/express-session)
var MongoStore = require('connect-mongo'); //this will allow us to use mongodb to store our sessions.
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport'); //passport is our authentication middleware, we can configure this to allow login via google, facebook, etc... for now we'll just be using our own local authentication strategy.
require('./strategies/users')(passport); //if you want to know how our local strategy works check the ./strategies/users.js file, basic stuff really.
var nunjucks = require('nunjucks');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var shopsRouter = require('./routes/shops');

var birdsRouter = require('./routes/birds'); // for testing!


var app = express();
//sessions will be stored inside the mongodb atlas under the sessions collection.
app.use(session({
  secret: 'appleteasers', //good ol apple teasers ;P
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  resave: true,
  saveUninitialized: false, //we don't want to store sessions of users that are not logged in.
  expires: new Date(Date.now() + 3600000) //how long the session will last for this user.
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log('connected!')).catch(err => console.log(err));

var njenv = nunjucks.configure('views', {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');

// Add global functions which our .njk files can execute
var nunjucks_globals = require('./lib/nunjucks_globals').globalsToAdd;
for (funcName in nunjucks_globals) {
  njenv.addGlobal(funcName, nunjucks_globals[funcName]);
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/shops', shopsRouter);
app.use('/birds', birdsRouter);

module.exports = app;
