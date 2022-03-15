import './App.css';
import {useState} from "react";
import { Route, Routes, useNavigate} from 'react-router-dom';
import NavbarMap1 from './Components/NavbarMap1';
import NavbarMap2 from './Components/NavbarMap2';
import NavbarStart from './Components/NavbarStart';
import NavbarBoard from './Components/NavbarBoard';
import Map1 from './Components/Map1';
import Map2 from './Components/Map2';
import Home from './Components/Home';
import Leaderboard from './Components/Leaderboard';
import { getApps } from 'firebase/app'; 
import{serverTimestamp, updateDoc, doc, getFirestore} from 'firebase/firestore';


function App() {
  const firebaseApp = getApps()[0]; 
  const [selection,setSelection] = useState(0);
  const [objectFound,setObjectFound] = useState(0);
  let redirect =useNavigate();

  function handleClick(e){
    setSelection(+e.target.attributes.value.value);
    updateDoc(doc(getFirestore(),"start", `startTime`), {
      timestamp: serverTimestamp()
    });
  }

  function setFoundObject(e){
    setObjectFound(objectFound +1 );
  }

  function returnHome(e){
    setSelection(0);
    setObjectFound(0);
  }

  function goToMap1(e){
    setSelection(1);
    redirect('/map1');
    updateDoc(doc(getFirestore(),"start", `startTime`), {
      timestamp: serverTimestamp()
    });
  }

  function goToMap2(e){
    setSelection(2);
    redirect('/map2');
    updateDoc(doc(getFirestore(),"start", `startTime`), {
      timestamp: serverTimestamp()
    });
  }

  function goToLeaderboard(e){
    setSelection(3);
    setObjectFound(0);
  }

  return (
    <div className="App">
      {selection === 0 && 
        <NavbarStart returnHome={(e) => returnHome(e)} goToLeaderboard={(e) => goToLeaderboard(e) }/>
      }
      {selection === 1 &&
        <NavbarMap1 returnHome={(e) => returnHome(e)} objectFound ={objectFound}/>
      }
      {selection === 2 &&
        <NavbarMap2 returnHome={(e) => returnHome(e)} objectFound ={objectFound}/>
      }
      {selection === 3 &&
        <NavbarBoard returnHome={(e) => returnHome(e)}/>
      } 
      <Routes>
        <Route path='/photo_tagging_app' element={<Home handleClick={(e)=>handleClick(e)}/>}/>  
        <Route path='/map2' element={
          <Map2 setFoundObject={setFoundObject} 
            objectFound ={objectFound} 
            returnHome={(e) => returnHome(e)}
            goToLeaderboard={(e) => goToLeaderboard(e) }
            selection={selection}
          />}
        />  
        <Route path='/map1' element={
          <Map1 setFoundObject={setFoundObject} 
            objectFound ={objectFound} 
            returnHome={(e) => returnHome(e)}
            goToLeaderboard={(e) => goToLeaderboard(e) }
            selection={selection}
          />
        }/>  
        <Route path='/leaderboard' element={<Leaderboard goToMap1={(e) => goToMap1(e)} goToMap2={(e) => goToMap2(e)}/>}/>  
      </Routes>
    </div>
  );
}

export default App;
