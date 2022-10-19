import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styless from "./ModalRate.module.css";
import Rating from "@mui/material/Rating";

export default function ModalReport({}) {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={styless.modalBackground}>
      <div className={styless.modalContainer}>
        <div className={styless.title}>
          <h1 className={styless.title}>How is your experience with us?</h1>
        </div>
        <div className={styless.row}>
          <div className={styless.column}>
            <h3 className={styless.text1}>Rating: </h3>
            <Rating
              className={styless.rate}
              name="half-rating"
              defaultValue={0}
              precision={1}
              size="large"
            />
            <h2 className={styless.text11}>Information: </h2>
            <div />
            <div className={styless.column}>
              <TextField
                className={styless.text2}
                id="outlined-multiline-static"
                label="Tell us more..."
                multiline
                rows={4}
              />
            </div>
          </div>
        </div>
        <div className={styless.footer}>
          <button className={styless.buttonDesign}>Rate</button>
        </div>
      </div>
    </div>
  );
}
