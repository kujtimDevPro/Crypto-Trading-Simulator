import {useState, useContext, useEffect} from "react";
import truncateWallet from "../../utils/truncateWallet";
import './index.css';


const TopWinner = (props) => {

  // useEffect(()=>{
  //   console.log(props.result)
  // },[props])
  return (
      <div className="p4" style={{width: "500px"}}>
        <p>{props.title || "Top result"}</p>
        <div className="table_header">
          <span className="p4" style={{width: "20%"}}>Rank</span>
          <span className="p4" style={{width: "40%"}}>User</span>
          <span className="p4" style={{width: "40%"}}>Lost/Gained Amount</span>
        </div>
        {
          props.result.length > 0 && 
          props.result.map((el, idx) => (
            <div className="table_body" key={idx}>
              <span className="p4" style={{width: "20%"}}>{idx + 1}</span>
              <span className="p4" style={{width: "40%"}}>{truncateWallet(el.user_wallet)}</span>
              <span className="p4" style={{width: "40%"}}>{parseFloat(el.lost_amount).toFixed(2)}</span>
            </div>
          ))
        }
        <div>

        </div>
          
      </div>
  );
}

export default TopWinner;
