import React from "react";
// import validate from "./validateInfo";
// import useForm from "./useForm";
// import "./Form.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import ArrowForwardIcon from "@mui/icons-material/ArrowRightAlt";
import { TextField } from "@mui/material";


const FormSignin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // We are consuming our user-management context to 
  // get & set the user details here
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  // We are using React's "useState" hook to keep track
  //  of the form values.
  const [form, setForm] = useState({
    email: "",
    password: ""
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
    navigate(redirectTo ? redirectTo : "/rider/homepage");
  }

  // Since there can be chances that the user is already logged in
  // but whenever the app gets refreshed the user context will become
  // empty. So we are checking if the user is already logged in and
  // if so we are redirecting the user to the home page.
  // Otherwise we will do nothing and let the user to login.
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        // Redirecting them once fetched.
        redirectNow();
      }
    }
  }

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
        redirectNow();
      }
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="sign-in-form-content-right">
        <h1>Sign In</h1>
        <p className="sign-in-form-welcome">
          Please sign in to your account to continue.
        </p>
        <div className='sign-in-form-inputs'>
          <label className='sign-in-form-label'>Email</label>
          <TextField
            name="email"
            type="name"
            label="Email"
            variant="outlined"
            fullWidth
            value={form.email}
            onChange={onFormInputChange}
          />
        </div>
        <div className='sign-in-form-inputs'>
          <label className='sign-in-form-label'>Password</label>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            fullWidth
            value={form.password}
            onChange={onFormInputChange}
          />
        </div>
        <ArrowForwardIcon
              sx={{ fontSize: 120 }}
              className="button_SignUp_Rider"
              onClick={onSubmit}
            ></ArrowForwardIcon>
    </div>
  );
};

export default FormSignin;
