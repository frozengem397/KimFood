import React from 'react'
import cartItemModel from '../../../Interfaces/cartItemModel'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Storage/Redux/store'
import { removeFromCart, updateQuantity } from '../../../Storage/Redux/shoppingCartSlice';
import { useUpdateShoppingCartMutation } from '../../../apis/shoppingCartApi';
import { userModel } from '../../../Interfaces';


function CartSummary() {
    const dispatch = useDispatch();
    const [updateShoppingCart] = useUpdateShoppingCartMutation();
    const userData:userModel = useSelector((state:RootState)=>state.userAuthStore);
    const shoppingCartFromStore: cartItemModel[] = useSelector((state:RootState)=> state.shoppingCartStore.cartItems??[]);
    if(!shoppingCartFromStore) {
        return <div>Shopping Cart Empty</div>
    }

    const handleQuantity = (updateQuantityBy : number,cartItem:cartItemModel)=>{
        if(updateQuantityBy ==-1 && cartItem.quantity==1 || updateQuantityBy == 0){
            updateShoppingCart({
                menuItemId:cartItem.menuItem?.id,
                updateQuantityBy:0,
                userId:userData.id,
            })
            dispatch(removeFromCart({cartItem,quantity:0}))
            

        }
        else{
            updateShoppingCart({
                menuItemId:cartItem.menuItem?.id,
                updateQuantityBy:updateQuantityBy,
                userId:userData.id,
            })
            dispatch(updateQuantity({cartItem,quantity:cartItem.quantity!+updateQuantityBy}))
            

        }

    }
  return (
    <div className = "container p-4 m-2">
        <h4 className = "text-center text-success">Cart Summary</h4>
        {shoppingCartFromStore.map((cartItem:cartItemModel,index:number)=>(
            <div key ={index} className='d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3' style ={{background:"ghostwhite"}}>
            <div className ="p-3">
                <img src= {cartItem.menuItem?.image}
                    alt = ""
                    width = {"120px"}
                    className = "rounded-circle" />
            </div>

            <div className ="p-2 mx-3" style = {{width: "100%"}}>
                <div className ="d-flex justify-content-between align-items-center">
                    <h4 style ={{fontWeight:300}}>{cartItem.menuItem?.name}</h4>
                    <h4>{(cartItem.quantity!*cartItem.menuItem!.price).toFixed(2)}</h4>
                </div>
                <div className = "flex-fill">
                    <h4 className = "text-danger">${cartItem.menuItem!.price}</h4>
                </div>
                <div className = "d-flex justify-content-between">
                    <div className = "d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow" style ={{width:"100px",height:"4px",}}>
                        <span style = {{color:"rgba(22,22,22,.7)"}} role = "button">
                            <i className = "bi bi-dash-circle-fill" onClick={()=>handleQuantity(-1,cartItem)}></i>
                        </span>
                        <span>
                            <b>{cartItem.quantity}</b>
                        </span>
                        <span style ={{color:"rgba(22,22,22,.7)"}} role = "button">
                            <i className ="bi bi-plus-circle-fill" onClick={()=>handleQuantity(1,cartItem)}></i>
                        </span>
                    </div>
                    <button className = "btn btn-danger mx-1" onClick={()=>handleQuantity(0,cartItem)}>Remove</button>
                </div>
            </div>
        </div>

        ))}
        

    </div>
  )
}

export default CartSummary