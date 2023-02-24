import React, {useState, useContext, useEffect} from "react";
import { CustomCryptocurrencyMarket } from "react-tradingview-embed";
import Header from "../../components/header";
import CustomCryptoMarket from "../../components/customCryptoMarket";
import './index.css';



const Cryptocurrency = (props) => {
  return (
     <div className="App">
            <Header/>
        <div style={{margin: "32px"}}></div>
        <CustomCryptoMarket />
    

    </div>
  );
}

export default Cryptocurrency;
