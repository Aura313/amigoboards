import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Config from '../../Configuration/Config.json';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import ProjectForm from '../../components/Projects/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../Services/AuthenticationService';
import { getUser } from '../../store/Actions/user.actions';
import Members from '../../components/Projects/Members/Members';


export const ProjectDetails = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    members: [],
    owner: '',
  });

  const [editable, setEditable] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

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
    user: { user },
  } = appState;

  const handleEditProject = () => {
    setEditable(true);
  };

  const fetchProjectDetails = async () => {
    await axios
      .get(`${Config.projects_url}/${params.slug}/${params.id}`)
      .then((res) => setProject(res.data));
  };
  const handleClose = () => {
    setEditable(false);
    fetchProjectDetails();
  };

  const handleDeleteProject = async () => {
    await axios
      .delete(`${Config.projects_url}/${params.slug}/${params.id}`)
      .then((res) => navigate('/projects'));
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);
  return (
    <div>
      <Paper className='paper' elevation={3}>
        <Typography color='textSecondary'>
          Owner: {project.ownerName}
        </Typography>
        {!editable ? (
          <div>
            <Button onClick={handleEditProject}>
              <EditIcon />
            </Button>

            <Button onClick={handleDeleteProject}>
              <DeleteIcon />
            </Button>

            <Typography component='p'>{project.title} </Typography>
            <Typography component='p'>{project.description} </Typography>
            <Members members={project.members} />
            
          </div>
        ) : (
          <div>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
            <ProjectForm
              title={project.title}
              description={project.description}
              selectedMembers={project.members}
              owner={project.owner}
              ownerName={project.ownerName}
              updateMode={true}
              handleClose={handleClose}
            />
          </div>
        )}
      </Paper>
    </div>
  );
};
