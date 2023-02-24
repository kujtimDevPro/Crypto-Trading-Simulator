import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import WebModal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {SERVER_URL} from "../constants/env";
import setAuthToken from '../utils/setAuthToken';

const UserContextTemplate = {
	userInfo: {
		walletAddress: null, 
	    walletConnected: false, 
	    userName : "none",
		email:"none",
	    userAvatar : "",
		usd: 0,
		crypto: [],
		usd_holding: 0,
		islogin: false,
		created: "none"
	},
	walletConnect: () => {},
	logout: () => {},
	authWithDiscord: () => {},
	loginWithDiscord: () => {},
	authWithTwitter: () => {},
	loginWithTwitter: () => {},
	reset: () => {},
	updateUser: () => {},
	getMyInfo: () => {},
	setUserInfo: () => {},
	getUserInfo: async() => {}
};

const UserContext = React.createContext(UserContextTemplate);

const providerOptions = {

  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_ID"
    }
  },

  coinbaseWallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "web3modal",
      infuraId: "INFURA_ID",
      rpc:"",
      chainId:1,
      darkMode: true
    }
  },

  binancechainwallet: {
    package: true,
  }
}


const web3Modal = new WebModal({
  network: "mainnet",
  cacheProvider: false,
  providerOptions
})


const UserProvider = ({children}) => {

	const [userInfo, setUserInfo] = useState({
	    walletAddress: null, 
	    walletConnected: false, 
	    userName : "none", 
		email: "none",
	    userAvatar : "",
		crypto: [],
		usd_holding:0,
		usd: 0,
		islogin: false,
		created: "nonoe"
	});

	useEffect(()=>{
		const jwt = localStorage.getItem("jwt_token");
		const userID = localStorage.getItem("id");
		if(jwt && userID)
			getMyInfo();
	},[])
	const authWithDiscord = async () => {
		let result = await axios.post(`${SERVER_URL}api/users/authwithdiscord/`, {walletAddress: userInfo.walletAddress});
		if(result.data.status)
			window.location.href = result.data.data;
	}
	
	const loginWithDiscord = async (code, walletAddress) => {
		let result = await axios.post(`${SERVER_URL}api/users/loginwithdiscord/`, {code, walletAddress});
		if(result.data.status){
			setUserInfo({
				walletAddress: result.data.data.wallet,
				walletConnected: true,
				islogin: true,
				usd: result.data.data.usd_balance,
				crypto: result.data.data.crypto,
				usd_holding: result.data.data.usd_holding,
				userName: result.data.data.userName,
				userAvatar: result.data.data.userAvatar,
				email: result.data.data.email,
				created: result.data.data.created
			})
			localStorage.setItem("jwt_token", result.data.data.jwt_token);
			localStorage.setItem("id", result.data.data._id);
			if(result.data.notifications)
				result.data.notifications.map(el => {
					alert(el.message);
					axios.get(`${SERVER_URL}api/notification/checked/${el._id}`)
				});

			return {status: true, message: 'successfully login'};
		}
	
		return result.data
			
	}

	const authWithTwitter = async () => {
		let result = await axios.post(`${SERVER_URL}api/users/authwithtwitter/`, {walletAddress: userInfo.walletAddress});
		if(result.data.status){
			localStorage.setItem("codeVerifier", result.data.data.codeVerifier);
			window.location.href = result.data.data.url;

		}
	}

	const loginWithTwitter = async (code, walletAddress, codeVerifier) => {
		let result = await axios.post(`${SERVER_URL}api/users/loginwithtwitter/`, {code, walletAddress, codeVerifier});
		if(result.data.status){
			setUserInfo({
				walletAddress: result.data.data.wallet,
				walletConnected: true,
				islogin: true,
				crypto: result.data.data.crypto,
				usd: result.data.data.usd_balance,
				usd_holding: result.data.data.usd_holding,
				userName: result.data.data.userName,
				userAvatar: result.data.data.userAvatar,
				email: result.data.data.email,
				created: result.data.data.created

			})
			localStorage.setItem("jwt_token", result.data.data.jwt_token);
			localStorage.setItem("id", result.data.data._id);

			if(result.data.notifications)
				result.data.notifications.map(el => {
					alert(el.message)
					axios.get(`${SERVER_URL}api/notification/checked/${el._id}`)
				});

			return {status: true, message: 'successfully login'};
		}

		return result.data
			
	}

	const connectWallet = async () => {
		if(window.ethereum) {
			try{
				const provider = await web3Modal.connect();
				const web3 = new Web3(provider);
				await window.ethereum.send("eth_requestAccounts");
				const accounts = await web3.eth.getAccounts();
				
				setUserInfo(currValue => ({
				...currValue,
				walletAddress: accounts[0],
				walletConnected: true
				}));

				let result = await axios.post(`${SERVER_URL}api/users/loginwithwallet/`, {walletAddress: accounts[0]});
				
				if(result.data.status){
					if(result.data.data.signed){
						setUserInfo(prev => ({
							...prev,
							islogin: true,
							crypto: result.data.data.crypto,
							usd: result.data.data.usd_balance,
							usd_holding: result.data.data.usd_holding,
							userName: result.data.data.userName,
							userAvatar: result.data.data.userAvatar,
							email: result.data.data.email,
							created: result.data.data.created

						}))
						localStorage.setItem("jwt_token", result.data.data.jwt_token);
						localStorage.setItem("id", result.data.data._id);

						if(result.data.notifications)
							result.data.notifications.map(el => {
								alert(el.message)
								axios.get(`${SERVER_URL}api/notification/checked/${el._id}`)
							});
						return false;
					}
					return true;
				}
				return false;

			}catch(error){
				alert(error);
				return false;
			}
		
		
		}
		else{
			alert("Plesae install MetaMask");
		}
	}

	const logout = async () => {
		web3Modal.clearCachedProvider();
		localStorage.removeItem("id");
		localStorage.removeItem("jwt_token");
		setUserInfo({
			walletAddress: null, 
			walletConnected: false, 
			userName : "none", 
			userAvatar : "",
			islogin: false,
			walletConnected: false
		});
	}

	const reset = async () => {
		setAuthToken(localStorage.getItem("jwt_token"));
		const userId = localStorage.getItem("id");
		let status = await axios.patch(`${SERVER_URL}api/users/reset/`, {userId: userId}).then((result) => {
			if(result.data.status){
				setUserInfo(currValue => ({
					...currValue,
					islogin: true,
					crypto: result.data.data.crypto,
					usd: result.data.data.usd_balance,
					usd_holding: result.data.data.usd_holding,
					userName: result.data.data.userName,
					userAvatar: result.data.data.userAvatar,
				}))
			}
			else{
				alert(result.data.message);
			}	

			return result.data.status;
		})

		return status;
	}

	const updateUser = async (name, file, email) => {
		setAuthToken(localStorage.getItem("jwt_token"));
		const userId = localStorage.getItem("id");

		const formData = new FormData();
		formData.append("file", file);
		formData.append("id", userId);
		formData.append("userName", name);
		formData.append("email", email);


		let status = await axios.patch(`${SERVER_URL}api/users/`, formData).then((result) => {
			if(result.data.status)
			setUserInfo(currValue => ({
				...currValue,
				userName: result.data.data.userName,
				userAvatar: result.data.data.userAvatar,
				email: result.data.data.email
			}))

			return result.data.status;
		})

		return status;
	}

	const getMyInfo = async () => {

		const userId = localStorage.getItem("id");

		if(!userId)
			return false;

		let result = await axios.get(`${SERVER_URL}api/users/userid/${userId}`).then((result) => {
			if(result.data.status){
				setUserInfo(currValue => ({
					...currValue,
					islogin: true,
					crypto: result.data.data.crypto,
					usd: result.data.data.usd_balance,
					usd_holding: result.data.data.usd_holding,
					userName: result.data.data.userName,
					userAvatar: result.data.data.userAvatar,
					email: result.data.data.email,
					created: result.data.data.created

				}))
				if(result.data.notifications)
					result.data.notifications.map(el => {
						alert(el.message)
						axios.get(`${SERVER_URL}api/notification/checked/${el._id}`)
					});
			}
			return result.data.status
		})

		return result;
	}

	const getUserInfo = async (userID) => {
		if(!userID)
			return false;

		let result = await axios.get(`${SERVER_URL}api/users/userid/${userID}`);
		if(result.status)
			return result.data.data;
		return null;
	}

	// const getMyInfoWithWallet = async (walletAddress) => {

	// 	let result = await axios.get(`${SERVER_URL}api/users/walletaddress/${walletAddress}`);
	//   	return result.data.status;
	// }

return(
	<UserContext.Provider
		value={{
			userInfo,
			connectWallet,
			authWithDiscord,
			loginWithDiscord,
			authWithTwitter,
			loginWithTwitter,
			logout,
			reset,
			updateUser,
			setUserInfo,
			getMyInfo,
			getUserInfo
		}}
	>
		{children}
	</UserContext.Provider>
);

}


export {UserContext};
export default UserProvider;
