import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {SERVER_URL} from "../constants/env";
import setAuthToken from '../utils/setAuthToken';
import {UserContext} from "./user";
import socketIOClient from "socket.io-client";


const OrderContextTemplate = {
	myOrders:[{

	}],
	cryptoPrice: [],
	getCryptosPrice: async () => {},
	getMyOrders: async () => {},
	getOrdersByUserID: async () => {},
	makeOrder: async () => {},
	cancelOrder: async () => {},
	makeMarket: async () => {},
	cryptoFromSymbol: () => {}
};

const OrderContext = React.createContext(OrderContextTemplate);

const OrderProvider = ({children}) => {

	const [myOrders, setMyOrders] = useState([]);
	const [cryptoPrice, setCryptoPrice] = useState([]);
	const [mySocket, setMySocket] = useState(null);

	const user = useContext(UserContext);

	// mySocket.on("updateRound", async function(response){
	// 	console.log(response);
	// 	setRoundInfo(response);
	// })

	useEffect(()=>{
		if(user.userInfo.islogin && mySocket != null){
			mySocket.emit("addUser", localStorage.getItem("id"));
		}

	},[user.userInfo.islogin])

	useEffect(()=>{
		getCryptosPrice();
		
		const socket = socketIOClient(SERVER_URL);
		setMySocket(socket);
		socket.on("updatePrice", function(response){
			getCryptosPrice()
		})
		socket.on("order", (data)=>{
			console.log("event listner")
			user.getMyInfo();
			getMyOrders();
		})

	return () => {
		socket.disconnect();
	}
	},[])
	const getMyOrders = async () => {
		const userId = localStorage.getItem("id");
		axios.get(`${SERVER_URL}api/orders/userid/${userId}`).then(result=>{
			if(result.data.status && result.data.data){
				setMyOrders(result.data.data);
			}
		})
	}

	const getOrdersByUserID = async (userID) => {
		let result = await axios.get(`${SERVER_URL}api/orders/userid/${userID}`);

		if(result.data.status)
			return result.data.data;
		
		return [];
	}

	const makeOrder = async (payload) => {
		const userId = localStorage.getItem("id");
		setAuthToken(localStorage.getItem("jwt_token"));
		axios.post(SERVER_URL + "api/order/makeorder", {userId : userId, ...payload}).then((result) => {
			if(result.data.status){
				setMyOrders(result.data.orderHistory)
				user.setUserInfo(prev => ({
					...prev,
					crypto: result.data.data.crypto,
					usd: result.data.data.usd_balance,
					usd_holding: result.data.data.usd_holding,
				}))
			}	
			else{
				alert(result.data.message);
			}	
		})
	}

	const cancelOrder = async (orderId) => {

		setAuthToken(localStorage.getItem("jwt_token"));
		axios.post(SERVER_URL + "api/order/cancelorder", {id : orderId}).then((result) => {
			if(result.data.status){
				setMyOrders(result.data.orderHistory)
				user.setUserInfo(prev => ({
					...prev,
					crypto: result.data.data.crypto,
					usd: result.data.data.usd_balance,
					usd_holding: result.data.data.usd_holding,
				}))
			}
			else
				alert(result.data.message)	
		})
	}

	const makeMarket = async (payload) => {
		const userId = localStorage.getItem("id");
		setAuthToken(localStorage.getItem("jwt_token"));
		axios.post(SERVER_URL + "api/order/makemarket", {userId : userId, ...payload}).then((result) => {
			if(result.data.status){
				setMyOrders(result.data.orderHistory)
				user.setUserInfo(prev => ({
					...prev,
					crypto: result.data.data.crypto,
					usd: result.data.data.usd_balance,
					usd_holding: result.data.data.usd_holding,
				}))
			}
			else{
				alert(result.data.message);
			}	
		})
	}

	const getCryptosPrice = async () => {
		let result = await axios.get(`${SERVER_URL}api/cryptocurrencies`);
		if(result.data.status){
			setCryptoPrice(result.data.data);
		}
	}

	const cryptoFromSymbol = (symbol) => {
		if (cryptoPrice.length == 0)
		  return 1;
		const crypto = cryptoPrice.filter(el => el.symbol == symbol);
		return crypto[0];
	  }


return(
	<OrderContext.Provider
		value={{
			cryptoPrice,
			myOrders,
			getCryptosPrice,
			makeOrder,
			cancelOrder,
			makeMarket,
			getMyOrders,
			getOrdersByUserID,
			cryptoFromSymbol
		}}
	>
		{children}
	</OrderContext.Provider>
);

}


export {OrderContext};
export default OrderProvider;
