import {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../../provider/user";
import LoginButton from "../loginButton";
import DropDown from "../dropdown";
import './index.css';

const Header = () => {
	const user = useContext(UserContext);

  return (
	<div>
		<div className="logo p-12">
			<img src="/assets/img/Logo.png" className="ml-32"/>
			<div className="flex-grow  flex">
				<Link to="/" className="header-button">Home</Link>
				<Link to="/mytrade" className="header-button">My Trade</Link>
				<Link to="/profile" className="header-button">Profile</Link>
				<Link to="/leaderboard" className="header-button">LeaderBoard</Link>
				<Link to="/cryptocurrency" className="header-button">Cryptocurrencies</Link>
				<Link to="/globalfeed" className="header-button">Global Feed</Link>

			</div>
			<div className="mr-32">
				<LoginButton />
			</div>
		</div>
		

		{/* {
			user.userInfo.islogin &&
			<>ETH: <input type="text" value={user.userInfo.eth} readOnly={true}/></>
		}
		{
			user.userInfo.islogin &&
			<>USD: <input type="text" value={user.userInfo.usd} readOnly={true}/></>
		} */}

    </div>
  );
}

export default Header;
