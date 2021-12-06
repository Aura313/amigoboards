import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles'
import { mergeClasses } from "@material-ui/styles";
import './Homepage.scss';


export function Homepage() {


    return(
    <div className="bgHome"> 
        <Container align="center">
            <div className="mainStyle">Hola AMIGO, it's us !</div>
            <div className="fontStyle">One Stop for all your projects and team collaborations</div>
        <img className="banner" src="Assets/Amigi Boards Logo.png"></img></Container>
        </div>
    );
}

export default Homepage;