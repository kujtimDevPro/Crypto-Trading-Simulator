import React, {useState, useContext, useEffect} from "react";
import MyOrderHistory from "../../components/myOrderHistory";
import Header from "../../components/header";
import './index.css';


const MyTrade = (props) => {
  const [chartMode, setChartMode] = useState(0);
  return (
     <div className="App">
            <Header/>
        <div style={{margin: "32px"}}></div>
        <MyOrderHistory />
    

    </div>
  );
}

export default MyTrade;
