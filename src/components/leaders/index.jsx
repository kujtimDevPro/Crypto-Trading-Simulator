import {useState, useContext, useEffect, useCallback, useMemo} from "react";
import OrderHistory from "../orderHistory";
import {LeaderboardContext} from "../../provider/leaderboard";
import { OrderContext } from "../../provider/order";
import { UserContext } from "../../provider/user";
import {SERVER_URL} from "../../constants/env";
import truncateWallet from "../../utils/truncateWallet";
import './index.css';


const Leaders = () => {
  const leaderboard = useContext(LeaderboardContext);
  const order = useContext(OrderContext);
  const user = useContext(UserContext);
  const [trades, setTrades] = useState([]);
  const [tab, setTab] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(()=>{
    leaderboard.getAllLeaderBoards();
  },[])

  const getOrders = async (userID) => {
    if(!userID)
      return;
    let result = await order.getOrdersByUserID(userID);
    let someone = await user.getUserInfo(userID);
    console.log(someone);
    setTrades(result)
    setUserInfo(someone);
  }
  const getLostRaise = (totalMoney) => {
    if(5000 > totalMoney)
      return `- ${(5000 - totalMoney).toFixed(2)} (- ${((5000 - totalMoney)/5000*100).toFixed(2)}%)`;
    if(5000 < totalMoney)
      return `+ ${(totalMoney - 5000).toFixed(2)} (+ ${((totalMoney - 5000)/5000*100).toFixed(2)}%)`;
    
    return `0.00 (0.00%)`;
  }

  const getExecuatedOrders = (values)=> {
    return values.filter(el => el.status == "executed")
  }

  return (
    <>
    {
      trades.length == 0 &&
      <div>
         <ul >
          <li style={{display: "inline"}} className = {`p4 ${(tab == 0 || tab ==2) ? "selected" : ""}`} onClick = {() => {
            if(tab == 0){
              let leaders = leaderboard.leaderBoards;
              leaders.sort(function(a, b){
                if(a.userName < b.userName) { return 1; }
                if(a.userName > b.userName) { return -1; }
                return 0;
              })
              leaderboard.setLeaderBoards(leaders);
              setTab(2)
            }
            else{
              let leaders = leaderboard.leaderBoards;
              leaders.sort(function(a, b){
                if(a.userName < b.userName) { return -1; }
                if(a.userName > b.userName) { return 1; }
                return 0;
              })
              leaderboard.setLeaderBoards(leaders);
              setTab(0)

            }
            }}>{(tab == 0 || tab == 2) ? "Name ↕" : "Name"}</li>
          <li style={{display: "inline"}} className = {`p4 ${(tab == 1 || tab ==3) ? "selected" : ""}`} onClick = {() => {
            if(tab == 1){
              let leaders = leaderboard.leaderBoards;
              leaders.sort(function(a, b){
                if(a.totalMoney < b.totalMoney) { return 1; }
                if(a.totalMoney > b.totalMoney) { return -1; }
                return 0;
              })
              leaderboard.setLeaderBoards(leaders);
              setTab(3)
            }
            else{
              
              let leaders = leaderboard.leaderBoards;
              leaders.sort(function(a, b){
                if(a.totalMoney < b.totalMoney) { return -1; }
                if(a.totalMoney > b.totalMoney) { return 1; }
                return 0;
              })
              leaderboard.setLeaderBoards(leaders);
              setTab(1)

            }
            }}>{(tab == 1 || tab == 3) ? "Raise/Lost ↕" : "Raise/Lost"}</li>
        </ul>
        <div className="leader-section">
       
          {
            leaderboard.leaderBoards.map((el, idx) => (
              <div className="leader-card" key={idx} onClick={()=>{
                getOrders(el.userID)
                }} >
                <div className="rank">{idx + 1}</div>
                <img  src={`${SERVER_URL}/useravatar/${el.userAvatar}`} style={{width: "36px", borderRadius : '70px'}}/>
                <div>{`${el.userName} (${truncateWallet(el.userWallet)})`}</div>

                <div>{`$${el.totalMoney.toFixed(4)}`}</div>
                <div>{getLostRaise(el.totalMoney)}</div>
                <div style={{marginTop: '4px'}}>trades</div>
                <div>{`$${el.totalTradesAmount}`}</div>
                <div>{el.totalTradesCount}</div>
              </div>
            ))
          }
        </div>
      </div>
      
    }
     
    {
      trades.length > 0 && 
      <>
        <div>
          <img  src={`${SERVER_URL}/useravatar/${userInfo.userAvatar}`} style={{width: "144px", borderRadius : '70px'}}/>
          <div>
              <p>{userInfo.userName}</p>
              <p>{userInfo.walletAddress}</p>

          </div>
        </div>
        <OrderHistory orders={getExecuatedOrders(trades)} />
      </>
    }

    </>
    
   
  );
}

export default Leaders;
