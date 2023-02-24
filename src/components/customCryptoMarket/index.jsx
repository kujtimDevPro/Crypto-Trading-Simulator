import {useState, useContext, useEffect, useCallback, useMemo} from "react";
import OrderHistory from "../orderHistory";
import {CryptoMarketContext} from "../../provider/cryptomarket";
import './index.css';


const CustomCryptoMarket = () => {
  const market = useContext(CryptoMarketContext);
  useEffect(()=>{
    market.scan();
  },[])

  const wrapPercent = (val) => {
    if(val > 0)
      return(
        <span style={{color: "lightgreen"}}>{`+${val.toFixed(4)}`}</span>
      )
    if(val < 0)
      return(
        <span style={{color: "red"}}>{`${val.toFixed(4)}`}</span>
      )

    return(
      <span>{val.toFixed(4)}</span>
    )
  }

  const wrapMarketCap = (val) => {
    const bil = val / 1000000000;
    if(bil > 1)
      return `${bil.toFixed(4)} B`;

    const mil = val / 1000000;
    if(mil > 1)
      return `${mil.toFixed(4)} M`;

    return val;
    
    
  }  
  return (
    <div className="order_history">

<div style={{margin: "20px"}}></div>

      <div className="table_header">
          <span className="p4" style={{width: "30%"}}>Coin</span>
          <span className="p4" style={{width: "10%"}}>Rank</span>
          <span className="p4" style={{width: "10%"}}>Price</span>
          <span className="p4" style={{width: "10%"}}>Change%1D</span>
          <span className="p4" style={{width: "10%"}}>Change%1W</span>
          <span className="p4" style={{width: "10%"}}>Market cap</span>
          <span className="p4" style={{width: "10%"}}>Volume in USD 24h</span>
          <span className="p4" style={{width: "10%"}}>Supply</span>

      </div>
      { market.cryptoMarket &&
        market.cryptoMarket.map((el, idx) => {
            return(
            <div className="table_body" key={idx}>
                <span className="p4" style={{width: "30%", display: "flex", justifyContent: "left", alignItems: "center"}}>
                  <img  src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${el.d[0]}.svg`} style={{width: "32px", margin: "0px 16px", borderRadius : '70px'}}/>
                  {el.d[1]}
                </span>
                <span className="p4" style={{width: "10%"}}>{el.d[7]}</span>
                <span className="p4" style={{width: "10%"}}>{el.d[8].toFixed(4)}</span>
                <span className="p4" style={{width: "10%"}}>{wrapPercent(el.d[14])}</span>
                <span className="p4" style={{width: "10%"}}>{wrapPercent(el.d[19])}</span>
                <span className="p4" style={{width: "10%"}}>{wrapMarketCap(el.d[15])}</span>
                <span className="p4" style={{width: "10%"}}>{wrapMarketCap(el.d[17])}</span>
                <span className="p4" style={{width: "10%"}}>{wrapMarketCap(el.d[18])}</span>
            </div>
            )
           
        })
      }
  </div>
    
   
  );
}

export default CustomCryptoMarket;
