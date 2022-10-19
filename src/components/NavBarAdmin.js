import styling from "./NavBarAdmin.module.css";
import { Link } from "react-router-dom";
import Admin_Logo from "../images/Admin_Logo.png";
import React from "react";

export default function NavBarAdmin() {
  return (
    <>
      <div className={styling.Navbar}>
        <div className={styling.logobg}>
          <Link to="/admin/homepage">
            <img className={styling.logo} src={Admin_Logo} alt="Admin Logo" />
          </Link>
        </div>
        <nav className={styling.NavContent}>
          <Link
            className={styling.NavName}
            style={{ textDecoration: "none" }}
            to="/admin/rider/report"
          >
            Check Reports
          </Link>
          <Link
            className={styling.NavName1}
            style={{ textDecoration: "none" }}
            to="/"
          >
            Logout
          </Link>
        </nav>
      </div>
      {/*Navbar */}
    </>
  );
}
