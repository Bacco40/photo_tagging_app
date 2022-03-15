import React,{useEffect} from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import{faHouse} from '@fortawesome/free-solid-svg-icons';
library.add(faHouse);

function NavbarBoard({returnHome}) {

  function startAtTop(){
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  useEffect(()=>{
    startAtTop();
  },[])

  return (
    <nav className="homeNav">
        <Link className='link' to='/photo_tagging_app' onClick={returnHome}>
            <div className="pagTitle">Find Us</div> 
        </Link>        
        <h2 className="selectM">Best Times:</h2>        
        <ul>           
            <Link className='link' to='/photo_tagging_app' onClick={returnHome}>
                <li id="home"><FontAwesomeIcon icon="fa-solid fa-house" />&nbsp;  Home </li>
            </Link>
        </ul>
    </nav>
  );
}

export default NavbarBoard;