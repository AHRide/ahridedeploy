import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "./ModalReport.module.css";

export default function ModalReport({}) {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>
          <h1 className={styles.title}>Uh-oh, What happen?</h1>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <h2 className={styles.text1}>Information: </h2>
            <div />
            <div className={styles.column}>
              <TextField
                className={styles.text2}
                id="outlined-multiline-static"
                label="Tell us more..."
                multiline
                rows={4}
              />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.buttonDesign}>Report</button>
        </div>
      </div>
    </div>
  );
}
