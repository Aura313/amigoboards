import React, { useEffect, useState } from 'react';
import AppCard from '../../components/Projects/AppCard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/Actions/projects.actions';
import Config from '../../Configuration/Config.json';
import { ActionTypes } from '../../store/types';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleNewProject = () => {
    navigate(`/projects/new-project`);
  }
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
      }, 2000);
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
      <div className='container'>
        <Typography variant='h5'>Username</Typography>
        <div  className='wrapper' onClick={handleNewProject}>
          <Typography component='p'>New Project</Typography>
          <AddIcon />
        </div>
      </div>
      <div className='container'>
        {projects &&
          projects.map((project, idx) => (
            <AppCard project={project} key={idx} idx={idx} />
          ))}
      </div>
    </div>
  );
};
