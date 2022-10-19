import React from "react";
import styling from "./NavBarRider.module.css";
import { Link } from "react-router-dom";
import Rider_Logo from "../images/Rider_Logo.png";

export default function NavBarRider() {
  return (
    <>
      <div className={styling.Navbar}>
        <div className={styling.logobg}>
          <Link to="/rider/homepage">
            <img className={styling.logo} src={Rider_Logo} alt="Rider Logo" />
          </Link>
        </div>
        <nav className={styling.NavContent}>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/delivery-offers"
          >
            Delivery Offers
          </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/rider/status-of-delivery"
          >
            Updates
          </Link>
           <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/rider/deliveryHistory"
          >
            History
          </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/rider/profile"
          >
            Profile
          </Link>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/rider/about"
          >
            About
          </Link>
        </nav>
      </div>
      {/*Navbar */}
    </>
  );
}
