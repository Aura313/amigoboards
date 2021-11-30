import React, { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import "./Login.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: " 180px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const spacingStyle = { margin: "10px 0" };
const newaccountStyle = { margin: "20px 0" };

export function Registration() {
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN UP</h2>
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
        <TextField
          label="Confirm Password"
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
          SIGN UP
        </Button>

        <Typography style={newaccountStyle}>
          Already have an account yet?
          <Link href="#"> SIGN IN</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Registration;
