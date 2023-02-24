import {useState, useContext, useEffect, useCallback} from "react";
import OrderHistory from "../orderHistory";
import {OrderContext} from "../../provider/order";

import './index.css';


const MyOrderHistory = () => {

  const [tab, setTab] =  useState({mode: 0, content: "executed, canceled, pending"});
  const order = useContext(OrderContext);
  useEffect(()=>{
    order.getMyOrders();
  },[])

  return (
    <OrderHistory orders = {order.myOrders} />
  );
}

export default MyOrderHistory;
