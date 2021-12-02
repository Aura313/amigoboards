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
import "./Registration.scss";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export function Registration({ handleChange }) {
  return (
    <Grid>
      <Paper className="RegistrationpaperStyle">
        <Grid align="center">
          <Avatar className="RegistrationavatarStyle">
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2> SIGN UP</h2>
        </Grid>
        <TextField
          label="EmailID"
          className="RegistrationspacingStyle"
          placeholder="Enter EmailID"
          fullWidth
          required
          variant="outlined"
        ></TextField>
        <TextField
          label="Username"
          className="RegistrationspacingStyle"
          placeholder="Enter Username"
          fullWidth
          required
          variant="outlined"
        ></TextField>
        <TextField
          label="Password"
          className="RegistrationspacingStyle"
          fullWidth
          type="password"
          required
          variant="outlined"
        ></TextField>
        <Button
          className="RegistrationspacingStyle"
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
        >
          SIGN UP
        </Button>

        <Typography className="RegistrationnewaccountStyle">
          Already have an account yet?
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
