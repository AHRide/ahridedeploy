import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./Modal.css";

function Modal() {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1 className="title">Complete! Well Done!</h1>
        </div>
        <div className="Modalrow">
          <div className="column">
            <h2 className="text1">Time Delivered: </h2>
            <div />
            <div className="column">
              <TextField
                id="standard-basic"
                label="Input Time(minutes)"
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="buttonDesign">Done</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
// {
//   /* <div className="modalBackground">
//           <div className="modalContainer">
//             <button> X </button>
//             <div className="title">
//               <h1>Complete! Well Done!</h1>
//             </div>
//             <div className="body">
//               <h2>Time Delivered: </h2>
//               <TextField
//                 id="standard-basic"
//                 label="Input Time"
//                 variant="standard"
//               />
//             </div>
//             <div className="footer">
//               <button></button>
//             </div>
//           </div>
//         </div> */
// }
