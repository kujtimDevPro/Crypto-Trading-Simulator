import {useCallback, useContext } from "react";
import {UserContext} from "../provider/user";
import {OrderContext} from "../provider/order";

export function useTotalBalance() {

    const user = useContext(UserContext);
    const order = useContext(OrderContext);

    const getTotalUSD = useCallback(()=>{
        if(!user.userInfo.islogin || order.cryptoPrice.length == 0)
          return 0;
        let total = user.userInfo.usd + user.userInfo.usd_holding;
        user.userInfo.crypto.map(el => {
          let crypto = order.cryptoPrice.filter(coin => coin.symbol == el.symbol);
          total += el.amount * crypto[0].price + el.holding * crypto[0].price;
        });
        return total.toFixed(4);
      }, [user, order])

    return getTotalUSD();

}