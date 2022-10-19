import React from "react";
import style from "../components/button.module.css";

export default function ComponentButton() {
  return (
    <>
      <button className={style.RiderButton} type="submit">
        <h1 className={style.clientName}>Fiona Qwerty</h1>
        <h1 className={style.frombutton}>Chowking</h1>
        <h1 className={style.tobutton}>Brgy. Mambaling, Cebu City</h1>
        <h1 className={style.ratingbutton}>Rating</h1>
      </button>
    </>
  );
}
