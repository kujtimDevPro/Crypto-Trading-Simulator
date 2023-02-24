import React, {useState, useContext, useEffect} from "react";
import Header from "../../components/header";
import Leaders from "../../components/leaders";
import './index.css';


const LeaderBoard = (props) => {
 
  return (
     <div
        className="App"
        >
          <div className="full-content">
            <Header />
            <div style={{height: "20px"}}></div>
            <Leaders />
          </div>

    </div>
  );
}

export default LeaderBoard;
