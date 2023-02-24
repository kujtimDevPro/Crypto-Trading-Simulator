import React, { useState, useContext, useEffect } from "react";
import { AdvancedChart, TickerTape } from "react-tradingview-embed";
import Header from "../../components/header";
import Ticker from "../../components/ticker";
import OrderMarket from "../../components/orderMarket";
import RoundInfo from "../../components/roundInfo";
import MyOrderHistory from "../../components/myOrderHistory";
import './index.css';

const tradingPairs = [
  "BTCUSD",
  "ETHUSD",
  "BNBUSD",
  "XRPUSD",
  "DOGEUSD",
  "ADAUSD",
  "MATICUSD",
  "DOTUSD",
  "LTCUSD",
  "SOLUSD",
  "TRXUSD",
  "SHIBUSD",
  "UNIUSD",
  "AVAXUSD",
  "LINKUSD",
  "ATOMUSD",
  "XMRUSD",
  "XLMUSD",
  "ALGOUSD",
  "APEUSD",
  "XTZUSD",
  "AAVEUSD",
  "MANAUSD",
  "SANDUSD",
  "AXSUSD",
  "CAKEUSD",
]

const Home = (props) => {
  const [chartMode, setChartMode] = useState(0);
  return (
    <div className="App">
      <Header />
      <div className="ticker-section">
        {
          tradingPairs.map((el, idx) => (
            <a key={idx} onClick={() => { setChartMode(idx) }}>
              <Ticker symbol={el} />
            </a>
          ))
        }

      </div>
      <div className="order_section" >
        <div className="tradingview_chart">
          <AdvancedChart widgetProps={{
            interval: "1D",
            colorTheme: "dark",
            symbol: tradingPairs[chartMode],
          }} />
        </div>
        <div>
          <RoundInfo />
          <OrderMarket symbol={tradingPairs[chartMode]} />

        </div>
      </div>
      <MyOrderHistory />

    </div>
  );
}

export default Home;
