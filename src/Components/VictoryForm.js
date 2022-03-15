import React, { useState, forwardRef, useImperativeHandle, useRef} from "react";
import { useNavigate} from 'react-router-dom';
import Snackbar from "./Snackbar";
import { Link } from "react-router-dom";
import {
    getFirestore,
    collection,
    addDoc,
  } from 'firebase/firestore';

const VictoryForm = forwardRef(({totalTime, goToLeaderboard,returnHome,selection}, ref) => {
  const [showForm,setShowForm] = useState(false);
  let redirect = useNavigate();
  const snackbarRef = useRef(null);
  const type = "mistake";
  const message = "please insert a name"

  async function saveTime(e){
    e.preventDefault();
    const name =document.querySelector('.username');
    if(name.value !== ""){
      try {
        await addDoc(collection(getFirestore(), `boardMap${selection}`), {
            name:name.value,
            time:totalTime
        });
      }
      catch(error) {
        console.error('Error writing the Project to Firebase Database', error);
      }
      redirect('/leaderboard')
      goToLeaderboard();  
    }else{
      snackbarRef.current.show();
    }
  }

  useImperativeHandle(ref, () => ({
      show(){
          setShowForm(true);
      },
  }))
  return (
    <form className="victoryForm" id={showForm ? "show2" : "hide"}>
        <h2 className="endTime">You finished the map in {totalTime}<hr/></h2>
        <div className="formContent">
            <div className="subtitle">Enter your name to save your time on the leaderboard:</div>
            <input className="username" type="text" autoComplete="off" placeholder="Username"></input>
            <div className="formBottom">
                <Link to='/photo_tagging_app' onClick={returnHome}>
                    <button className="victoryBtn">Play Again</button>
                </Link>
                <button className="victoryBtn" onClick={(e) => saveTime(e)}>Submit Time</button>
            </div>
            <Snackbar ref={snackbarRef} type={type} message={message}/>
        </div>
    </form>
  );
})

export default VictoryForm;