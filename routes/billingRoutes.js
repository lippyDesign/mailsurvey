const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
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