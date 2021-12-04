import React, { useState }  from "react";
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
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <Grid>
      <Paper className="LoginpaperStyle">
        <Grid align="center">
          <Avatar className="LoginavatarStyle">
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN IN</h2>
        </Grid>
        <TextField
          className="LoginspacingStyle"
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
          variant="outlined"
          onChange={onChangeUsername}
          
        ></TextField>
        <TextField
          label="Password"
          className="LoginspacingStyle"
          fullWidth
          type="password"
          required
          variant="outlined"
          onChange={onChangePassword}
          
        ></TextField>

        <Button
          className="LoginspacingStyle"
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
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
