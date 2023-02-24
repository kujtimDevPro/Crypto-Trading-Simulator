import {useState, useContext, useEffect, useCallback, useMemo} from "react";
import {GlobalfeedContext} from "../../provider/globalfeed";
import truncateWallet from "../../utils/truncateWallet";
import {SERVER_URL} from "../../constants/env";

import './index.css';


const RecentOrder = () => {
  const globalfeed = useContext(GlobalfeedContext);

  useEffect(()=>{
    globalfeed.getAllOrders();
  },[])


  return (
    <div>
      <div className="table_header">
        <span className="p4" style={{width: "30%"}}>User</span>
        <span className="p4" style={{width: "5%"}}>Order Mode</span>
        <span className="p4" style={{width: "5%"}}>Order Type</span>
        <span className="p4" style={{width: "5%"}}>Symbol</span>
        <span className="p4" style={{width: "15%"}}>Amount</span>
        <span className="p4" style={{width: "10%"}}>Price</span>
        <span className="p4" style={{width: "10%"}}>total</span>
        <span className="p4" style={{width: "10%"}}>created</span>
        <span className="p4" style={{width: "10%"}}>status</span>

    </div>
    { globalfeed.globalfeeds &&
      globalfeed.globalfeeds.map((el, idx) => {
          return(
            <div className="table_body" key={idx}>
                <span className="p4 user-set" style={{width: "30%"}}>
                  <img  src={`${SERVER_URL}/useravatar/${el.order_owner.userAvatar}`} style={{width: "36px", borderRadius : '70px', margin: '4px'}}/>
                  {`${el.order_owner.userName} (${truncateWallet(el.order_owner.walletAddress)})`}
                </span>
                <span className="p4" style={{width: "5%"}}>{el.order_mode}</span>
                <span className="p4" style={{width: "5%"}}>{el.order_type}</span>
                <span className="p4" style={{width: "5%"}}>{el.symbol}</span>
                <span className="p4" style={{width: "15%"}}>{el.amount.toFixed(4)}</span>
                <span className="p4" style={{width: "10%"}}>{el.price.toFixed(4)}</span>
                <span className="p4" style={{width: "10%"}}>{(parseFloat(el.price) * parseFloat(el.amount)).toFixed(4)}</span>
                <span className="p4" style={{width: "10%"}}>{el.created}</span>
                <span className="p4" style={{width: "10%"}}>{el.status}</span>

            </div>
            )
        })
      }
    </div>
   
  );
}

export default RecentOrder;
