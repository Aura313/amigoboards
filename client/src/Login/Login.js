import React from "react";
import {
  Avatar,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import './Login.scss';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GLogin } from "./GoogleLogin";



const spacingStyle = { margin: "10px 0" };
const newaccountStyle = { margin: "20px 0" };

export function Login({handleChange}) {
  return (
    <Grid>
      <Paper  className="LoginpaperStyle">
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
        ></TextField>
        <TextField
          label="Password"
          className="LoginspacingStyle"
          fullWidth
          type="password"
          required
          variant="outlined"
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
          <Link href="#" onClick={()=>handleChange("event",1)}
          > SIGN UP</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
