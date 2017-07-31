const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// import our google credentials from the keys file
const { googleClientID, googleClientSecret } = require('../config/keys');

// load the mongoose model class for User
const User = mongoose.model('users');

// turn user model into mongo id
passport.serializeUser((user, done) => done(null, user.id));

// turn mongo id back into user model
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // once athenticated, check if the user already exists in our mongo db
    User.findOne({ googleId: profile.id })
      .then(existingUser => {
        // if user already exists
        if (existingUser) {
          // call done with no error and the existing user
          done(null, existingUser);
        } else {
          // if no user record exists in our mongo db, save the google user id into db (create new user record)
          new User({ googleId: profile.id }).save()
            // call done with no error and the new user
            .then(user => done(null, user));
        }
      });
  })
);