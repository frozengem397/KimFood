import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Header, Footer} from "../Components/Layout";
import { Home,NotFound,MenuItemDetails, MenuItemList, MenuItemUpsert, ShoppingCart, Register, Login, AuthenticationTest, AuthenticationTestAdmin, AccessDenied, OrderConfirmed, MyOrder, OrderDetails, AllOrders } from '../Pages';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../apis/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import { userModel } from '../Interfaces';
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';
import Payment from '../Pages/Payment';



function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData:userModel = useSelector((state:RootState)=>state.userAuthStore);
  const {data, isLoading} = useGetShoppingCartQuery(userData.id,{
    skip:skip
  });
  useEffect(()=>{
    if (!isLoading && data){
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  },[data]);

  useEffect(()=>{
    const localToken = localStorage.getItem("token");
    if(localToken) {
      const {fullName,id,email,role}:userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({fullName,id,email,role}));
    }   
  },[])

  useEffect(()=>{
    if(userData.id) setSkip(false);
  },[userData]);

  return (
    <div className="text-success">

      <Header />
      <div className = "pb-5">
        <Routes>
          <Route path="/" element = {<Home />}></Route>
          <Route path="/KimFood" element = {<Home />}></Route>
          <Route path="/KimFood/menuItemDetails/:menuItemId" element = {<MenuItemDetails />}></Route>
          <Route path="/KimFood/shoppingCart" element = {<ShoppingCart />}></Route>
          <Route path="/KimFood/register" element = {<Register />}></Route>
          <Route path ="/KimFood/login" element = {<Login />}></Route>
          <Route path="/KimFood/menuItem/menuitemlist" element = {<MenuItemList />}></Route>
          <Route path="/KimFood/menuItem/menuItemUpsert/:id" element = {<MenuItemUpsert />}></Route>
          <Route path="/KimFood/menuItem/menuItemUpsert" element = {<MenuItemUpsert />}></Route>
          <Route path ="/KimFood/authentication" element = {<AuthenticationTest/>}></Route>
          <Route path ="/KimFood/authorization" element = {<AuthenticationTestAdmin/>}></Route>
          <Route path ="/KimFood/accessDenied" element = {<AccessDenied/>}></Route>
          <Route path = "/KimFood/payment" element = {<Payment/>}></Route>
          <Route path = "/KimFood/order/orderconfirmed/:id" element = {<OrderConfirmed />}></Route>
          <Route path ="/KimFood/order/myOrders" element={<MyOrder />}></Route>
          <Route path ="/KimFood/order/orderDetails/:id" element ={<OrderDetails />}></Route>
          <Route path = "/KimFood/order/allOrders" element ={<AllOrders />}></Route>
          

          <Route path="*" element = {<NotFound />}></Route>
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
