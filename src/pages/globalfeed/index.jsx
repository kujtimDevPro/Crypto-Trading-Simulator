import React, {useState, useContext, useEffect} from "react";
import Header from "../../components/header";
import RecentOrder from "../../components/recentOrder";
import './index.css';


const Globalfeed = (props) => {
 
  return (
     <div
        className="App"
        >
          <div className="full-content">
            <Header />
            <div style={{height: "20px"}}></div>
            <RecentOrder />
          </div>

    </div>
  );
}

export default Globalfeed;
