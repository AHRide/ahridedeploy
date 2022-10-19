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

const BanRider = ( {userEmail, historyID} ) => {
  const [open, setOpen] = useState(false);
  const [user, setUserEmail] = useState(userEmail);
  const [history, setHistory] = useState(historyID);
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(userEmail);
    setHistory(historyID);
  }, [userEmail, historyID]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    // axios
    //   .delete(`http://localhost:3001/getHistoryDelete/${historyID}/`)
    //   .then((response) => {
    //     console.log(response);
    //   });
    //   axios
    //   .delete(`http://localhost:3001/getRiderUser/delete/${user}/`)
    //   .then((response) => {
    //     console.log(response);
    //   });
  
      axios.all([
        axios.delete(`http://localhost:3001/getHistoryDelete/${historyID}/`),
        axios.delete(`http://localhost:3001/getRiderUser/delete/${user}/`)
      ])
      .then(responseArr =>{
        console.log(responseArr[0]);
        console.log(responseArr[1]);
      });
  
      handleClose();
      alert("Successfully Banned User");
      navigate("/admin/rider/report");
  };

  const onDelete = () => {

  };

  return (
    <div>
      <div className={style.Button1}>
        <Button
          className={style.Button}
          variant="outlined"
          onClick={handleClickOpen}
        >
          BAN
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to BAN the rider?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Warning: The rider loses access to the account permanently after
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
export default BanRider;
