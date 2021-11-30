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
import "./Login.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GLogin } from "./GoogleLogin";

const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
  };
const avatarStyle = { backgroundColor: "#1bbd7e" };
const spacingStyle = { margin: "10px 0" };
const newaccountStyle = { margin: "20px 0" };

export function Login({handleChange}) {
  return (
    <Grid>
      <Paper  style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN IN</h2>
        </Grid>
        <TextField
          label="Username"
          style={spacingStyle}
          placeholder="Enter Username"
          fullWidth
          required
          variant="outlined"
        ></TextField>
        <TextField
          label="Password"
          style={spacingStyle}
          fullWidth
          type="password"
          required
          variant="outlined"
        ></TextField>

        <Button
          style={spacingStyle}
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
        >
          SIGN IN
        </Button>

        <Typography style={spacingStyle} align="center">
          or
        </Typography>
        <GLogin />
        <Typography style={newaccountStyle}>
          Don't have an account yet?
          <Link href="#" onClick={()=>handleChange("event",1)}
          > SIGN UP</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
