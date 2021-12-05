import React, { useState } from "react";
import {
  Avatar,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import "./Registration.scss";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { isEmail } from "validator";
import AuthService from "../../../Services/AuthenticationService";
import AlertTitle from "@material-ui/lab/AlertTitle";

export function Registration({ handleChange }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFlag, setUsernameFlag] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(true);
  const [registermessageFlag, setRegisterMessageFlag] = useState(false);
  const [registermessage, setRegisterMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  // const usernamerequired = (value) => {
  //   if (!value) {
  //     setUsernameFlag(false);
  //     setUsernameMessage("UserName Required");
  //   } else {
  //     setUsernameFlag(true);
  //     setUsernameMessage("");
  //   }
  // };
  // const passwordrequired = (value) => {
  //   if (!value) {
  //     setPasswordFlag(false);
  //     setPasswordMessage("Password Required");
  //   } else {
  //     setPasswordFlag(true);
  //     setPasswordMessage("");
  //   }
  // };
  // const emailrequired = (value) => {
  //   if (!value) {
  //     setEmailFlag(false);
  //     setEmailMessage("Email Required");
  //   } else {
  //     setEmailFlag(true);
  //     setEmailMessage("");
  //   }
  // };
  const usernameCheck = (value) => {
    if (username.length < 6) {
      setUsernameFlag(false);
      setUsernameMessage("Username should be atleast 6 Characters");
    } else {
      setUsernameFlag(true);
      setUsernameMessage("");
    }
  };

  const passwordCheck = (value) => {
    if (password.length < 6) {
      setPasswordFlag(false);
      setPasswordMessage("Password should be atleast 6 Characters");
    } else {
      setPasswordFlag(true);
      setPasswordMessage("");
    }
  };

  const emailCheck = (value) => {
    if (!isEmail(value)) {
      setEmailFlag(false);
      setEmailMessage("Incorrect Email");
    } else {
      setEmailFlag(true);
      setEmailMessage("");
    }
  };

  const onClick = () => {
    emailCheck(email);
    usernameCheck(username);
    passwordCheck(password);

    if (emailFlag && usernameFlag && passwordFlag) {
      AuthService.register(username, email, password).then((response) => {
        setRegisterMessage(response.data);
        setRegisterMessageFlag(false);
      });
    }
  };

  return (
    <Grid>
      <Paper className="RegistrationpaperStyle">
        <Grid align="center">
          <Avatar className="RegistrationavatarStyle">
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN UP</h2>
          {registermessageFlag ? (
            <AlertTitle className="alertTitleColor">
              {registermessage}
            </AlertTitle>
          ) : null}
        </Grid>
        {emailFlag ? (
          <TextField
            label="EmailID"
            className="RegistrationspacingStyle"
            placeholder="Enter EmailID"
            fullWidth
            required
            onChange={onChangeEmail}
            variant="outlined"
          ></TextField>
        ) : (
          <TextField
            label="EmailID"
            className="RegistrationspacingStyle"
            placeholder="Enter EmailID"
            fullWidth
            error
            id="filled-error-helper-text"
            helperText={emailMessage}
            required
            onChange={onChangeEmail}
            variant="outlined"
          ></TextField>
        )}

        {usernameFlag ? (
          <TextField
            label="Username"
            className="RegistrationspacingStyle"
            placeholder="Enter Username"
            fullWidth
            required
            onChange={onChangeUsername}
            variant="outlined"
          ></TextField>
        ) : (
          <TextField
            label="Username"
            className="RegistrationspacingStyle"
            placeholder="Enter Username"
            fullWidth
            error
            id="filled-error-helper-text"
            helperText={usernameMessage}
            required
            onChange={onChangeUsername}
            variant="outlined"
          ></TextField>
        )}
        {passwordFlag ? (
          <TextField
            label="Password"
            className="RegistrationspacingStyle"
            fullWidth
            type="password"
            required
            onChange={onChangePassword}
            variant="outlined"
          ></TextField>
        ) : (
          <TextField
            label="Password"
            className="RegistrationspacingStyle"
            fullWidth
            error
            id="filled-error-helper-text"
            helperText={passwordMessage}
            type="password"
            required
            onChange={onChangePassword}
            variant="outlined"
          ></TextField>
        )}
        <Button
          className="RegistrationspacingStyle"
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          onClick={onClick}
        >
          SIGN UP
        </Button>

        <Typography className="RegistrationnewaccountStyle">
          Already have an account?
          <Link to="#" onClick={() => handleChange("event", 0)}>
            {" "}
            SIGN IN
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Registration;
