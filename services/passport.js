const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// import our google credentials
const { googleClientID, googleClientSecret } = require('../config/keys');

// load the mongoose model class for User
const User = mongoose.model('users');

// turn user model into mongo id
passport.serializeUser((user, done) => done(null, user.id));

// turn mongo id back into user model
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

// instruct passport to use Google Strategy with the credentials that we have
passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback', // the url to which the user gets redirected after they've been authenticated with google
    proxy: true // trust proxies to calculate call back url correctly from relative path
  },
  // recieve google data and
  async (accessToken, refreshToken, profile, done) => {
    // once athenticated, check if the user already exists in our mongo db
    const existingUser = await User.findOne({ googleId: profile.id });
    // if user already exists
    if (existingUser) {
      // return early calling done with no error and the existing user
      return done(null, existingUser);
    }
    // if no user record exists in our mongo db, save the google user id into db (create new user record)
    const user = await new User({ googleId: profile.id }).save();
    // call done with no error and the new user
    done(null, user);
  })
);