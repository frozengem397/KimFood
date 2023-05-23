import React, { useState } from 'react'
import { OrderSummaryProps, cartItemModel } from '../../../Interfaces'
import { getStatusColor } from '../../../Helper'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { useUpdateOrderHeaderMutation } from '../../../apis/orderApi';
import { MainLoader } from '../MenuItems/Common';


function OrderSummary({data,userInput}:OrderSummaryProps) {
    const naviagte = useNavigate();
    const badgeTypeColor = getStatusColor(data.status!);
    const [updateOrderDetails] = useUpdateOrderHeaderMutation();
    const userData = useSelector((state:RootState)=>state.userAuthStore);
    const [loading,setIsLoading] = useState(false);
    const nextStatus: any = data.status! === "Confirmed" ?
    {color:"info",value:"Being Cooked"}:data.status! === "Being Cooked"?
    {color:"warning",value:"Ready"}:data.status! === "Ready" && {color:"success",value:"Completed"};
    const handleNextStatus = async () => {
        setIsLoading(true);
        await updateOrderDetails({
            orderHeaderId:data.id,
            status:nextStatus.value,

        })
        setIsLoading(false);

    }

    const handleCancel = async () => {
        setIsLoading(true);
        await updateOrderDetails({
            orderHeaderId:data.id,
            status:"Cancelled",
            
        })
        setIsLoading(false);
        
    }
  return (
    <div>
        {loading && <MainLoader />}
        {!loading && (
            <><div className="d-flex justify-content-between align-items-center">
                  <h3 className="text-success">Order Sumary</h3>
                  <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
                      {data.status}
                  </span>
              </div><div className="mt-3">
                      <div className="border py-3 px-2">Name : {userInput.name}</div>
                      <div className="border py-3 px-2">Email : {userInput.email}</div>
                      <div className="border py-3 px-2">Phone : {userInput.phoneNumber}</div>
                      <div className="border py-3 px-2">
                          <h4 className="text-success">Menu Items</h4>
                          <div className="p-3">
                              {data.cartItems?.map((cartItem: cartItemModel, index: number) => {
                                  return (
                                      <div className="d-flex" key={index}>
                                          <div className="d-flex w-100 justify-content-between">
                                              <p>{cartItem.menuItem?.name}</p>
                                              <p>${cartItem.menuItem?.price} X {cartItem.quantity}</p>
                                          </div>
                                          <p style={{ width: "70px", textAlign: "right" }}>${(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}</p>
                                      </div>

                                  );
                              })}
                              <hr />
                              <h4 className="text-danger" style={{ textAlign: "right" }}>${data.cartTotal}</h4>
                          </div>
                      </div>
                  </div><div className="d-flex justify-content-between align-items-center mt-3">
                      <button className="btn btn-secondary" onClick={() => { naviagte(-1); } }>
                          Back to Orders
                      </button>
                      {userData.role == "admin" && (
                          <div className='d-flex'>
                            {data.status! !=="Cancelled" && data.status! !=="Completed" && (
                                <button className="btn btn-danger mx-2" onClick={handleCancel}>Cancel</button>

                            )}
                              
                              <button className={`btn btn-${nextStatus.color}`} onClick={handleNextStatus}>{nextStatus.value}</button>
                          </div>
                      )}
                  </div></>
        )}   
    </div>
  )
}

export default OrderSummary