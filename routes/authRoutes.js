const passport = require('passport');

module.exports = app => {
  // use 'google' because internally GoogleStrategy has an internal identifier of 'google'
  // we ask google to give use 'profile', 'email'
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // we told google to send the code to '/auth/google/callback'
  // after the user has been authenticated, so this is a route to handle it.
  app.get('/auth/google/callback', passport.authenticate('google'));

  // logout user
  app.get('/api/logout', (req, res) => {
    // logout function automatically gets attached to the req object by passport
    req.logout();
    // send blank response
    res.send(req.user);
  });

  // send the user back to the client
  app.get('/api/current-user', (req, res) => {
    res.send(req.user);
  });
};