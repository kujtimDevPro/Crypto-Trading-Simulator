import React, {useState, useContext, useEffect, useCallback} from "react";
import formateDate from "../../utils/formatDate";
import { SERVER_URL } from "../../constants/env";
import './index.css';


const TradeComponent = ({element, userAvatar, userName}) => {

  return (
      <div className="border-bottom-1 mt-16">
          <div className="flex flex-between">
            <img  src={`${SERVER_URL}/useravatar/${userAvatar}`} className="border-50 w-36 m-16"/>
            <div className="text-left  flex-grow">
              <span>{userName}</span>
              <span>+2.7%</span>
            </div>
            <div className="header-button">
              {`$${parseFloat(element.price) * parseFloat(element.amount)} => ${element.amount} ${element.symbol.split("USD")}`}
            </div>
          </div>

          <div>
            <div className="table_body">
              <span className="p4 font-grey" style={{width: "10%"}}>Mode</span>
              <span className="p4 font-grey" style={{width: "10%"}}>Type</span>
              <span className="p4 font-grey" style={{width: "20%"}}>Symbol</span>
              <span className="p4 font-grey" style={{width: "10%"}}>Amount</span>
              <span className="p4 font-grey" style={{width: "10%"}}>Price</span>
              <span className="p4 font-grey" style={{width: "20%"}}>total</span>
              <span className="p4 font-grey" style={{width: "20%"}}>created</span>
            </div>

            <div className="table_body" >
              <span className="p4" style={{width: "10%"}}>{element.order_mode}</span>
              <span className="p4" style={{width: "10%"}}>{element.order_type}</span>
              <span className="p4" style={{width: "20%"}}>{element.symbol}</span>
              <span className="p4" style={{width: "10%"}}>{element.amount}</span>
              <span className="p4" style={{width: "10%"}}>{element.price}</span>
              <span className="p4" style={{width: "20%"}}>{parseFloat(element.price) * parseFloat(element.amount)}</span>
              <span className="p4" style={{width: "20%"}}>{formateDate(element.created)}</span>
            </div>
          </div>
        </div>
  );
}

export default TradeComponent;
