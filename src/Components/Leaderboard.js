import React, {useEffect, useState} from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  
} from 'firebase/firestore';

function Leaderboard ({goToMap1, goToMap2}){
  let boardNumber=1;
  const [map1Board,setMap1Board] = useState([])
  const [map2Board,setMap2Board] = useState([])
  const[loading,setLoading] = useState(0);

  async function orderData(mapToOrder){
    let orderedMap=[];
    let i=0;
    mapToOrder.forEach((doc) => {
        const timeDetail=doc.data();
        orderedMap[i]=timeDetail;
        for(let index=0;index<orderedMap.length;index+=1){
          const temp = orderedMap[index];
          if(+temp.time> +orderedMap[i].time){
            orderedMap[index]=orderedMap[i];
            orderedMap[i]=temp;
          }
        }
        i+=1;
    });
    if(boardNumber === 1){
      setMap1Board(orderedMap);
      boardNumber+=1;
    }else{ 
      setMap2Board(orderedMap);
    }
  }
  
  async function getData(){
    let boardMap1=null;
    let boardMap2=null;
    const map1 = query(collection(getFirestore(), 'boardMap1'));
    const map2 = query(collection(getFirestore(), 'boardMap2'));
    boardMap1 = await getDocs(map1);
    boardMap2 = await getDocs(map2);
    orderData(boardMap1);
    orderData(boardMap2);
  }
  
  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    setLoading(1);
  },[map2Board])

  return (
    <div className="leaderboard">
      
      {loading === 1 &&
        <div className="boardTable">
          <div className="topBoard">
            <h2>Top 10 player Cyberpunk City</h2>
            <button className="playAgain" onClick={goToMap1} >Play </button>
          </div>
          <div className="boardRow">
            <div className="boardContent">&nbsp;&nbsp;&nbsp; User: </div>
            <div className="boardContent">Time: &nbsp;&nbsp;&nbsp;</div>
          </div><hr/>
          {map1Board.map((user,index) => (
            <div>
            {index <10 && 
              <div key={index} className="boardRow">
                <div className="boardContent">{index +1}.&nbsp;&nbsp;&nbsp; {user.name}</div>
                <div className="boardContent">{user.time} &nbsp;&nbsp;&nbsp;</div>
              </div>
            }
            {index <10 && 
              <hr/>
            }
          </div>
          ))}
        </div>
      }
      
      {loading === 1 &&
        <div className="boardTable">
          <div className="topBoard">
            <h2>Top 10 player Robot City</h2>
            <button className="playAgain" onClick={goToMap2} > Play </button>
          </div>
          <div className="boardRow">
            <div className="boardContent">&nbsp;&nbsp;&nbsp; User: </div>
            <div className="boardContent">Time: &nbsp;&nbsp;&nbsp;</div>
          </div><hr/>
          {map2Board.map((user,index) => (
          <div>
            {index <10 && 
              <div key={index} className="boardRow">
                <div className="boardContent">{index +1}.&nbsp;&nbsp;&nbsp; {user.name}</div>
                <div className="boardContent">{user.time} &nbsp;&nbsp;&nbsp;</div>
              </div>
            }
            {index <10 && 
              <hr/>
            }
          </div>
          ))}
        </div>
      }

    </div>
  );
}

export default Leaderboard;