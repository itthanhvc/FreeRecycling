// Required Modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
var cors = require('cors')
var mongoose = require("mongoose");
var auth = require('./routes/auth');
var user = require('./routes/user');
var location = require('./routes/location');
var donation = require('./routes/donation');
var appSettings = require('./app.settings');

var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//enable pre-flight across-the-board like so
app.options('*', cors());

app.use('/api/authenticate', auth);
app.use('/api/user', user);
app.use('/api/location', location);
app.use('/api/donations', donation);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// run appSettings
appSettings.initialize(app);
app.listen(appSettings.getConfig('port'), function () {
  console.log('Example app listening on port!' + appSettings.getConfig('port'))
})
// Connect to DB
mongoose.connect(appSettings.getConfig('env.MONGO_URL'), {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectTimeoutMS: 0
    }
  }
});
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + appSettings.getConfig('env.MONGO_URL'));
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

module.exports = app;
