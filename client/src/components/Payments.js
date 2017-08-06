import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../actions';

class Payments extends React.Component {
  render() {
    return <StripeCheckout
      name='Email Surveys' // title of the box
      description='$5 for 5 credits'
      amount={500} // cents
      token={token => this.props.handleStripeToken(token)} // callback function sent by stripe
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  }
}

export default connect(null, { handleStripeToken })(Payments);