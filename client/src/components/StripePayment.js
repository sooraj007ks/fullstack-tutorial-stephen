import React, { Component } from 'react';
import Stripe from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripePayment extends Component{

  render(){
    return (
      <Stripe 
        name="Emaily"
        description="$5 for 5 email credits"
        amount={ 500 }
        token={ token => this.props.handleToken(token) }
        stripeKey={ process.env.REACT_APP_STRIPE_PK }
      >
        <button className="btn"> Add Credits</button>
      </Stripe>
    )
  }
};

export default connect(null, actions)(StripePayment);