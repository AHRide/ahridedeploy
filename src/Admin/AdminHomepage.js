import React from "react";
import NavBarAdmin from "../components/NavBarAdmin";
import styled from "../../src/Admin/AdminHomepage.module.css";
import { Link } from "react-router-dom";

function AdminHomepage() {
  return (
    <>
      <NavBarAdmin />;
      <div className={styled.Screen}>
        <Link to="/admin/rider/report">
          <button className={styled.CheckReportsButton} type="submit">
            Check Reports
          </button>
        </Link>
      </div>
    </>
  );
}

export default AdminHomepage;
