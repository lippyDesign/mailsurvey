const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // the middleware will check if user is logged in
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // if charge is good, add credits to user db
    req.user.credits += 5;
    // save user and get a new copy
    const user = await req.user.save();
    // send the new user to the front end
    res.send(user)
  });
};