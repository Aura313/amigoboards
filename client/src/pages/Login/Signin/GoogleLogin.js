import React from "react";
import { GoogleLogin } from "react-google-login";
import "../LoginContainer/LoginContainer.scss";
import config from "../../../Configuration/Config.json";
import { useNavigate } from "react-router-dom";
const clientId = config.client_ID;

export function GLogin() {
  let buttonRef = React.useRef < HTMLButtonElement > null;

  const navigate = useNavigate();
  const onLoginSuccess = (resp) => {
    console.log(resp);
    window.location.reload();
    navigate("/home");
  };

  const onLoginFailure = (e, res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div>
      <GoogleLogin
        ref={(btn) => (buttonRef = btn)}
        clientId={clientId}
        buttonText="   Sign In with your Google Account"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
        className="GButton"
      />
    </div>
  );
}
