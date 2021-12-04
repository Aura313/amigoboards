import React from "react";
import { GoogleLogin } from "react-google-login";
import "../LoginContainer/LoginContainer.scss";

const clientId =
  "345624391031-5nohvvbpfesjk9jqa3spsocu0lt2fdj8.apps.googleusercontent.com";

export function GLogin() {
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
  };

  const onLoginFailure = (res) => {
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
