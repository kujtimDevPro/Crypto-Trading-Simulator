import {useState, useContext, useEffect} from "react";
import './index.css';


const DropDown = (props) => {
    const [show, setShow] = useState(false);
    return (
        <div className="dropdown">
            <button className="dropbtn flex" onClick={()=>setShow(!show)}>
                <img src={props.avatar} className="w-24 pr-8"/>
                {props.title}  
                <span className="pl-4 arrow">{show?' △':' ▽'}</span>  
            </button>
            {
                show && 
                <div className="dropdown-content">
                    {
                        props.children
                    }
                </div>
            }
           
        </div>
    );
}

export default DropDown;
