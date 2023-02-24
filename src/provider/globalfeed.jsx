import React, { useState, useEffect } from "react";
import axios from "axios";
import {SERVER_URL} from "../constants/env";


const GlobalfeedContextTemplate = {
	
	globalfeeds: [{}],
	getAllOrders: () => {}
};

const GlobalfeedContext = React.createContext(GlobalfeedContextTemplate);

const GlobalfeedProvider = ({children}) => {

	const [globalfeeds, setGlobalfeeds] = useState([]);

	const getAllOrders = async () => {
		axios.get(`${SERVER_URL}api/orders`).then(result=>{
			if(result.data.status){
				setGlobalfeeds(result.data.data);
			}
		})
	}

	


return(
	<GlobalfeedContext.Provider
		value={{
			globalfeeds,
			getAllOrders
		}}
	>
		{children}
	</GlobalfeedContext.Provider>
);

}


export {GlobalfeedContext};
export default GlobalfeedProvider;
