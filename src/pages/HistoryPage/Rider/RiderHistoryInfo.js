import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import NavBarRider from "../../../components/NavBarRider";
import "../InfoPageHistory.css";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";

const RiderHistoryInfo = () => {
    const navigate = useNavigate();
    const [open2, setOpen2] = useState(false);
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleToggle2 = () => {
        setOpen2(!open2);
    };

    const { user } = useContext(UserContext);
    const location = useLocation();
    const [updateList, setUpdateList] = useState([]);
    const [userProfileList, setuserProfileList] = useState([]);
    const [riderProfileList, setRiderProfileList] = useState([]);
    const [chkValuePicking, setChkValuePicking] = useState(false);
    const [chkValuePicked, setChkValuePicked] = useState(false);
    const [chkValueOTW, setChkValueOTW] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/getDeliveryHistory/${location.state._id}/`)
            .then((response) => {
                setUpdateList(response.data);
            });

    }, [
        location.state._id,
        setUpdateList
    ]);

    return (
        <>
            <NavBarRider />
            {updateList.map((lists, index) => (
                <Container fluid key={index}>
                    <Row>
                        <Container>
                            <Link to="/rider/deliveryHistory">
                                <KeyboardBackspaceOutlinedIcon
                                    sx={{ fontSize: 50 }}
                                    className="history-backButton"
                                />
                            </Link>
                        </Container>
                    </Row>
                    <Row>
                        <Col xs={9} className="history-LeftPane">
                            <Container className="history-ContainerLowerRow">
                                <Row key={index}>
                                    <Col>
                                        <h1 className="history-DataAndTextLable">Name: {lists.receiver_name}</h1>
                                    </Col>
                                    <Col>
                                        <h1 className="history-DataAndTextLable">
                                            Contact Number: {lists.receiver_cont}
                                        </h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <Container className="history-MarginerTop">
                                            <Row>
                                                <h1 className="history-DataAndTextLable">From:</h1>
                                            </Row>
                                            <Row>
                                                <h1 className="history-InvisibleInk">None</h1>
                                            </Row>
                                            <Row>
                                                <h1 className="history-DataAndTextLable">To:</h1>
                                            </Row>
                                        </Container>
                                    </Col>
                                    <Col xs={7}>
                                        <Container className="history-MarginerTop">
                                            <Row>
                                                <Col className="history-FromToContainer">
                                                    <h1 className="history-DataAndTextLable">{lists.from}</h1>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Container className="history-CenterText">
                                                    <ArrowDownwardOutlinedIcon
                                                        sx={{ fontSize: 30 }}
                                                        color="black"
                                                    />
                                                </Container>
                                            </Row>
                                            <Row>
                                                <Col className="history-FromToContainer">
                                                    <h1 className="history-DataAndTextLable">{lists.to}</h1>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                    <Col xs={3}>
                                        <Container className="history-WhitePayment">
                                            <Row>
                                                <h2>To Pay</h2>
                                            </Row>
                                            <Col>
                                                <h2 className="history-CenterText">PHP {lists.payment}.00</h2>
                                            </Col>
                                        </Container>
                                    </Col>
                                </Row>
                                <Container className="history-ContainerRevceiverContact">
                                    <Row>
                                        {/* <Col xs={5}><TextField id="ReceiversName" label="Receiver Name:" variant="outlined" className="TextField2"/></Col> */}
                                        {/* <Col xs={5}><TextField id="ContactNo" label="Contact Number:" variant="outlined" className="TextField2"/></Col> */}
                                        <Col>
                                            <h2 className="history-HeaderTextLabelSmall">Receiver's Name:</h2>
                                            <Box className="history-TextField2">
                                                <Col className="history-FromToContainer">
                                                    <h1 className="history-DataAndTextLable">
                                                        {lists.receiver_name}
                                                    </h1>
                                                </Col>
                                            </Box>
                                        </Col>
                                        <Col>
                                            <h2 className="history-HeaderTextLabelSmall">Contact Number:</h2>
                                            <Box className="history-TextField2">
                                                <Col className="history-FromToContainer">
                                                    <h1 className="history-DataAndTextLable">
                                                        {lists.receiver_cont}
                                                    </h1>
                                                </Col>
                                            </Box>
                                        </Col>
                                    </Row>
                                </Container>
                                <h1 className="history-DataAndTextLable">Note</h1>
                                <Box
                                    sx={{ width: 1200, maxWidth: "100%", height: 150 }}
                                    className="history-WhiteNoteBox"
                                >
                                    <Col>
                                        <h1 className="history-NoteContent">{lists.note}</h1>
                                    </Col>
                                </Box>
                            </Container>
                            <Container></Container>
                        </Col>
                        <Col xs={3} className="history-RightPane">
                            <Container>
                                <h2 className="history-StatusText">Status</h2>
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
                                    {lists.status === "Completed" && (
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox checked={true} />}
                                                label={"Delivered: " + lists.timeEnd}
                                            />
                                        </Grid>

                                    )}
                                    {lists.status === "Cancelled" && (
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox checked={true} />}
                                                label="Cancelled"
                                            />
                                        </Grid>

                                    )}

                                </Grid>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    );
};

export default RiderHistoryInfo;