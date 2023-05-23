import React, { useState } from 'react';

import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { toastNotify } from '../../../Helper';
import { OrderSummaryProps, apiResponse, cartItemModel } from '../../../Interfaces';
import { useCreateOrderMutation } from '../../../apis/orderApi';
import { useNavigate } from 'react-router-dom';


function PaymentForm({data,userInput}:OrderSummaryProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect:"if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured.", "error")
    } else {
      let grandTotal = 0;
      let totalItems = 0;
      const orderDetailsDTO: any = [];
      data.cartItems?.forEach((item:cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuitemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal +=(item.quantity!*item.menuItem?.price!);
        totalItems+=item.quantity!;
        

        

      });
      const response: apiResponse = await createOrder({
        pickupName:userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail:userInput.email,
        totalItems:totalItems,
        orderTotal:grandTotal,
        orderDetailsDTO:orderDetailsDTO,
        stripePaymentIntentID: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:result.paymentIntent.status === "succeeded"?"Confirmed":"Pending"

      });
      if(response){
        if(response.data?.result.status ==="Confirmed"){
          navigate(`/order/orderconfirmed/${response.data.result.orderHeaderId}`);
        }
        else {
          navigate("/failed");
        }
      }
      
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled ={!stripe || isProcessing} className='btn btn-success mt-5 w-100'>
        <span id= "button-text">
          {isProcessing? "Processing...":"Submit Order"}
        </span>
      </button>
    </form>
  )
}

export default PaymentForm