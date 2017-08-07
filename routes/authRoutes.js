const passport = require('passport');

module.exports = app => {
  // use 'google' because internally GoogleStrategy has an internal identifier of 'google'
  // we ask google to give use 'profile', 'email'
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // we told google to send the code to '/auth/google/callback'
  // after the user has been authenticated, so this is a route to handle it.
  app.get(
    '/auth/google/callback',
    // use passport to authenticate
    passport.authenticate('google'),
    // send user to dashboard after they succesfully log in with google
    (req, res) => {
      res.redirect('/surveys')
    }
  );

  // logout user
  app.get('/api/logout', (req, res) => {
    // logout function automatically gets attached to the req object by passport
    console.log('about to log out')
    req.logout();
    console.log('logged out')
    // send blank response
    res.redirect('/');
  });

  // send the currently logged in user object back to the client (empty string if not logged in)
  app.get('/api/current-user', (req, res) => {
    res.send(req.user);
  });
};