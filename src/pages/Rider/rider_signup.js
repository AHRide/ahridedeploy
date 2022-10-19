import React from "react";
import { useContext, useState } from "react";
import "./rider_signup.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowRightAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { TextField } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Radio from '@mui/material/Radio';


const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Others",
    label: "Others",
  },
];

const RiderSignUp = () => {
  const [gender, setGender] = React.useState("Male");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleVehicle = (event) => {
    setVehicle(event.target.value);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [birthdate, setBirth] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plate, setPlate] = useState("");

  const createUser = () => {
    Axios.post("http://localhost:3001/createUserRider", {
      name,
      gender,
      birthdate,
      contact,
      email,
      password,
      license,
      vehicle,
      plate,
    });
  };

  // As explained in the Login page.
  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    gender: "",
    birthdate: "",
    contact: "",
    email: "",
    password: "",
    license: "",
    vehicle: "",
    plate: "",
  });

  // As explained in the Login page.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // As explained in the Login page.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/rider/homepage");
  };

  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        createUser();
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Row className="RowPrperty">
        <Col sm={8} className="Rider_signUp_ColumnLeft">
            <FirstPageIcon
              sx={{ fontSize: 40 }}
              className="Back_button_Home_SignUp"
              onClick={() => {
                navigate("/");
              }}
              type="submit"
            ></FirstPageIcon>
          <div className="RiderSignUpMain">
            <p className="text_SignUp">Sign Up</p>
            <p className="text_TagLine">
              Creating an account only take a minute or so and you will become
              part of us! Great exchange, right?
            </p>
            <Container className = "Rider_SignUpTextField">
            <p className="text_Labels_SignUp">Name</p>
            <TextField
              className="Rider_SignUpTextField"
              name="name"
              type="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={form.name}
              onInput={onFormInputChange}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></TextField>
            </Container>
            <Container className="Rider_SignUpTextField">
              <p className="text_Labels_SignUp">Gender</p>
              <TextField
                select
                variant="outlined"
                fullWidth
                label="Select"
                value={gender}
                onInput={onFormInputChange}
                onChange={handleChange}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Container>
            <Container className="Rider_SignUpTextField">
            <Row>
              <Col>
              <p className="text_Labels_SignUp">Birthdate</p>
              <TextField
                name="birthdate"
                type="date"
                variant="outlined"
                label="."
                fullWidth
                value={form.birthdate}
                onInput={onFormInputChange}
                onChange={(event) => {
                  setBirth(event.target.value);
                }}
              ></TextField>
              </Col>
              <Col>
               <p className="text_Labels_SignUp">Contact Number</p>
            <TextField
              name="contact"
              type="number"
              label="Contact No."
              variant="outlined"
              fullWidth
              value={form.contact}
              onInput={onFormInputChange}
              onChange={(event) => {
                setContact(event.target.value);
              }}
            ></TextField>
              </Col>
            </Row>
            </Container>
            <Container className="Rider_SignUpTextField">
            <p className="text_Labels_SignUp">Email Address</p>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={form.email}
              onInput={onFormInputChange}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></TextField>
            </Container>
            <Container className="Rider_SignUpTextField">
            <p className="text_Labels_SignUp">Password</p>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              fullWidth
              value={form.password}
              onInput={onFormInputChange}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></TextField>
            </Container>
            <Container className="Rider_SignUpTextField">
            <p className="text_Labels_SignUp">License Number</p>
            <TextField
              name="license"
              type="license"
              label="License Number"
              variant="outlined"
              fullWidth
              value={form.license}
              onInput={onFormInputChange}
              onChange={(event) => {
                setLicense(event.target.value);
              }}
            ></TextField>
            </Container>
            <Container className="Rider_SignUpTextField">
            <p className="text_Labels_SignUp">Type of Vehicle</p>
            <div>
              <Row>
                <Col>
                  <Card className="cardProperty">
                    <Card.Body>
                      <TwoWheelerIcon sx={{ fontSize: 70 }} />
                      <Card.Text>Motorcycle</Card.Text>
                      <Radio
                        checked={vehicle === 'Motorcycle'}
                        onChange={handleVehicle}
                        value="Motorcycle"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'Motorcycle' }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="cardProperty">
                    <Card.Body>
                      <DirectionsCarFilledIcon sx={{ fontSize: 70 }} />
                      <Card.Text>Car</Card.Text>
                      <Radio
                        checked={vehicle === 'Car'}
                        onChange={handleVehicle}
                        value="Car"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'Car' }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="cardProperty">
                    <Card.Body>
                      <LocalShippingIcon sx={{ fontSize: 70 }} />
                      <Card.Text>Truck</Card.Text>
                      <Radio
                        checked={vehicle === 'Truck'}
                        onChange={handleVehicle}
                        value="Truck"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'Truck' }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            </Container>
            <Container className="Rider_SignUpTextField">
            <p className="text_Labels_SignUp">Plate Number</p>
            <TextField
              name="plate"
              type="plate"
              label="PlateNumber"
              variant="outlined"
              fullWidth
              value={form.plate}
              onInput={onFormInputChange}
              onChange={(event) => {
                setPlate(event.target.value);
              }}
            ></TextField>
            </Container>
            <center>
              <ArrowForwardIcon
                sx={{ fontSize: 120 }}
                className="button_SignUp_Rider_SignUp"
                onClick={onSubmit}
              ></ArrowForwardIcon>
            </center>
          </div>
        </Col>
        <Col sm={4} className="Rider_SignUp_columnR_SignUp2" >
          <Container className="Rider_SignUpRightPane">
          <p className="text_LabelR_SignUp">Already have an account?</p>
          <center>
            <button
              onClick={() => {
                //   navigate("/rider/signin");
              }}
              className="button_LogIn_SignUp"
              type="submit"
            >
              Log In
            </button>
          </center>
          </Container>
         
        </Col>
      </Row>
    </>
  );
};

export default RiderSignUp;
