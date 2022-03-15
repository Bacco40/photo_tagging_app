import React from 'react';
import {useEffect} from "react";
import { useStopwatch } from 'react-timer-hook';

function Timer({objectFound}) {
  const {
    seconds,
    minutes,
    pause
  } = useStopwatch({ autoStart: true });

  function checkQuantity(){
    if(objectFound === 3){
    const paused = document.querySelector('#pause');
    paused.click();
  }

  }
  
  useEffect(()=>{
    checkQuantity();
  },[objectFound])

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '25px'}}>
        Your Time:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button id="pause" onClick={pause}>Pause</button>
    </div>
  );
}

export default Timer;