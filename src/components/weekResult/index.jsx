import {useState, useContext, useEffect} from "react";
import truncateWallet from "../../utils/truncateWallet";
import './index.css';


const WeekResult = (props) => {

  // useEffect(()=>{
  //   console.log(props.result)
  // },[props])
  return (
      <div className="p4">
        <p>{props.title || "week result"}</p>
        <div className="table_header">
          <span className="p4" style={{width: "10%"}}>Rank</span>
          <span className="p4" style={{width: "15%"}}>User</span>
          <span className="p4" style={{width: "25%"}}>Start Amount</span>
          <span className="p4" style={{width: "25%"}}>End Amount</span>
          <span className="p4" style={{width: "25%"}}>Lost/Gained Amount</span>
        </div>
        {
          props.result.length > 0 && 
          props.result.map((el, idx) => (
            <div className="table_body" key={idx}>
              <span className="p4" style={{width: "10%"}}>{idx + 1}</span>
              <span className="p4" style={{width: "15%"}}>{truncateWallet(el.userName)}</span>
              <span className="p4" style={{width: "25%"}}>{parseFloat(el.oldAmount).toFixed(2)}</span>
              <span className="p4" style={{width: "25%"}}>{parseFloat(el.currentAmount).toFixed(2)}</span>
              <span className="p4" style={{width: "25%"}}>{`${(parseFloat(el.oldAmount) - parseFloat(el.currentAmount)).toFixed(2)} (${((parseFloat(el.oldAmount) - parseFloat(el.currentAmount) )/ parseFloat(el.oldAmount) * 100).toFixed(2)} %)`}</span>
            </div>
          ))
        }
        <div>

        </div>
          
      </div>
  );
}

export default WeekResult;
