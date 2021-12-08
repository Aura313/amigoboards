import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AppDrawer from './AppDrawer';
import { Link as RouterLink } from 'react-router-dom';
import { navStyles } from './NavbarStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json';
import AuthService from '../../Services/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  const classes = navStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [value, setValue] = useState(null);
  const [projects, setProjects] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      console.log('loggedin');
      setIsLoggedIn(true);
    } else {
      console.log('not logged in');
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      await axios.get(Config.projects_url).then((res) => {
        setProjects(res.data);
      });
    };
    fetchProjects();
  }, []);

  const defaultProps = {
    options: projects,
    getOptionLabel: (option) => option.title,
  };
  /**
   * Mobile screensize navbar option
   */

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    navigate('/userstats');
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    AuthService.logout();
    navigate('/');
    window.location.reload();
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>
          {isLoggedIn && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
            >
              <AppDrawer />
            </IconButton>
          )}
          <img
            className='logo'
            src='../.././Assets/Amigi Boards Logo.png'
          ></img>
          <Typography
            component={RouterLink}
            to={'/home'}
            className={classes.title}
            variant='h6'
            noWrap
          >
            <h5> AMIGOS! </h5>
          </Typography>
          <div className={classes.search}>
            {isLoggedIn && (
              <div style={{ width: 300 }}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Autocomplete
                  {...defaultProps}
                  classes={{ inputRoot: 'textStyles' }}
                  id='controlled-demo'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    newValue &&
                      navigate(`/projects/${newValue.slug}/${newValue._id}`);
                    window.location.reload();
                  }}
                  renderInput={(params) => (
                    <TextField
                      placeholder='Search Projects...'
                      {...params}
                      label=''
                      className={classes.textStyles}
                      variant='outlined'
                    />
                  )}
                />
              </div>
            )}
          </div>
          <div className={classes.grow} />
          {isLoggedIn && (
            <div className={classes.sectionDesktop}>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          {isLoggedIn && (
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
