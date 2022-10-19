import React, { useState } from "react";
import "./Form.css";
import FormSignin from "./FormSignin";
import FormSuccess from "./FormSuccess";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className="sign-in-form-container">
        <div className="sign-in-form-container-grid">
          <div className="sign-in-form-content-left">
            <h1>Don't have an account yet?</h1>
            <button
              onClick={() => {
                navigate("/client/signup");
              }}
              className="sign-in-form-input-btn2"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {!isSubmitted ? (
            <FormSignin submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
      </div>
    </>
  );
};

export default SigninPage;
