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
import "./Login.scss";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GLogin } from "./GoogleLogin";

export function Login({ handleChange }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFlag, setUsernameFlag] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(true);
 
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    console.log(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    console.log(password);
  };

  const usernamerequired = (value) => {

    if (!value) {
      setUsernameFlag(false);
    } else {
      setUsernameFlag(true);
    }
  };
  const passwordrequired = (value) => {
    if (!value) {
      setPasswordFlag(false);
    } else {
      setPasswordFlag(true);
    }
  };
  const onClick=(event)=>
  {
    event.preventDefault();
        usernamerequired(username);
        passwordrequired(password);
  }

  return (
    <Grid>
      <Paper className="LoginpaperStyle">
        <Grid align="center">
          <Avatar className="LoginavatarStyle">
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN IN</h2>
        </Grid>
        {usernameFlag ? (
          <TextField
            className="LoginspacingStyle"
            label="Username"
            placeholder="Enter Username"
            fullWidth
            variant="outlined"
            onChange={onChangeUsername}
            required
          ></TextField>
        ) : (
          <TextField
            className="LoginspacingStyle"
            error
            id="filled-error-helper-text"
            label="Username"
            placeholder="Enter Username"
            helperText="Username Required"
            fullWidth
            variant="outlined"
            onChange={onChangeUsername}
            required
          ></TextField>
        )}
        {passwordFlag ? (
          <TextField
            label="Password"
            className="LoginspacingStyle"
            fullWidth
            type="password"
            variant="outlined"
            onChange={onChangePassword}
            required
          ></TextField>
        ) : (
          <TextField
            label="Password"
            error
            id="filled-error-helper-text"
            className="LoginspacingStyle"
            fullWidth
            type="password"
            variant="outlined"
            helperText="Password Required"
            onChange={onChangePassword}
            required
          ></TextField>
        )}

        <Button
          className="LoginspacingStyle"
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          onClick={onClick}
        >
          SIGN IN
        </Button>

        <Typography className="LoginspacingStyle" align="center">
          or
        </Typography>
        <GLogin />
        <Typography className="newaccountStyle">
          Don't have an account yet?
          <Link to="#" onClick={() => handleChange("event", 1)}>
            {" "}
            SIGN UP
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
