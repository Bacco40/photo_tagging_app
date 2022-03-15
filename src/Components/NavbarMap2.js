import React from "react";
import {Link} from 'react-router-dom';
import joey from './images/joey.webp';
import obelix from './images/obelix.jpg';
import chad from './images/chad.webp';
import Timer from "./Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import{faHouse} from '@fortawesome/free-solid-svg-icons';
library.add(faHouse);

function NavbarMap2({returnHome, objectFound}) {
  return (
    <nav className="nav">
        <Link className='link' to='/photo_tagging_app' onClick={returnHome}>
          <div className="pagTitle">Find Us</div> 
        </Link>
        <Timer  objectFound ={objectFound}/>
        <ul className="links">            
          <div className='character'>
            <img className='charPic' id="Joey" src={joey} alt="character"></img>
          </div>
          <div className='character'>
            <img className='charPic' id="Obelix" src={obelix} alt="character"></img>
          </div>
          <div className='character'>
            <img className='charPic' id="Chad" src={chad} alt="character"></img>
          </div>
          <Link className='link' to='/photo_tagging_app' onClick={returnHome}>
              <li id="home"><FontAwesomeIcon icon="fa-solid fa-house" />&nbsp;  Home </li>
          </Link>
        </ul>
    </nav>
  );
}

export default NavbarMap2;