import React, { useState, useContext, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../provider/user";
import { OrderContext } from "../../provider/order";
import Header from "../../components/header";
import TradeComponent from "../../components/tradeComponent";
import AnalysisComponent from "../../components/analysisComponent";
import HoldingComponent from "../../components/holdingComponent";
import { useTotalBalance } from "../../hooks/useTotalBalance";
import formateDate from "../../utils/formatDate";
import { SERVER_URL } from "../../constants/env";
import './index.css';


const Profile = (props) => {
  const [fileSource, setFileSource] = useState();
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const user = useContext(UserContext);
  const order = useContext(OrderContext);
  const totalBalance = useTotalBalance();
  const onSubmit = () => {
    user.updateUser(name, fileSource, email);

  }
  const handlechange = (event) => {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
      setFileSource(event.target.files[0]);
    }
  }

  const getProfitLose = () => {
    if (totalBalance > 0) {
      if (5000 > totalBalance)
        return `-${((5000 - totalBalance) / 5000 * 100).toFixed(2)}%`
      else
        return `+${((totalBalance - 5000) / 5000 * 100).toFixed(2)}%`
    }
    return "cal..."
  }

  useEffect(() => {
    if (user.userInfo.islogin) {
      setName(user.userInfo.userName);
      setEmail(user.userInfo.email)
    }
  }, [user.userInfo])

  return (
    <div>
      {
        !user.userInfo.islogin ?
          <Navigate to="/" />
          :
          <div className="App"
            style={{ background: "rgba(0, 0, 0, 0.85)" }}>
            <div className="full-content">
              <Header />
              <div style={{ height: "20px" }}></div>
              {
                user.userInfo.islogin &&

                <div className="flex">
                  <div>
                    <img src={`${SERVER_URL}/useravatar/${user.userInfo.userAvatar}`} className="border-50 w-100 m-16" />
                    {/* <input 
                              type="file" 
                              id="file" 
                              placeholder="Profile Picture" 
                              name="myfiles" 
                              accept="image/png, image/jpeg" 
                              onChange={handlechange} /> */}

                    <div>{user.userInfo.userName}</div>
                    <div>{user.userInfo.email || "No Email"}</div>
                  </div>

                  {/* <div>userName: <input type="text" value={name} onChange={e=>setName(e.target.value)} /></div>
                          <div>Email: <input type="text" value={email} onChange={e=>setEmail(e.target.value)} /></div>

                          <button onClick={onSubmit} type="submit">Submit</button> */}
                </div>

              }

              {
                user.userInfo.islogin &&
                <div className="flex m-16">
                  <div className="border-left p-8 px-16">
                    <span className="font-grey font-12">Joined</span><br />
                    <span className="">{formateDate(user.userInfo.created)}</span>
                  </div>
                  <div className="border p-8 px-16">
                    <span className="font-grey font-12">Trades</span><br />
                    <span>{order.myOrders.length}</span>
                  </div>
                  <div className="border-right p-8 px-16">
                    <span className="font-grey font-12">Profit / Lose</span><br />
                    <span>{getProfitLose()}</span>
                  </div>
                </div>
              }

              {/* <div style={{height: "20px"}}></div>
                    {
                      user.userInfo.islogin &&
                      <div className="">
                        <div className="table_header">
                          <span className="p4" style={{width: "20%"}}></span>
                          <span className="p4" style={{width: "20%"}}>Total</span>
                          <span className="p4" style={{width: "20%"}}>Available</span>
                          <span className="p4" style={{width: "20%"}}>In Order</span>
                          <span className="p4" style={{width: "20%"}}>USD Value</span>
                        </div>
                      
                        {
                          user.userInfo.crypto.map((el, idx) => (
                            <div className="table_body" key={idx}>
                              <span className="p4" style={{width: "20%"}}>{el.symbol.split("USD")}</span>
                              <span className="p4" style={{width: "20%"}}>{(el.amount + el.holding).toFixed(8)}</span>
                              <span className="p4" style={{width: "20%"}}>{(el.amount).toFixed(8)}</span>
                              <span className="p4" style={{width: "20%"}}>{(el.holding).toFixed(8)}</span>
                              <span className="p4" style={{width: "20%"}}>{((el.amount + el.holding) * getTotalUSD(el.symbol)).toFixed(2)}</span>
                            </div>
                          ))
                        }
                        <div className="table_body" >
                          <span className="p4" style={{width: "20%"}}>USD</span>
                          <span className="p4" style={{width: "20%"}}>{(user.userInfo.usd + user.userInfo.usd_holding).toFixed(8)}</span>
                          <span className="p4" style={{width: "20%"}}>{(user.userInfo.usd).toFixed(8)}</span>
                          <span className="p4" style={{width: "20%"}}>{(user.userInfo.usd_holding).toFixed(8)}</span>
                          <span className="p4" style={{width: "20%"}}>{(user.userInfo.usd + user.userInfo.usd_holding).toFixed(8)}</span>
                        </div>
                         <RoundInfo />
                        
                        <button onClick={async() => {
                          let result = await user.reset();
                          console.log("sfsf", result);
                          if(result)
                            order.getMyOrders();
                          
                        }}>Reset</button>
                      </div>
                    } */}


              <div className="flex mt-48 px-48 items-normal">
                <div className="w-1-2" >
                  {
                    order.myOrders.map((el, idx) => {
                      if (el.status == "executed")
                        return (
                          <div className="w-2-3 m-auto" key={idx}>
                            <TradeComponent element={el} userAvatar={user.userInfo.userAvatar} userName={user.userInfo.userName} />
                          </div>
                        )
                    })
                  }
                </div>
                <div className="flex-grow">
                  <AnalysisComponent />
                  <HoldingComponent />
                </div>
              </div>
            </div>
          </div>
      }
    </div>


  );
}

export default Profile;
