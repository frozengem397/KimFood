import React from 'react'
import { useLocation } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from '../Components/Page/Payment';
import { OrderSummary } from '../Components/Page/Order';

function Payment() {
    const {state:{apiResult,userInput}} = useLocation();
    const stripePromise = loadStripe('pk_test_51N0HBGCaIUhL31tJWFO1CLKX9L13PyvXLYvifuGTbSYzBXgJRMIDeIPWLjhHzbGPP282GgFPOJCNzPlG0RCWpWQD00s0cmXIHX');
    const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult.clientSecret,
      };
  return (
    <Elements stripe={stripePromise} options={options}>
        <div className = "container m-5 p-5">
            <div className="row">
                <div className="col-md-7"><OrderSummary data = {apiResult} userInput ={userInput}/></div>
                <div className= "col-md-4 offset-md-1">
                    <h3 className = "text-success">Payment</h3>
                    <div className="col-md-5"><PaymentForm data = {apiResult} userInput ={userInput} /></div>
                    
                </div>
                
            </div>
        </div>
      
    </Elements>
  )
}

export default Payment