import React from "react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import ArrowForwardIcon from "@mui/icons-material/ArrowRightAlt";
import { TextField } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import "./client_signin.css";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const ClientSignin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    // Sending HTTP GET request
    axios
    .get(`http://localhost:3001/getUsers/`)
    .then((response) => {
      const clientEmails = response.data.map(res => res.email)
        setClientList(clientEmails);
    });
}, []);


  // We are consuming our user-management context to
  // get & set the user details here
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  // We are using React's "useState" hook to keep track
  //  of the form values.
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // This function will be called whenever the user edits the form.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // This function will redirect the user to the
  // appropriate page once the authentication is done.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/client/homepage");
  };

  // Since there can be chances that the user is already logged in
  // but whenever the app gets refreshed the user context will become
  // empty. So we are checking if the user is already logged in and
  // if so we are redirecting the user to the home page.
  // Otherwise we will do nothing and let the user to login.
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        console.log(form.email);
        if(!(clientList.includes(form.email)) ) {
          alert(`${form.email} was not found in our record for registered Clients.`)
          return
      }
        // Redirecting them once fetched.
        redirectNow();
      }
    }
  };

  // This useEffect will run only once when the component is mounted.
  // Hence this is helping us in verifying whether the user is already logged in
  // or not.
  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function gets fired when the user clicks on the "Login" button.
  const onSubmit = async (event) => {
    try {
      // Here we are passing user details to our emailPasswordLogin
      // function that we imported from our realm/authentication.js
      // to validate the user credentials and login the user into our App.
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        console.log(form.email);
        if(!(clientList.includes(form.email))) {
          alert(`${form.email} was not found in our record for registered Clients.`)
          return
      }
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Row className="bodyPage">
      <Col sm={4} className="columnL">
        <Row>
        <FirstPageIcon
          sx={{ fontSize: 60 }}
          className="button_Home"
          onClick={() => {
            navigate("/");
          }}
          type="submit"
        ></FirstPageIcon>
        </Row>
        <Container>
        <p className="text_LabelL">Don't have an account yet?</p>
        <center>
          <button
            onClick={() => {
              navigate("/client/signup");
            }}
            className="button_SignUp"
            type="submit"
          >
            Sign Up
          </button>
        </center>
        </Container>
        
      </Col>
      <Col sm={8}className="columnR">
        <h1 className="text_SignUp">Sign In</h1>
        <p className="text_TagLine">
          Please sign in to your account to continue.
        </p>

        <label className="text_Labels">Email</label>
        <TextField
          name="email"
          type="name"
          label="Email"
          variant="outlined"
          fullWidth
          value={form.email}
          onChange={onFormInputChange}
        />
        <label className="text_Labels">Password</label>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          fullWidth
          value={form.password}
          onChange={onFormInputChange}
        />
        <ArrowForwardIcon
          sx={{ fontSize: 120 }}
          className="button_SignIn"
          onClick={onSubmit}
        ></ArrowForwardIcon>
      </Col>
    </Row>
  );
};

export default ClientSignin;
