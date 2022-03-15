import React,{useEffect} from "react";
import {Link} from 'react-router-dom';

function NavbarStart({returnHome, goToLeaderboard}) {

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
        <h2 className="selectM">Select Map</h2>             
        <ul>           
            <Link className='link' to='/leaderboard' onClick={goToLeaderboard}>
                <li id="leaderboard"> Leaderboard </li>
            </Link>
        </ul>
    </nav>
  );
}

export default NavbarStart;