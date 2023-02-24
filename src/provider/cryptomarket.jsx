import React, { useState, useEffect } from "react";
import axios from "axios";
import {PAIRS} from "../constants/env";

let scanOptions = {
	"options":{"lang":"en"},
    "markets":["crypto"],
    "symbols":{
        "query":{
            "types":[]
            },
        "tickers":[]
        },
    "ignore_unknown_fields": false,
    "columns":[
        "base_currency", "base_currency_desc", "base_currency_logoid", "update_mode", "type", "typespecs", "exchange", "crypto_total_rank", "close",  "currency", "pricescale", "minmov", "fractional", "minmove2", "change", "market_cap_calc", "fundamental_currency_code", "24h_vol_cmc", "circulating_supply", "change|1W"
        ],
    "sort":{
        "sortBy":"crypto_total_rank",
        "sortOrder":"asc"
        },
    "range":[0,100]
}

PAIRS.map(el => {
	scanOptions.symbols.tickers.push(`CRYPTO:${el}`)
})

const CryptoMarketContextTemplate = {
	
	cryptoMarket: [{}],
	scan: () => {}
};

const CryptoMarketContext = React.createContext(CryptoMarketContextTemplate);

const CryptoMarketProvider = ({children}) => {

	const [cryptoMarket, setCryptoMarket] = useState([]);

	const scan = async () => {
		axios.post(`https://scanner.tradingview.com/coin/scan`, JSON.stringify(scanOptions)).then(result=>{
			if(result.data.totalCount > 0){
				setCryptoMarket(result.data.data);
			}
		})
	}

	


return(
	<CryptoMarketContext.Provider
		value={{
			cryptoMarket,
			scan
		}}
	>
		{children}
	</CryptoMarketContext.Provider>
);

}


export {CryptoMarketContext};
export default CryptoMarketProvider;
