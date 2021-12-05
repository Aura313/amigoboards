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
  const [refresh, setRefresh] = useState(true);
  const emailElement = React.useRef();
  const usernameElement = React.useRef();
  const passwordElement = React.useRef();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    usernameCheck(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    passwordCheck(password);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    emailCheck(email);
  };
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
        if (response.status === 200) {
          setRegisterMessage(response.data.message);
          setRegisterMessageFlag(true);
        } else if (response.status === 201) {
          setRegisterMessage(response.data.message);
          setRegisterMessageFlag(true);
        }
      //  emailElement.current.reset();
      //   usernameElement.current.reset();
      //   passwordElement.current.reset();
      });
      // console.log(registermessage);
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
          ref={emailElement}
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
          ref={emailElement}
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
          ref={usernameElement}
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
          ref={usernameElement}
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
          ref={passwordElement}
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
          ref={passwordElement}
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
