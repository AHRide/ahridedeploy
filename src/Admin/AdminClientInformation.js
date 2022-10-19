import React, { useState, useEffect, useContext } from "react";
import NavBarAdmin from "../components/NavBarAdmin";
import style from "../Admin/AdminRiderInformation.module.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Rating from "@mui/material/Rating";
import BanClient from "../Admin/components/BanClient";
import { useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

export default function AdminClientInformation() {
	const location = useLocation();
	const [updateList, setUpdateList] = useState([]);
  const [riderList, setRiderList] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:3001/getClientReports/${location.state._id}/`)
			.then((response) => {
				setUpdateList(response.data);
				console.log(response.data);
			});

      axios
			.get(`http://localhost:3001/getUser/${location.state.client_email}/`)
			.then((response) => {
				setRiderList(response.data);
			});
	}, [location.state._id, location.state.client_email]);
  return (
    <>
      <NavBarAdmin />
      {updateList.map((lists, index) => (
      <div className={style.row} key={index}>
        <div className={style.column1}>
          <Link
            className={style.backbutton}
            style={{ textDecoration: "none" }}
            to="/admin/client/report"
          >
            <ArrowBackIcon fontSize="large" />
          </Link>
          <h1 className={style.title}>Client's Information</h1>
        </div>
        {riderList.map((client, index) => (
        <div className={style.column2} key={index}>
          <div className={style.row1}>
            <div className={style.column11}>
              <h1 className={style.name1}>Client's Email: {client.email}</h1>
              <h1 className={style.cont}>Contact Number: {client.contact}</h1>
            </div>
            <div className={style.column12}>
              <h1 className={style.from1}>From:</h1>
              <div>
              <Container className={style.text1}
                  id="filled-basic">
                  {lists.from}
                </Container>
              </div>
              <ArrowDownwardIcon className={style.arrow} fontSize="large" />
              <h1 className={style.to1}>To:</h1>
              <div className={style.to2}>
              <Container className={style.text2}
                  id="filled-basic">
                  {lists.to}
                </Container>
              </div>
            </div>
            <div className={style.column13}>
              <h1 className={style.note}>Comment from Rider: </h1>
              <div className={style.location1}>
                <Container className={style.text3}
                  id="filled-basic"
                  rows={4}
                >
                  {lists.comment}
                </Container>
              </div>
            </div>
          </div>
        </div>
         ))}
        <div className={style.column3}>
          <div className={style.button}>
            <BanClient userEmail={lists.client_email} reportID={location.state._id}/>
          </div>
        </div>
      </div>
      ))}
    </>
  );
}
