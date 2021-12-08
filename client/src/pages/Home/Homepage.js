import Container from "@material-ui/core/Container";
import "./Homepage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../Services/AuthenticationService";
import { getUser } from "../../store/Actions/user.actions";

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
      <Container align="center">
        <div className="mainStyle" >{AuthService.getCurrentUser() ? `Hola ${userName}, it's us !` : 'Hola!' }</div>
        <div className="fontStyle">
          One Stop for all your projects and team collaborations
        </div>
        <img className="banner" src="Assets/Amigi Boards Logo.png"></img>
      </Container>
    </div>
  );
}

export default Homepage;
