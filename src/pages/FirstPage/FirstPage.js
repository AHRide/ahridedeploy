import React from "react";
import styler from "./FirstPage.module.css";
import { useContext, useEffect} from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

export default function ClientHomepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, fetchUser} = useContext(UserContext);

  window.onpopstate = function(event) {
   navigate(2);
 };

 window.onbeforeunload = (event) => {
  const e = event || window.event;
  // Cancel the event
  e.preventDefault();
};

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  const loadUser = async () => {
    if (!user) {
      
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        // Redirecting them once fetched.
        redirectNow();
        console.log(fetchUser);
      }else{
        navigate("/");
      }
    }
  };

  useEffect(() => {
    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <div className={styler.Screen}>
        <div className={styler.row}>
          <div className={styler.column1}>
            <button
              onClick={() => {
                navigate("/rider/signin");
              }}
              className={styler.RiderSignIn}
              type="button"
            >
              sign in
            </button>
            <button
              onClick={() => {
                navigate("/rider/signup");
              }}
              className={styler.RiderSignUp}
              type="submit"
            >
              sign up
            </button>
          </div>
          <div className={styler.column2}>
            <button
              onClick={() => {
                navigate("/client/signin");
              }}
              className={styler.ClientSignIn}
              type="submit"
            >
              sign in
            </button>
            <button
              onClick={() => {
                navigate("/client/signup");
              }}
              className={styler.ClientSignUp}
              type="submit"
            >
              sign up
            </button>
            <button
              onClick={() => {
                navigate("/admin/signin");
              }}
              className={styler.AdminSignIn}
              type="button"
            >
              sign in as Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
