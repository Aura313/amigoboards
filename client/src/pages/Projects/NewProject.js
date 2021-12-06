import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import NewProjectForm from '../../components/Projects/Form';

import Config from '../../Configuration/Config.json';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../Services/AuthenticationService';
import { getUser } from '../../store/Actions/user.actions';

export const NewProject = () => {

  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const setUserDetails = () => {
    console.log(AuthService.getCurrentUser(), 'AuthService.getCurrentuser();');
    dispatch(getUser(AuthService.getCurrentUser() || []));

  };



  useEffect(() => {
    setUserDetails();
  }, []);

  const {
    user: {
      user
    },
  } = appState;

  return (
    <body className="backgroundColor">
      <div >
        <Paper className='paper' elevation={3}>
          <Typography color='textSecondary'>Owner: {user.userName}</Typography>
          <NewProjectForm owner={user._id} ownerName={user.userName} />
        </Paper>
      </div>
    </body>
  );
};
