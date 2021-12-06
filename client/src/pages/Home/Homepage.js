import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../Services/AuthenticationService';
import { getUser } from '../../store/Actions/user.actions';
import Typography from '@material-ui/core/Typography';

export function Homepage() {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const setUserDetails = () => {
    console.log(AuthService.getCurrentUser(), 'AuthService.getCurrentuser();');
    dispatch(getUser(AuthService.getCurrentUser() || []));
  };

  console.log(appState.user.user.userName, 'djawjdwj');

  useEffect(() => {
    setUserDetails();
  }, []);

  const {
    user: {
      user: { userName },
    },
  } = appState;

  return <Typography variant='h2'> Welcome {userName} </Typography>;
}

export default Homepage;
