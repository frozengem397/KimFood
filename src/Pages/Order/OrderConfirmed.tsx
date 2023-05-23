import React from 'react'
import { useParams } from 'react-router-dom';
//let confirmedImage = require("../../Assets/Images/confirmed.jpg")

function OrderConfirmed() {
    const {id} = useParams();
  return (
    <div className = "w-100 text-center d-flex justify-content-center align-items-center">
        <div>
            <i style = {{fontSize:"7rem"}} className = "bi bi-check2-circle text-success"></i>
            <div className = "pb-5">
                <h2 className = "text-success">Order has been Confirmed</h2>
                <h5 className ="mt-3">Your order ID: {id}</h5>
                <p>We will start to cook</p>
                
            </div>
        </div>
    </div>
  )
}

export default OrderConfirmed