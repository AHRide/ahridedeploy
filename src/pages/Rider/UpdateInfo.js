import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import style from "../Rider/UpdateInfo.module.css";
import { UserContext } from "../../contexts/user.context";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const [updatedPost, setUpdatedPost] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [post, setPost] = React.useState({
    name: "",
    contact: "",
  });

  const updatePost = (post) => {
    setUpdatedPost(post);
    handleClickOpen();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    axios
      .put(
        `http://localhost:3001/UpdateInfo/rider/${user._profile.data.email}`,
        updatedPost
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
  };

  return (
    <div>
      <div className={style.buttonpos}>
        <Button
          onClick={() => updatePost(post)}
          variant="outlined"
          // onClick={handleClickOpen}
          className={style.button1}
        >
          Update Info
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={style.titleupdate}>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updating your information will automatically update it to all
            necessary location.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Name"
            type="name"
            name="name"
            value={updatedPost.name ? updatedPost.name : ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Contact Number"
            type="number"
            name="contact"
            value={updatedPost.contact ? updatedPost.contact : ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button className={style.updateb} onClick={saveUpdatedPost}>
            Update
          </Button>
          {/* onClick={() => updatePost(post)} */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
