import Container from "@material-ui/core/Container";
import "./Homepage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../Services/AuthenticationService";
import AnalyticService from "../../Services/AnalyticsServices";
import { getUser } from "../../store/Actions/user.actions";

export function Homepage() {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const setUserDetails = () => {
     AnalyticService.getProjectId();
    console.log(AuthService.getCurrentUser(), "AuthService.getCurrentuser();");
    dispatch(getUser(AuthService.getCurrentUser() || []));
  };

  console.log(appState.user.user.userName, "djawjdwj");

  useEffect(() => {
    setUserDetails();
  }, []);

  const {
    user: {
      user: { userName },
    },
  } = appState;

  return (
    <div className="bgHome">
      <Container align="center">
        <div className="mainStyle">Hola {userName}, it's us !</div>
        <div className="fontStyle">
          One Stop for all your projects and team collaborations
        </div>
        <img className="banner" src="Assets/Amigi Boards Logo.png"></img>
      </Container>
    </div>
  );
}

export default Homepage;
