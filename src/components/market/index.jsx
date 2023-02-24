import {useState, useContext, useEffect, useCallback, useMemo} from "react";
import {UserContext} from "../../provider/user";
import {OrderContext} from "../../provider/order";
import LoginButton from "../loginButton";


import './index.css';


const Market = ({symbol}) => {

    const user = useContext(UserContext);
    const order = useContext(OrderContext);
    const [usd, setUSD] = useState(0);
    const [crypto, setCrypto] = useState(0);
    const [cryptoPrice, setCryptoPrice] = useState(1);
    

    useEffect(()=>{
        if(order.cryptoPrice.length && symbol){
            const cryptocurrency = order.cryptoPrice.filter(el => el.symbol == symbol);
            setCryptoPrice(cryptocurrency[0].price);
            console.log("crypto", cryptocurrency[0].price)
            setUSD(crypto * cryptocurrency[0].price);
        }
    }, [order.cryptoPrice, symbol])


    const sellFunction = () => {
        const sellCrypto = user.userInfo.crypto.filter(el => el.symbol == symbol);
        if(sellCrypto[0].amount < crypto){
            alert("You dont have enough ETH!");
            return;
        }
        order.makeMarket({
            orderType: "sell",
            amount: crypto,
            price: cryptoPrice,
            symbol
        })
    }

   

    const buyFunction = () => {
        if(user.userInfo.usd < usd){
           alert("You dont have enough USD!");
           return;
        }

        order.makeMarket({
            orderType: "buy",
            amount: crypto,
            price: cryptoPrice,
            symbol
        })
    }
    return (
        <div className="buy-sell">
            <div className="flex-between">
                <span>Amount(Crypto): </span><input type="number"  value={crypto} onChange={e => {
                    setCrypto(e.target.value);
                    setUSD(e.target.value * cryptoPrice);
                    }} />
            </div>
            <div className="flex-between">
                <span>Amount(USD): </span><input type="number" value={usd} onChange={e => {
                    setUSD(e.target.value);
                    setCrypto(e.target.value / cryptoPrice);

                    }} />
            </div>
          {
            user.userInfo.islogin ? 
            <div className="flex-between">
                <button onClick={buyFunction}>Buy</button>
                <button onClick={sellFunction}>Sell</button>
            </div>
            :
            <LoginButton />
          }
            
        </div>
    );
}

export default Market;
