import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown';
import Config from '../../Configuration/Config.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function NewProjectForm(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  

  const [titleValue, setTitleValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [ownerValue, setOwnerValue] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      await axios.get(Config.users_url).then((res) => {
        console.log(res.data, 'slslsl');
        setMembers(res.data);
      });
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setTitleValue(props.title ? props.title : '');
    setDescValue(props.description ? props.description : '');
    setMembers(props.members ? props.members : []);
    setOwnerValue(props.owner ? props.owner : '');
    setSelectedMembers(props.selectedMembers ? props.selectedMembers : '')
    
  }, []);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescValue(event.target.value);
  };

  const handleMembers = (item) => {
    setSelectedMembers(item);
  };

  const handleSubmitProject = async () => {
    let formData = {
      title: titleValue,
      description: descValue,
      members: selectedMembers.map((i) => {
        let obj = {
          _id: i._id,
          emailId: i.emailId,
          userName: i.userName,
        };
        return obj;
      }),
      owner: props.updateMode ?  props.owner : ownerValue,
      ownerName: props.ownerName
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
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        required
        id='standard-required'
        label='Title'
        defaultValue='Hello World'
        value={titleValue}
        onChange={handleTitleChange}
      />
      <TextField
        id='standard-multiline-static'
        label='Description'
        multiline
        rows={4}
        defaultValue='Default Value'
        placeholder='Placeholder'
        value={descValue}
        onChange={handleDescChange}
      />
      <Dropdown handleMembers={handleMembers} members={members} selectedMembers={props.selectedMembers} />

      <Button variant='contained' color='primary' onClick={handleSubmitProject}>
        Submit
      </Button>
    </form>
  );
}
