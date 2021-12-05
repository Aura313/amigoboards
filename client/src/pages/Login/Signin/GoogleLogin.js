import React from "react";
import { GoogleLogin } from "react-google-login";
import "../LoginContainer/LoginContainer.scss";
import config from  "../../../Configuration/Config.json";

const clientId =config.client_ID;


export function GLogin() {
  const onLoginSuccess = (e,res) => {
    console.log("Login Success:", res.profileObj);
  };

  const onLoginFailure = (e,res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="   Sign In with your Google Account"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        className="GButton"
      />
    </div>
  );
}
