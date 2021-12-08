import React, { useEffect, useState } from 'react';
import AppCard from '../../components/Projects/AppCard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import axios from '../../middleware/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/Actions/projects.actions';
import Config from '../../Configuration/Config.json';
import { ActionTypes } from '../../store/types';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AddBox, DeleteForeverIcon } from '@material-ui/icons/';
import AuthService from '../../Services/AuthenticationService';
import { getUser } from '../../store/Actions/user.actions';

import ComboBox from '../../components/Projects/Members/ComboBox';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Projects = () => {
  const classes = useStyles();
  const appState = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setUserDetails = () => {
    dispatch(getUser(AuthService.getCurrentUser() || []));
  };

  useEffect(() => {
    setUserDetails();
  }, []);

  const handleNewProject = () => {
    navigate(`/projects/new-project`);
  };
  useEffect(() => {
    setOpen(true);

    const fetchProjects = async () => {
      const response = await axios
        .post(
          `${Config.projects_url}/${AuthService.getCurrentUser().userName}`,
          {
            userId: AuthService.getCurrentUser()._id,
          }
        )
        .catch((err) => {
          dispatch({
            type: ActionTypes.PROJECTS_ERROR,
            payload: err,
          });
          console.log('Err', err);
        });
      dispatch(getProjects((response && response.data) || []));

      setTimeout(() => {
        setOpen(false);
      }, 500);
    };
    fetchProjects();
  }, []);

  const projects =
    (appState && appState.allProjects && appState.allProjects.projects) || [];

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Typography className='proj-heading' variant='h4'>
        Hi&nbsp;<b>{appState.user.user.userName},</b>
      </Typography>
      <Typography className='proj-heading' variant='subtitle1'>
        Here are the list of all projects you're a part of.Explore AMIGOSBoards
        and enjoy a hassle free project management experience. Add and Invite
        members to collaborate with! Happy Working!
      </Typography>
      <Divider />
      <br />

      <div className='create'>
        <ComboBox />
        <Button
          startIcon={<AddBox />}
          onClick={handleNewProject}
          variant='outlined'
          color='primary'
        >
          New Project
        </Button>
      </div>

      <div className='project-container'>
        {projects &&
          projects.map((project, idx) => (
            <div className='card-right' key={idx}>
              <AppCard project={project} idx={idx} />
            </div>
          ))}
      </div>
    </div>
  );
};
