const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// import mongo authentication string
const { mongoURI, cookieKey } = require('./config/keys');

// import User Model before importing passport
require('./models/User');

// import all authentication (passport.js) code
require('./services/passport');

// connect mongo to mongoose
mongoose.connect(mongoURI);

const app = express();

// tell express that it needs to use cookies middleware
app.use(
  cookieSession({
    // how long a cookie can exist before expiring
    maxAge: 30 * 24 * 60 * 60 * 1000, // (1 month)
    // key is used to encrypt a cookie
    keys: [cookieKey]
  })
);

// tell express that it needs to use passport middleware for auth
app.use(passport.initialize());
app.use(passport.session());

// will inject app object into authRoutes because authRoutes makes use of app
require('./routes/authRoutes')(app);

// set PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`listening on port: ${PORT}`));