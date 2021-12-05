import React, { useEffect } from 'react';
import AppCard from '../../components/Projects/AppCard';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/Actions/projects.actions';
import Config from '../../Configuration/Config.json';
import { ActionTypes } from '../../store/types';

export const Projects = () => {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(Config.projects_url).catch((err) => {
        dispatch({
          type: ActionTypes.PROJECTS_ERROR,
          payload: err,
        });
        console.log('Err', err);
      });
      dispatch(getProjects((response && response.data) || []));
    };
    fetchProjects();
  }, []);

  const projects =
    (appState && appState.allProjects && appState.allProjects.projects) || [];

  return (
    <div>
      <Typography variant='h5' sx={{ colr: 'red' }}>
        Tanya
      </Typography>
      <div className='container'>
        {projects &&
          projects.map((project, idx) => (
            <AppCard project={project} key={idx} idx={idx} />
          ))}
      </div>
    </div>
  );
};
