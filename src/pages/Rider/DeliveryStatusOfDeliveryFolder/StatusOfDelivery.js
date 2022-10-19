import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import NavBarRider from "../../../components/NavBarRider";
import "./StatusOfDelivery.css";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Button1 from "@mui/material/Button";
import Button2 from "@mui/material/Button";
import Button3 from "@mui/material/Button";
import Button4 from "@mui/material/Button";
import { Grid } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Modal from "../../../components/Modal";
import ModalReportV1 from "../../../components/ModalReportV1";
import ModalRiderDelivery from "../../../components/ModalRiderDelivery";
import { useNavigate } from "react-router-dom";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";


const StatusOfDelivery = () => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });;

  const [bttn1, setBttn1] = useState(false);
  const handleChange1 = () => {
    setBttn1(!bttn1);
    Button1.style.textDecoration = "none";
  };
  const [bttn2, setBttn2] = useState(false);
  const handleChange2 = () => {
    setBttn2(!bttn2);
  };
  const [bttn3, setBttn3] = useState(false);
  const handleChange3 = () => {
    setBttn3(!bttn3);
  };
  const [bttn4, setBttn4] = useState(false);
  const handleChange4 = () => {
    setBttn4(!bttn4);
  };
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openmodal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleToggle1 = () => {
    setOpen1(!open1);
  };

  const [updateList, setUpdateList] = useState([]);
  const [updateStatus, setUpdateStatus] = useState([]);
  const [chkValuePicking, setChkValuePicking] = useState(false);
  const [chkValuePicked, setChkValuePicked] = useState(false);
  const [chkValueOTW, setChkValueOTW] = useState(false);
  const [btnValuePicking, setBtnValuePicking] = useState(false);
  const [btnValuePicked, setBtnValuePicked] = useState(false);
  const [btnValueOTW, setBtnValueOTW] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/getDeliveryUpdates/rider/${user._profile.data.email}`
      )
      .then((response) => {
        setUpdateList(response.data);
      });

    axios
      .get(
        `http://localhost:3001/getDeliveryUpdates/rider/${user._profile.data.email}`
      )
      .then((response) => {
        const picking = response.data.map((res) => res.sPicking);
        const picked = response.data.map((res) => res.sPicked);
        const OTW = response.data.map((res) => res.sOTW);
        setBtnValueOTW(OTW[0]);
        setBtnValuePicked(picked[0]);
        setBtnValuePicking(picking[0]);
      });
  }, [user._profile.data.email]);

  const onSubmit = (
    _id,
    client_email,
    from,
    to,
    receiver_name,
    receiver_cont,
    note,
    payment
  ) => {
    axios.post("http://localhost:3001/deliveryHistory", {
      delivery_id: _id,
      status: "Cancelled",
      rider_email: user._profile.data.email,
      client_email,
      to,
      from,
      receiver_name,
      receiver_cont,
      note,
      payment,
      sPicking: btnValuePicking,
      sPicked: btnValuePicked,
      sOTW: btnValueOTW,
      timeEnd: time
    });
    axios
      .delete(`http://localhost:3001/getDeliveryUpdates/${_id}/`)
      .then((response) => {
        console.log(response);
      });

    alert("Successfully Cancelled");
    navigate("/delivery-offers");
  };

  const onPickingUpdate = (post) => {
    setChkValuePicking(true);
    setBtnValuePicking(true);
    axios
      .put(
        `http://localhost:3001/getDeliveryUpdates/PickingUI/${post._id}/`,
        post
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    axios
      .put(
        `http://localhost:3001/getDeliveryUpdates/start/${post._id}/`,
        post
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onPickedUpdate = (post) => {
    if (btnValuePicking === false) {
      alert("Don't Skip");
      return;
    }
    setBtnValuePicked(true);
    setChkValuePicked(true);

    axios
      .put(
        `http://localhost:3001/getDeliveryUpdates/PickedUI/${post._id}/`,
        post
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onOTWUpdate = (post) => {
    if (btnValuePicked === false || btnValuePicking === false) {
      alert("Don't Skip");
      return;
    }
    setBtnValueOTW(true);
    setChkValueOTW(true);

    axios
      .put(`http://localhost:3001/getDeliveryUpdates/OTW/${post._id}/`, post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (updateList.length > 0) {
    return (
      <>
        <NavBarRider />
        {updateList.map((lists, index) => (
          <Container fluid key={index}>
            <Row>
              <Container>
                <Link to="/delivery-offers">
                  <KeyboardBackspaceOutlinedIcon
                    sx={{ fontSize: 50 }}
                    className="backButton"
                  />
                </Link>
              </Container>
            </Row>
            <Row>
              <Col xs={9} className="LeftPane">
                <div class="d-flex justify-content-end" size="medium">
                  <ModalReportV1 className="Rider_Report_Modal"
                  updateID={lists._id}
                  rider_email={user._profile.data.email}
                  client_email={lists.client_email}
                  from={lists.from}
                  to={lists.to}
                  ></ModalReportV1>
                </div>
                <Container className="ContainerLowerRow">
                  <h1 className="HeaderTextLabel">Client Information</h1>
                  <Row>
                    <Col>
                      <h1 className="DataAndTextLable">
                        Name: {lists.receiver_name}
                      </h1>
                    </Col>
                    <Col>
                      <h1 className="DataAndTextLable">
                        Contact Number: {lists.receiver_cont}
                      </h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}>
                      <Container className="MarginerTop">
                        <Row>
                          <h1 className="DataAndTextLable">From:</h1>
                        </Row>
                        <Row>
                          <h1 className="InvisibleInk">None</h1>
                        </Row>
                        <Row>
                          <h1 className="DataAndTextLable">To:</h1>
                        </Row>
                      </Container>
                    </Col>
                    <Col xs={7}>
                      <Container className="MarginerTop">
                        <Row>
                          <Col className="FromToContainer">
                            <h1 className="DataAndTextLable"> {lists.from}</h1>
                          </Col>
                        </Row>
                        <Row>
                          <Container className="CenterText">
                            <ArrowDownwardOutlinedIcon
                              sx={{ fontSize: 30 }}
                              color="black"
                            />
                          </Container>
                        </Row>
                        <Row>
                          <Col className="FromToContainer">
                            <h1 className="DataAndTextLable">{lists.to}</h1>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                    <Col xs={3}>
                      <Container className="WhitePayment">
                        <Row>
                          <h2>To Pay</h2>
                        </Row>
                        <Col>
                          <h2 className="CenterText">PHP {lists.payment}</h2>
                        </Col>
                      </Container>
                    </Col>
                  </Row>
                  <Container className="ContainerRevceiverContact">
                    <Row>
                      {/* <Col xs={5}><TextField id="ReceiversName" label="Receiver Name:" variant="outlined" className="TextField2"/></Col> */}
                      {/* <Col xs={5}><TextField id="ContactNo" label="Contact Number:" variant="outlined" className="TextField2"/></Col> */}
                      <Col>
                        <h2 className="HeaderTextLabelSmall">
                          Receiver's Name:
                        </h2>
                        <Box className="TextField2">
                          <Col className="FromToContainer">
                            <h1 className="DataAndTextLable">
                              {" "}
                              {lists.receiver_name}
                            </h1>
                          </Col>
                        </Box>
                      </Col>
                      <Col>
                        <h2 className="HeaderTextLabelSmall">
                          Contact Number:
                        </h2>
                        <Box className="TextField2">
                          <Col className="FromToContainer">
                            <h1 className="DataAndTextLable">
                              {" "}
                              {lists.receiver_cont}
                            </h1>
                          </Col>
                        </Box>
                      </Col>
                    </Row>
                  </Container>
                  <h1 className="DataAndTextLable">Note</h1>
                  <Box
                    sx={{ width: 1200, maxWidth: "100%", height: 150 }}
                    className="WhiteNoteBox"
                  >
                    <Col>
                      <h1 className="NoteContent">{lists.note}</h1>
                    </Col>
                  </Box>
                </Container>
                <Container className="buttonMargine">
                  <Row>
                    <Col>
                      <Button
                        variant="contained"
                        size="large"
                        className="button"
                        disabled={btnValuePicking}
                        onClick={() => onPickingUpdate(lists)}
                      >
                        Picking up Item
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="contained"
                        size="large"
                        className="button"
                        disabled={btnValuePicked}
                        onClick={() => onPickedUpdate(lists)}
                      >
                        Picked up Item
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="contained"
                        size="large"
                        className="button"
                        disabled={btnValueOTW}
                        onClick={() => onOTWUpdate(lists)}
                      >
                        Item on the Way
                      </Button>
                    </Col>
                    <Col>
                      <ModalRiderDelivery
                        delivery_id={lists._id}
                        rider_email={user._profile.data.email}
                        client_email={lists.client_email}
                        to={lists.to}
                        from={lists.from}
                        receiver_name={lists.receiver_name}
                        receiver_cont={lists.receiver_cont}
                        note={lists.note}
                        payment={lists.payment}
                        sPicking={btnValuePicking}
                        sPicked={btnValuePicked}
                        sOTW={btnValueOTW}
                        timeEnd={time} />
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col sm={3} className="RightPane">
                <Container>
                  <h2 className="StatusText">Status</h2>
                  <h2 className="DataAndTextLable">
                    Estimated Time: {lists.duration}
                  </h2>
                </Container>
                <Container>
                  <Grid container direction={"column"} spacing={0}>
                    {/* PICKING UP ITEM */}
                    {lists.sPicking && !lists.sPicked && !lists.sOTW && (
                      <div>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={true} />
                            }
                            label="Picking up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                disabled={true}
                                checked={chkValuePicked}
                              />
                            }
                            label="Picked up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={chkValueOTW} />
                            }
                            label="Item on the way"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                      </div>
                    )}
                    {/*   PICKED UP ITEM */}
                    {!lists.sPicking && !lists.sPicked && !lists.sOTW && (
                      <div>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                disabled={true}
                                checked={chkValuePicking}
                              />
                            }
                            label="Picking up item"
                          />
                        </Grid>

                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                disabled={true}
                                checked={chkValuePicked}
                              />
                            }
                            label="Picked up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={chkValueOTW} />
                            }
                            label="Item on the way"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                      </div>
                    )}
                    {/*   ITEM ON THE WAY */}
                    {lists.sPicking && lists.sPicked && !lists.sOTW && (
                      <Row>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={true} />
                            }
                            label="Picking up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={true} />
                            }
                            label="Picked up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={chkValueOTW} />
                            }
                            label="Item on the way"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                      </Row>
                    )}
                    {lists.sPicking && lists.sPicked && lists.sOTW && (
                      <div>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={true} />
                            }
                            label="Picking up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={true} />
                            }
                            label="Picked up item"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox disabled={true} checked={true} />
                            }
                            label="Item on the way"
                          />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                        <Grid item>
                          <MoreVertOutlinedIcon />
                        </Grid>
                      </div>
                    )}

                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox disabled={true} />}
                        label="Delivered"
                      />
                    </Grid>
                  </Grid>
                </Container>
                <Container className="CancelButtonContainer">
                  <Stack spacing={20} direction="row">
                    <Box></Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        onSubmit(
                          lists._id,
                          lists.client_email,
                          lists.from,
                          lists.to,
                          lists.receiver_name,
                          lists.receiver_cont,
                          lists.note,
                          lists.payment,
                          lists.duration
                        )
                      }
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Container>
              </Col>
            </Row>
          </Container>
        ))}
      </>
    );
  } else {
    return (
      <>
        <NavBarRider />
        <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <h3>No Current Delivery Yet</h3>
        </div>
        </Container>
        
      </>
    );
  }
};

export default StatusOfDelivery;
