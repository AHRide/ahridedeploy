import { useContext } from "react";
import NavBarRider from "../../components/NavBarRider";
import styled from "./RiderHomepage.module.css";
import { Link } from "react-router-dom";

export default function RiderHomepage() {
  return (
    <>
      <NavBarRider />
      <div className={styled.Screen}>
        <Link to="/delivery-offers">
          <button className={styled.DeliveryOffersButton} type="submit">
            Delivery Offers
          </button>
        </Link>
      </div>
      
      <div></div>
    </>
  );
}
