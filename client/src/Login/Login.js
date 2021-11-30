import React from "react";
import { Avatar, Button, Link, Paper, TextField, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import "./Login.css";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 280,
  margin: " 1px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const spacingStyle = { margin: "8px 0" };

export class Login extends React.Component {
  render() {
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
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
          <Button style={spacingStyle} type='submit' color='primary' fullWidth variant='contained'>SIGN IN</Button>
          <Typography style={spacingStyle}> Don't have an account yet?
              <Link href='#'>
                  SIGN UP
              </Link>
          </Typography>
        </Paper>
      </Grid>
    );
  }
}
