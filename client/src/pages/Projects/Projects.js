import React, { useEffect } from 'react';
import AppCard from '../../components/Projects/AppCard';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/Actions/projects.actions';
import Config from '../../Configuration/Config.json';
import { ActionTypes } from '../../store/types';

export const Projects = () => {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    const response = await axios.get(Config.projects_url).catch((err) => {
      dispatch({
        type: ActionTypes.PROJECTS_ERROR,
        payload: err,
      });
      console.log('Err', err);
    });
    dispatch(getProjects(response && response.data || []));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const projects = appState && appState.allProjects && appState.allProjects.projects || [];

  return (
    <div>
      <Paper className='paper' elevation={3}>
        <Typography color='textSecondary'>Owner: Tanya</Typography>
      </Paper>
      <div className='container'>
        <AppCard projects={projects} />
      </div>
    </div>
  );
};
