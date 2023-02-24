import {useState, useContext, useEffect} from "react";
import { OrderContext } from "../../provider/order";
import './index.css';


const Ticker = (props) => {

    const [priceFeed, setPriceFeed] = useState({
        price: 0,
        ch: 0,
        chp: 0
    });
    const orderInfo = useContext(OrderContext);

    useEffect(()=>{
        if(orderInfo.cryptoPrice.length <= 0)
            return;
        orderInfo.cryptoPrice.map(el => {
            if(el.symbol == props.symbol)
            setPriceFeed({
                price: el.price,
                ch: el.ch,
                chp: el.chp
            })
        })
    },[orderInfo.cryptoPrice])
   
    const wrapPrice = (val) => {
        if(val > 0)
            return `+ ${val}`
        if(val < 0)
            return `- ${val * -1}`
        return val
    }
    return (
        <div className="ticket-element">
            <p>{props.symbol}</p>
            <p>{priceFeed.price || 0.00}</p>
            <p>{`${wrapPrice(priceFeed.ch) || 0.00}`}</p>
            <p>{`${wrapPrice(priceFeed.chp) || 0.00}%`}</p>
        </div>
    );
}

export default Ticker;
