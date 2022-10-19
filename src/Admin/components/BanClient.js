import React, { useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "../components/BanRider.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BanClient = ( {userEmail, reportID} ) => {
  const [open, setOpen] = useState(false);
  const [user, setUserEmail] = useState(userEmail);
  const [report, setReport] = useState(reportID);
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(userEmail);
    setReport(reportID);
  }, [userEmail, reportID]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = () => {

    axios.all([
      axios.delete(`http://localhost:3001/getClientReport/delete/${report}/`),
      axios.delete(`http://localhost:3001/getClientUser/delete/${user}/`)
    ])
    .then(responseArr =>{
      console.log(responseArr[0]);
      console.log(responseArr[1]);
    });

    handleClose();
    alert("Successfully Banned User");
    navigate("/admin/client/report");
  };

  return (
    <div>
      <Button
        className={style.Button}
        variant="outlined"
        onClick={handleClickOpen}
      >
        BAN
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to BAN the client?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Warning: The client loses access to the account permanently after
            being banned.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className={style.ban} onClick={()=> onSubmit()} autoFocus>
            Ban
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default BanClient;