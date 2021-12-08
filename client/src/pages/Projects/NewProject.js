import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import NewProjectForm from '../../components/Projects/Form';

import Config from '../../Configuration/Config.json';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../Services/AuthenticationService';
import { getUser } from '../../store/Actions/user.actions';

export const NewProject = () => {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const setUserDetails = () => {
    dispatch(getUser(AuthService.getCurrentUser() || []));
  };

  const navigate = useNavigate();
  useEffect(() => {
    setUserDetails();
  }, []);

  const {
    user: { user },
  } = appState;

  const handleNewProject = () => {
    navigate(`/projects`);
  };

  return (
    <div className='backgroundColor'>
      <Paper className='paper' elevation={1}>
        <Typography color='textSecondary'>Owner: {user.userName}</Typography>
        <NewProjectForm owner={user._id} ownerName={user.userName} />
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={handleNewProject}
          variant='outlined'
          color='primary'
        >
          View Projects
        </Button>
      </Paper>
    </div>
  );
};
