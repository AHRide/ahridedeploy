import React from "react";
import NavBarRider from "../components/NavBarRider";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <NavBarRider />

      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/login">Signin</Link>
      </nav>
    </>
  );
}

export default Homepage;