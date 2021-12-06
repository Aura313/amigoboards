import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import NewProjectForm from '../../components/Projects/Form';

import Config from '../../Configuration/Config.json';

import { useParams } from 'react-router-dom';

export const NewProject = () => {
  return (
    <body className="backgroundColor"> 
    <div >
      <Paper className='paper' elevation={3}>
        <Typography color='textSecondary'>Owner: qdhiw</Typography>
      </Paper>
      <NewProjectForm />
    </div></body>
  );
};
