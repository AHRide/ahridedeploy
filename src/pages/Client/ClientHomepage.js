import { useContext } from "react";
import NavBarClient from "../../components/NavBarClient";
import styled from "./ClientHomepage.module.css";
import { Link } from "react-router-dom";

export default function ClientHomepage() {
  return (
    <>
      <NavBarClient />
      <div className={styled.Screen}>
        <Link to="/client/book">
          <button className={styled.BookADeliveryButton} type="submit">
            Book a Delivery
          </button>
        </Link>
      </div>
    </>
  );
}
