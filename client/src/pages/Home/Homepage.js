import Container from "@material-ui/core/Container";
import "./Homepage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../Services/AuthenticationService";
import AnalyticService from "../../Services/AnalyticsServices";
import { getUser } from "../../store/Actions/user.actions";
import HomeDetails from "./HomeDetails";
import HomeCard from "./HomeCard"

export function Homepage() {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const setUserDetails = () => {
    dispatch(getUser(AuthService.getCurrentUser() || []));
  };

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
      <Container className="alignStyle" align="center" style={{display:"flex"}}>
        <div className="mainStyle" >{AuthService.getCurrentUser() ? `Hola ${userName}, it's us !` : 'Hola!' }
        <div className="fontStyle">
          One Stop for all your projects and team collaborations
        </div>
        </div>
        <img className="banner" src="Assets/Amigi Boards Logo.png"></img>
      </Container>
      <div className="alignmentStyle">
      <HomeDetails className="detailStyles"/>
      <HomeCard className="cardStyles"/>
      </div>
    </div>
  );
}

export default Homepage;
