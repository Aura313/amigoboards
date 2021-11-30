import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Registration from "../Login/Registration";
import Login from "../Login/Login";


const paperstyle={
    width:336,margin:"18px auto",height:'83vh',padding:3
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const SignInOutContainer = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (

    <Paper elevation={20} style={paperstyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="SIGN IN"></Tab>
        <Tab label="SIGN UP"></Tab>
      </Tabs>
      <TabPanel value={value} index={0}>
    <Login handleChange={handleChange}/>      </TabPanel>
      <TabPanel value={value} index={1}>
        <Registration handleChange={handleChange}/>
      </TabPanel>
    </Paper>
  );
};

export default SignInOutContainer;
