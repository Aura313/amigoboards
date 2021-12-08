import React from "react";
import "./Footer.scss";
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Box, Grid, Container, Link } from "@material-ui/core";


function Footer() {
    return (
        <footer>
            <Box className="fontStyle" bgcolor="primary.main" color="white" px={{ sm: 10 }} py={{ sm: 5 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}><b>
                                ABOUT</b>
                            </Box>
                            <Box>
                                <p className="justifyText">  <i>AMIGOS</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>
                                <b>Explore Amigos</b>
                            </Box>
                            <Box>
                                <ul className="footerLink">
                                    <li><Link href='/home' color="inherit"> Home </Link></li>
                                    <li><Link href='/projects' color="inherit"> Projects </Link></li>
                                    <li><Link href='/workItems' color="inherit"> Work Items </Link></li>
                                    <li><Link href='/boards' color="inherit"> Boards </Link></li>
                                </ul>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>
                              <b>  Team Members </b>
                            </Box>
                            <Box>
                                <ul className="footerLink">
                                    <li>Roopa Subramanian</li>
                                    <li>Sravya</li>
                                    <li>Tanya Shah</li>
                                    <li>Vyshnavi Kotha</li>
                                </ul>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ sm: 5 }} pb={{ sm: 0 }}>
                    <p className="copyright-text"><b>Final Project - Amigo Boards &copy; 2021 </b></p>
                        <TwitterIcon />
                        <FacebookIcon />
                        <InstagramIcon />
                        <LinkedInIcon />
                        <YouTubeIcon />
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer;