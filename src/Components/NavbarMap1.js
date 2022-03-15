import React from "react";
import {Link} from 'react-router-dom';
import Timer from './Timer';
import kenny from './images/kenny.png';
import spiderman from './images/spiderman.png';
import butthole from './images/Butthole.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import{faHouse} from '@fortawesome/free-solid-svg-icons';
library.add(faHouse);

function NavbarMap1({returnHome, objectFound}) {

  return (
    <nav className="nav">
        <Link className='link' to='/photo_tagging_app' onClick={returnHome}>
          <div className="pagTitle">Find Us</div> 
        </Link>
        <Timer objectFound ={objectFound}/>
        <ul className="links">            
          <div className='character'>
            <img className='charPic' id="Kenny" src={kenny} alt="character"></img>
          </div>
          <div className='character'>
            <img className='charPic' id="Spiderman" src={spiderman} alt="character"></img>
          </div>
          <div className='character'>
            <img className='charPic' id="Butthole" src={butthole} alt="character"></img>
          </div>
          <Link className='link' to='/photo_tagging_app' onClick={returnHome}>
              <li id="home"><FontAwesomeIcon icon="fa-solid fa-house" />&nbsp;  Home </li>
          </Link>
        </ul>
    </nav>
  );
}

export default NavbarMap1;