import React, { useState, useEffect } from "react";
import axios from "axios";
import {SERVER_URL} from "../constants/env";


const LeaderboardContextTemplate = {
	
	leaderBoards: [{}],
	getAllLeaderBoards: () => {},
	setLeaderBoards: () => {}
};

const LeaderboardContext = React.createContext(LeaderboardContextTemplate);

const LeaderboardProvider = ({children}) => {

	const [leaderBoards, setLeaderBoards] = useState([]);

	const getAllLeaderBoards = async () => {
		axios.get(`${SERVER_URL}api/leaderboard/all`).then(result=>{
			if(result.data.status){
				setLeaderBoards(result.data.data);
			}
		})
	}

	


return(
	<LeaderboardContext.Provider
		value={{
			leaderBoards,
			getAllLeaderBoards,
			setLeaderBoards
		}}
	>
		{children}
	</LeaderboardContext.Provider>
);

}


export {LeaderboardContext};
export default LeaderboardProvider;
