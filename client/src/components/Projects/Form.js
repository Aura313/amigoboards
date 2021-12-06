import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import Config from '../../Configuration/Config.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, Chip, Container, Divider } from '@material-ui/core';
import './Form.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '29.5ch'
    },
  },
}));

export default function NewProjectForm(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();

  const [titleValue, setTitleValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setTitleValue(props.title ? props.title : '');
    setDescValue(props.description ? props.description : '');
    setMembers(props.members ? props.members : []);
  }, []);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescValue(event.target.value);
  };

  const handleMembers = (item) => {
    setMembers(item);
  };

  const handleSubmitProject = async () => {
    let formData = {
      title: titleValue,
      description: descValue,
      members: [members],
      owner: 'Tanya',
    };

    props.updateMode
      ? await axios
        .put(`${Config.projects_url}/${params.slug}/${params.id}`, formData)
        .then((res) => {
          props.handleClose();
        })
        .catch((err) => console.log(err))
      : await axios
        .post(Config.projects_url, formData)
        .then((res) => {
          let projectSlug = res.data.newItem.slug;
          let projectId = res.data.newItem._id;
          console.log(res.data.newItem, 'slksksk');
          navigate(`/projects/${projectSlug}/${projectId}`);
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="centerAlign">
      <div className="inputContainer">
        <form className={classes.root} noValidate autoComplete='off'>
          <h4>Please enter Project Details:</h4>
          <Divider />
          <TextField
            placeholder='Enter Title'
            required
            id='standard-required'
            label='Title'
            defaultValue='Hello World'
            value={titleValue}
            onChange={handleTitleChange}
            variant="outlined"
          />
          <Divider />
          <TextField
            id='standard-multiline-static'
            label='Description'
            multiline
            rows={4}
            defaultValue='Default Value'
            placeholder='Enter Description'
            value={descValue}
            onChange={handleDescChange}
            variant="outlined"
          />
          <Divider />

          <Dropdown align="center" handleMembers={handleMembers} />


        </form>
        <div className='buttonAlign' ><Button variant='contained' color='primary' onClick={handleSubmitProject}>
          Submit
        </Button></div>
      </div>
    </div>
  );
}
