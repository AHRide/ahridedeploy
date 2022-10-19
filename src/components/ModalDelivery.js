import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import delivered from "../images/delivered.gif";
import style from "../components/modalcancelled.module.css";

export default function ModalDelivery() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"The Rider has Delivered the parcel."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The rider has successfully delivered the parcel. Please check for
            any damages or loss.
            <div className={style.delivered}>
              <img src={delivered} alt="delivered logo" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={style.button} onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
