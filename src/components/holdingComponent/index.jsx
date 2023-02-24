import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../provider/user";
import { OrderContext } from "../../provider/order";
import { useTotalBalance } from "../../hooks/useTotalBalance";
import './index.css';


const HoldingComponent = (props) => {
    const user = useContext(UserContext);
    const order = useContext(OrderContext);
    const totalBalance = useTotalBalance();

    return (
        <div className="border m-8 border-radius mt-16">
            <div className="flex flex-between p-16">
                <span>Holdings ^</span>
                <span className="font-12 back-green p-4 border-radius-20 font-green px-8">Trade</span>
            </div>

            <div className="p-16">

                <div className="flex flex-between p-4">
                    <div className="flex">
                        <img src="/assets/img/Coin.png" style={{ width: "32px", margin: "0px 4px", borderRadius: '70px' }} />
                        <span>USD</span>
                    </div>
                    <div className="flex-grow ml-16 text-left">
                        <span>{`${(user.userInfo.usd).toFixed(8)} available`}</span><br />
                        <span>{`${(user.userInfo.usd_holding).toFixed(8)} in order`}</span>
                    </div>
                    <span> {`$${(user.userInfo.usd + user.userInfo.usd_holding).toFixed(2)}`}</span>
                </div>
                {
                    user.userInfo.crypto.map((el, idx) => (
                        <div className="flex flex-between p-4" key={idx}>
                            <div className="flex">
                                <img src={`https://s3-symbol-logo.tradingview.com/crypto/XTVC${el.symbol.split("USD")[0]}.svg`} style={{ width: "32px", margin: "0px 4px", borderRadius: '70px' }} />
                                <span>{el.symbol.split("USD")[0]}</span>
                            </div>
                            <div className="flex-grow ml-16 text-left">
                                <span>{`${(el.amount).toFixed(8)} available`}</span><br />
                                <span>{`${(el.holding).toFixed(8)} in order`}</span>
                            </div>
                            <span> {`$${((el.amount + el.holding) * order.cryptoFromSymbol(el.symbol).price).toFixed(2)}`}</span>
                        </div>
                    ))
                }

                <div className="flex flex-between back-grey mt-16 p-4 px-8 border-radius-20">
                    <div>
                        <span className="font-green">{`$${totalBalance}`}</span>
                        <span className="font-grey">-total holdings</span>

                    </div>
                    <span>{`${user.userInfo.crypto.length} token`}</span>

                </div>
            </div>
        </div>
    );
}

export default HoldingComponent;
