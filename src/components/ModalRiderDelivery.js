import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "../components/ModalRiderDelivery.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalRiderDelivery = ({
  delivery_id,
  rider_email,
  client_email,
  to,
  from,
  receiver_name,
  receiver_cont,
  note,
  payment,
  sPicking,
  sPicked,
  sOTW,
  timeEnd,
}) => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = () => {
    axios.post("http://localhost:3001/deliveryHistory", {
      delivery_id,
      status: "Completed",
      rider_email,
      client_email,
      to,
      from,
      receiver_name,
      receiver_cont,
      note,
      payment,
      sPicking,
      sPicked,
      sOTW,
      timeEnd,
      rating: 0,
    });
    axios
      .delete(`http://localhost:3001/getDeliveryUpdates/${delivery_id}/`)
      .then((response) => {
        console.log(response);
      });
    handleClose();
    alert("Successfully Delivered");
    navigate("/delivery-offers");
  };

  return (
    <div>
      <Button className={style.buttonDesign} onClick={handleClickOpen}>
        Delivered
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Complete! Well Done!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Time Delivered: {timeEnd}
          </DialogContentText>
          <div className={style.column}>
            {/* <TextField
              id="standard-basic"
              label="Input Time(minutes)"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            /> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSubmit()} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalRiderDelivery;
