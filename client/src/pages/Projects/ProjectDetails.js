import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import Config from '../../Configuration/Config.json';

import { useParams } from 'react-router-dom';

export const ProjectDetails = () => {
  const [project, setProject] = useState({
    project: {},
  });
  const params = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      await axios
        .get(`${Config.projects_url}/${params.slug}/${params.id}`)
        .then((res) => setProject(res.data));
    };
    fetchProjectDetails();
  }, []);

  return (
    project && (
      <div>
        <Paper className='paper' elevation={3}>
          <Typography color='textSecondary'>Owner: {project.owner}</Typography>
        </Paper>
        <div className='container'>{project.description}</div>
      </div>
    )
  );
};
