import {useState, useContext, useEffect, useCallback} from "react";
import { isJSDocReturnTag } from "typescript";
import {OrderContext} from "../../provider/order";

import './index.css';


const OrderHistory = ({orders}) => {

  const [tab, setTab] =  useState({mode: 0, content: "executed, canceled, pending"});
  const order = useContext(OrderContext);
  const totalTrades = useCallback(()=>{
    let trades = 0;
    if(!orders)
      return "$0.00";
      orders.map(el => {
        trades += parseFloat(el.price) * parseFloat(el.amount);
      })

    return `$${trades.toFixed(2)}`
  },[orders])

  const totalTradesCount = useCallback(()=>{
    if(!orders)
      return 0;

    return orders.length;
  },[orders])

  return (
    <div className="order_history">
      <ul >
        <li style={{display: "inline"}} className = {`p4 ${tab.mode == 0 ? "tab-selected" : "tab"}`} onClick = {() => setTab({mode: 0, content: "executed, canceled, pending"})}>All</li>
        <li style={{display: "inline"}} className = {`p4 ${tab.mode == 1 ? "tab-selected" : "tab"}`} onClick = {() => setTab({mode: 1, content: "executed"})}>Executed</li>
        <li style={{display: "inline"}} className = {`p4 ${tab.mode == 2 ? "tab-selected" : "tab"}`} onClick = {() => setTab({mode: 2, content: "pending"})}>Pending</li>
        <li style={{display: "inline"}} className = {`p4 ${tab.mode == 3 ? "tab-selected" : "tab"}`} onClick = {() => setTab({mode: 3, content: "canceled"})}>Canceled</li>
      </ul>

<div style={{margin: "20px"}}></div>
        <div>
          <span className="p4 m8">Total Trades amount: {totalTrades()}</span>
          <span className="p4 m8">Total Trades count: {totalTradesCount()}</span>
        </div>

<div style={{margin: "20px"}}></div>

        <div className="table_header">
            <span className="p4" style={{width: "10%"}}>No</span>
            <span className="p4" style={{width: "10%"}}>Order Mode</span>
            <span className="p4" style={{width: "10%"}}>Order Type</span>
            <span className="p4" style={{width: "10%"}}>Symbol</span>
            <span className="p4" style={{width: "10%"}}>Amount</span>
            <span className="p4" style={{width: "10%"}}>Price</span>
            <span className="p4" style={{width: "10%"}}>total</span>
            <span className="p4" style={{width: "10%"}}>created</span>
            <span className="p4" style={{width: "10%"}}>status</span>
            <span className="p4" style={{width: "10%"}}>action</span>

        </div>
        { orders &&
          orders.map((el, idx) => {
            if(tab.content.includes(el.status))
              return(
              <div className="table_body" key={idx}>
                  <span className="p4" style={{width: "10%"}}>{idx + 1}</span>
                  <span className="p4" style={{width: "10%"}}>{el.order_mode}</span>
                  <span className="p4" style={{width: "10%"}}>{el.order_type}</span>
                  <span className="p4" style={{width: "10%"}}>{el.symbol}</span>
                  <span className="p4" style={{width: "10%"}}>{el.amount}</span>
                  <span className="p4" style={{width: "10%"}}>{el.price}</span>
                  <span className="p4" style={{width: "10%"}}>{parseFloat(el.price) * parseFloat(el.amount)}</span>
                  <span className="p4" style={{width: "10%"}}>{el.created}</span>
                  <span className="p4" style={{width: "10%"}}>{el.status}</span>
                  <button onClick={()=>order.cancelOrder(el._id)} disabled={el.status == "pending"?false:true} style={{width: "10%"}}>Cancel</button>

              </div>
              )
             
          })
        }
    </div>
  );
}

export default OrderHistory;
