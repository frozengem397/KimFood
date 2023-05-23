import React from 'react';
import { withAdminAuth, withAuth } from '../../HOC';
import {useSelector} from "react-redux";
import { RootState } from '../../Storage/Redux/store';
import { useGetAllOrdersQuery } from '../../apis/orderApi';
import { MainLoader } from '../../Components/Page/MenuItems/Common';
import orderHeader from '../../Interfaces/orderHeader';
import OrderList from '../../Components/Page/Order/OrderList';

function AllOrders() {
    const {data, isLoading} = useGetAllOrdersQuery("");

    
  return (
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (<OrderList isLoading ={isLoading} orderData={data.result} />)}
    
    </>
  )
}

export default withAdminAuth(AllOrders)