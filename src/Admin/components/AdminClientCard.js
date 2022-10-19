import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import style from "../AdminRider.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../pages/delivery-offers/DisplayOfferPage.css"

export default function AdminClientCard() {
  const navigate = useNavigate();
  const [updateList, setUpdateList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`http://localhost:3001/getClientReports`).then((response) => {
        setUpdateList(response.data);
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const toInfoStatus = (_id, client_email) => {
    navigate("/admin/client/report/information", { state: { _id, client_email } });
  };

  return (
    <>
     {updateList.map((lists, index) => (
      <div key={index}>
        
          <div className={style.RiderButton} onClick={() => {
                toInfoStatus(lists._id, lists.client_email)
              }}>
            <CardContent>
            <div className="column-details"><h3>{lists.rider_email}</h3></div>
          <div className="column-details1"><h3>{lists.from}</h3></div>
          <div className="column-details4"><h3>---</h3></div>
          <div className="column-details3"><h3>{lists.to}</h3></div>
              <div className={style.stars}><h3 style={{ marginLeft: '64rem' }}>Reported</h3></div>
            </CardContent>
          </div>

      </div>
        ))}
    </>
  );
}
