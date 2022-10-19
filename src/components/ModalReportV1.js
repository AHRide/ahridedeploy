import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "../components/ModalReportV1.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";

const ModalReportV1 = ({ updateID, rider_email, 
  client_email, from, to }) => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [open, setOpen] = React.useState(false);
  const [btnValue, setBtnValue] = useState(false);
  const [report, setReport] = useState("");
  const [updatedPost, setUpdatedPost] = useState({
    comment: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
		const interval = setInterval(() => {
		axios
			.get(
				`http://localhost:3001/getDeliveryUpdates/${updateID}/`
			)
			.then((response) => {
				const btn = response.data.map((res) => res.clientReported);
        setReport(btn[0]);
       
			});
		}, 500);
    
		return () => clearInterval(interval);
	}, [updateID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = (post) => {
    console.log(updatedPost);

    axios.post("http://localhost:3001/createClientReport", {
      deliveryID: updateID,
      client_email,
      rider_email,
      to,
      from,
      comment: updatedPost.comment,
      reporttime: time
    });

    axios
      .put(`http://localhost:3001/getDeliveryUpdates/reported/${updateID}`, post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      setBtnValue(true);

    handleClose();
  };


  return (
    <div>
      {report && (
      <Button
        className={style.buttonDesign}
        variant="outlined"
        disabled={true}
        onClick={handleClickOpen}
      >
        Report
      </Button>
      )}
      {!report && (
        <Button
        className={style.buttonDesign}
        variant="outlined"
        disabled={false}
        onClick={handleClickOpen}
      >
        Report
        </Button>

        )}
        
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={style.text1} id="alert-dialog-title">
          {"Uh-oh, Can you tell us more?"}
        </DialogTitle>
        <DialogContent className={style.modalBackground}>
          <DialogContentText
            className={style.font}
            id="alert-dialog-description"
          >
            Information:
          </DialogContentText>
          <div className={style.column}>
            <TextField
              className={style.text2}
              name="comment"
              value={updatedPost.comment ? updatedPost.comment : ""}
              id="outlined-multiline-static"
              label="Tell us more..."
              multiline
              rows={4}
              variant="filled"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button className={style.buttonDesignCancel} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className={style.buttonDesign}
            onClick={() => saveUpdatedPost(true)}
            autoFocus
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalReportV1;