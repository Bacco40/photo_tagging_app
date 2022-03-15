import {useState, useRef, useEffect} from "react";
import joey from './images/joey.webp';
import obelix from './images/obelix.jpg';
import chad from './images/chad.webp';
import img2 from './images/img2.jpg';
import Snackbar from "./Snackbar";
import VictoryForm from './VictoryForm';
import {
    getFirestore,
    collection,
    getDoc,
    query,
    getDocs,
    updateDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';

function Map2({setFoundObject, objectFound, goToLeaderboard, returnHome, selection}){
  const image = useRef();
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [type, setType] = useState("")
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(0);
  const [totalTime ,setTotalTime] = useState("")
  let form= document.querySelector('.select');
  let cursor= document.querySelector('.cursors');
  const snackbarRef = useRef(null);
  const victoryRef = useRef(null);

  function startAtTop(){
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  function handleClick(e){
    if(objectFound !== 3){
      form= document.querySelector('.select');
      cursor= document.querySelector('.cursors');
      const offset = image.current.getBoundingClientRect();
      setX(Math.floor((e.nativeEvent.offsetX / offset.width)* 10000)/100);
      setY(Math.floor((e.nativeEvent.offsetY / offset.height) * 10000)/100);
      const y2 = e.pageY;
      const x2 = e.pageX;
      form.style.cssText = `display:flex;position:absolute;top:${y2}px;left: ${x2+22}px;`;
      cursor.style.cssText = `display:flex;position:absolute;top:${e.pageY-18}px;left: ${e.pageX-18}px;`;
    }
  }

  async function endGame(){
    await updateDoc(doc(getFirestore(),"end", `endTime`), {
        timestamp: serverTimestamp()
      });
      let startDetail = await getDoc(doc(getFirestore(),"start", `startTime`));
      startDetail = startDetail.data();
      let endDetail= await getDoc(doc(getFirestore(),"end", `endTime`));
      endDetail = endDetail.data();
      const time = endDetail.timestamp.seconds - startDetail.timestamp.seconds;
      const mind = time % (60 * 60);
      const minutes = Math.floor(mind / 60);
      const secd = mind % 60;
      let seconds = Math.ceil(secd);
      if(seconds<10){
        seconds= "0" +seconds;
      }
      setTotalTime(`${minutes}.${seconds}`);
      setShowForm(1);
  }

  async function handleFoundCharacter(e){
    const objPic = document.querySelector(`#${e.target.attributes.value.value}`);
    objPic.style.cssText = 'opacity:40%;';
    if(objectFound === 2){
      endGame();
    }else{
      setType("success");
      setMessage(`You found ${e.target.attributes.value.value}!`);
      snackbarRef.current.show();
    }
  }

  async function getDetails(e){
    e.preventDefault();
    const items = query(collection(getFirestore(), 'img2'));
    const querySnapshot = await getDocs(items);
    querySnapshot.forEach((doc) => {
      const itemDetail=doc.data();
      if(e.target.value === doc.id || e.target.attributes.value.value === doc.id){
        if(x<itemDetail.xMax && x>itemDetail.xMin && y<itemDetail.yMax && y>itemDetail.yMin){
          setFoundObject(e);
          handleFoundCharacter(e);
        }else{
          setType("mistake");
          setMessage('look better!');
          snackbarRef.current.show();
        }
      }
    })
    form.style.cssText = `display:none`;
    cursor.style.cssText = `display:none`;
  }

  function victory(){
    if(showForm === 1){
      victoryRef.current.show();
      const pic = document.querySelector('.picture');
      pic.style.cssText = `opacity:50%;`;
    }
  }
  
  useEffect(()=>{
    startAtTop();
  },[])

  useEffect(()=>{
    victory();
  },[showForm])
  
  return (
      <div className="Game">
        <img className="picture" src={img2} alt="find the character here" ref={image} onClick={(e)=> handleClick(e)} />
        <div className='cursors'></div>
        <form className='select'>
        <button className="buttonContent" value="Joey" onClick={(e)=>getDetails(e)} >
            <img className='charPic' value="Joey" src={joey} alt="character"/>
            <div className="formBtn" value="Joey">Joey Mousepad</div>
          </button>
          <button className="buttonContent" value="Obelix" onClick={(e)=>getDetails(e)}>
            <img className='charPic' value="Obelix" src={obelix} alt="character"></img>
            <div className="formBtn" value="Obelix">Obelix</div>
          </button>
          <button className="buttonContent" value="Chad" onClick={(e)=>getDetails(e)}>
            <img className='charPic' value="Chad" src={chad} alt="character"></img>
            <div className="formBtn" value="Chad">Squidward Gigachad</div>
          </button>
        </form>
        <VictoryForm 
          ref={victoryRef} 
          totalTime={totalTime} 
          returnHome ={returnHome} 
          goToLeaderboard = {goToLeaderboard}
          selection={selection}
        />
        <Snackbar ref={snackbarRef} type={type} message={message}/>
      </div>
  );
}

export default Map2;