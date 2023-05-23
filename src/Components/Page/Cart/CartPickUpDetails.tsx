import React, { useEffect, useState } from 'react'
import cartItemModel from '../../../Interfaces/cartItemModel';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { inputHelper } from '../../../Helper';
import { MiniLoader } from '../MenuItems/Common';
import { useInitialPaymentMutation } from '../../../apis/paymentApi';
import { useNavigate } from 'react-router-dom';
import { apiResponse } from '../../../Interfaces';


export default function CartPickUpDetails() {
    const [loading, setLoading] = useState(false);
    const shoppingCartFromStore: cartItemModel[] = useSelector((state:RootState)=> state.shoppingCartStore.cartItems??[]);
    const [initiatePayment] = useInitialPaymentMutation();
    const navigate = useNavigate();
    const userData = useSelector((state:RootState)=>state.userAuthStore);
    let grandTotal = 0;
    let totalItems = 0;
    const initialUserData = {
        name: userData.fullName,
        email:userData.email,
        phoneNumber:"",
    };
    shoppingCartFromStore?.map((cartItem:cartItemModel) => {
        totalItems +=cartItem.quantity??0;
        grandTotal +=(cartItem.menuItem?.price??0)*(cartItem.quantity ??0);
        return null;
    });
    const [userInput,setUserInput] = useState(initialUserData);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e,userInput);
        setUserInput(tempData);

    };

    useEffect(()=>{
        setUserInput({
            name:userData.fullName,
            email:userData.email,
            phoneNumber:"",

        });
    },[userData])

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        const {data}:apiResponse = await initiatePayment(userData.id);
        // const orderSummary = {grandTotal,totalItems};
        navigate("/KimFood/payment",{state:{apiResult:data?.result,userInput}})
    };
  return (
    <div className = "border pb-5 pt-3">
        <h1 style = {{fontWeight : "300"}} className ="text-center text-success">
            Pick Up Details
        </h1>
        <hr />
        <form onSubmit = {handleSubmit} className = "col-10 mx-auto">
            <div className = "form-group mt-3">
                Pick Up Name
                <input type = "text" value = {userInput.name} className="form-control" placeholder='name...' name ="name" onChange ={handleUserInput} required />
            </div>
            <div className = "form-group mt-3">
                Pickup Email
                <input type = "email" value = {userInput.email} className = "form-control" placeholder = "email..." name ="email" onChange ={handleUserInput} required/>
            </div>

            <div className = "form-group mt-3">
                Pickup Phone Number
                <input type = "number" value = {userInput.phoneNumber} className = "form-control" placeholder='phone number...' name ="phoneNumber" onChange ={handleUserInput} required />
            </div>

            <div className = "form-group mt-3">
                <div className = "card p-3" style ={{background:"ghostwhite"}}>
                    <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
                    <h5>No of Items: {totalItems}</h5>
                </div>
            </div>
            <button type ="submit" className ="btn btn-lg btn-success form-control mt-3" disabled ={loading}>
                {loading?<MiniLoader />:"Looks Good? Place Order!"}
                
            </button>
        </form>
    </div>
  )
}

