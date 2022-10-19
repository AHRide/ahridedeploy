import React, { useState } from "react";
import "../Form.css";
import SuccessForm from "./SuccessForm";
import AdminFormSignin from "./AdminFormSignin";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useNavigate } from "react-router-dom";

const SigninAdminPage = () => {
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
        <FirstPageIcon
          sx={{ fontSize: 60 }}
          className="admin-button_Home"
          onClick={() => {
            navigate("/");
          }}
          type="submit"
        ></FirstPageIcon>
         
          </div>
          {!isSubmitted ? (
            <AdminFormSignin submitForm={submitForm} />
          ) : (
            <SuccessForm />
          )}
        </div>
      </div>
    </>
  );
};

export default SigninAdminPage;