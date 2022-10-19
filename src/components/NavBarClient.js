import React from "react";
import styling from "./NavBarClient.module.css";
import { Link } from "react-router-dom";
import Client_Logo from "../images/Client_Logo.png";

export default function NavBarClient() {
  return (
    <>
      <div className={styling.Navbar}>
        <div className={styling.logobg}>
          <Link to="/client/homepage">
            <img className={styling.logo} src={Client_Logo} alt="Client Logo" />
          </Link>
        </div>
        <nav className={styling.NavContent}>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/client/book"
          >
            Book a Delivery
          </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/delivery-updates"
          >
            Updates
          </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/client/deliveryHistory"
          >
            History
            </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/client/profile"
          >
            Profile
          </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/client/about"
          >
            About
          </Link>
        </nav>
      </div>
      {/*Navbar */}
    </>
  );
}
