import {useState, useContext, useEffect} from "react";
import { UserContext } from "../../provider/user";
import { OrderContext } from "../../provider/order";
import { useTotalBalance } from "../../hooks/useTotalBalance";
import './index.css';


const AnalysisComponent = (props) => {
    const user = useContext(UserContext);
    const order = useContext(OrderContext);
    const totalBalance = useTotalBalance();

    const getPercentage = (a, b) => {
        if(b == 0)
            return {percent: '1%', comment: ""};
        const percent = (a/b * 100);
        if(percent >= 5)
            return {percent: (a/b * 100).toFixed(2) + "%", comment: (a/b * 100).toFixed(2) + "%"}; 
        else
            return {percent: (a/b * 100).toFixed(2) + "%", comment: ""}; 

    }

    const getTokenPercentage = (amount, symbol) => {
        const tokenPrice = order.cryptoFromSymbol(symbol).price;
        const totalTokenPrice = amount * tokenPrice;
        return getPercentage(totalTokenPrice, totalBalance);
    }
    
    return (
        <div className="border m-8 border-radius">
        <div className="flex flex-between p-16">
          <span>Analysis ^</span>
        </div>

        <div className="flex flex-between px-16 font-12 font-grey">
          <span>In your weekly analysis, you can view profits and losses as % and value. All you have to do is hover onto it with the mouse.</span>
        </div>

        <div className="p-16 flex">
            {
                user.userInfo.islogin &&
                <div style={{width: getPercentage(user.userInfo.usd + user.userInfo.usd_holding, totalBalance).percent}} className="back-green-light m-2 h-48 border-radius-20 flex" >
                    {getPercentage(user.userInfo.usd + user.userInfo.usd_holding, totalBalance).comment}
                </div>
            }
          
            {
                user.userInfo.islogin &&
                <>
                    {
                        user.userInfo.crypto.map((el, idx) => (
                            <div key={idx} style={{width: getTokenPercentage(el.amount + el.holding, el.symbol).percent}} className="back-red m-2 h-48 border-radius-20 flex" >
                                { getTokenPercentage(el.amount + el.holding, el.symbol).comment}
                            </div>
                        ))
                    }
                </>
            }
         

        </div>
      </div>
    );
}

export default AnalysisComponent;
