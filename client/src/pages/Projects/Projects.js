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
      const response = await axios.get(Config.projects_url).catch((err) => {
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
    <div >
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <div className='heading'>
        <b>{appState.user.user.userName}</b>
      </div>
      <span className='create' onClick={handleNewProject}>
        <Typography variant='p'>
          <Button startIcon={<AddBox />} variant='outlined' color='primary'>
            New Project
          </Button>
        </Typography>
      </span>
      <ComboBox projects={projects || []} />

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
