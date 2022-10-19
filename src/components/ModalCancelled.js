import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import cancelled from "../images/cancelled.gif";
import style from "../components/modalcancelled.module.css";

export default function ModalCancelled() {
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
          {"Your Delivery has been cancelled!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The rider has cancelled your delivery request due to unforseen
            circumstances.
            <div className={style.delivered}>
              <img src={cancelled} alt="cancelled logo" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={style.button} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
