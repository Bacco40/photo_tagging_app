import React, { useState, forwardRef, useImperativeHandle} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import{faCircleCheck,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
library.add(faCircleCheck,faCircleExclamation);

const Snackbar = forwardRef(({type, message}, ref) => {
  const [showSnackbar,setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
      show(){
          setShowSnackbar(true);
          setTimeout(() => {
              setShowSnackbar(false);
          },2000)
      },
  }))
  return (
    <div 
      className="Snackbar" 
      style={{
          backgroundColor: type === "success" ? "#00F593" : "#FF0033",
          color: type === "success" ? "black" : "white",
        }}
      id={showSnackbar ? "show" : "hide"}
    >
        <div className="symbol">
            { type === "success" ? <FontAwesomeIcon icon="fa-solid fa-circle-check" /> : <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />}
        </div>
        <div className="message">&nbsp;{message} </div>
    </div>
  );
})

export default Snackbar;