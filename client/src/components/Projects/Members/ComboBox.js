/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Config from '../../../Configuration/Config.json';

import axios from '../../../middleware/axios';


/* Display List of users to assign to a project */
export default function ComboBox() {
  const [memberList, setMembers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const fetchAllProjects = async () => {
    await axios
      .get(Config.projects_url)
      .then((res) => setAllProjects(res.data));
  };
  useEffect(() => {
    fetchAllProjects();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      await axios.get(Config.users_url).then((res) => {
        setMembers(res.data);
      });
    };
    fetchUsers();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState({});
  const [currentProject, setCurrentProject] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.location.reload();
    setOpen(false);
  };

  const updateProject = async () => {
    let memArr = [...currentProject.members, ...users];

    let uniqueMembers = [...new Map(memArr.map((v) => [v._id, v])).values()];
    let formData = {
      title: currentProject.title,
      description: currentProject.description,
      members: uniqueMembers.map((i) => {
        let obj = {
          _id: i._id,
          emailId: i.emailId,
          userName: i.userName,
        };
        return obj;
      }),
    };

    await axios
      .put(
        `${Config.projects_url}/${currentProject.slug}/${currentProject.id}`,
        formData
      )
      .then((res) => handleClose())
      .catch((err) => console.log(err));
  };

  const handleUserNameChange = (event, value) => {
    setUsers(value);
  };

  const handleProjectChange = (event, value) => {
    setCurrentProject(value);
  };

  return (
    <div>
      <div>
        <Button
          startIcon={<GroupAddIcon />}
          variant='outlined'
          color='primary'
          onClick={handleClickOpen}
        >
          Invite
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='dialog-title'
        >
          <DialogTitle id='dialog-title'>INVITE</DialogTitle>
          <DialogContent>
            <DialogContentText>Invite members to projects</DialogContentText>
            <DialogContentText>Select User</DialogContentText>
            <Autocomplete
              multiple
              id='combo-box-demo'
              options={memberList}
              getOptionLabel={(option) => option.userName}
              style={{ width: 300 }}
              filterSelectedOptions
              onChange={handleUserNameChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select Users'
                  variant='outlined'
                />
              )}
            />
            <br/>
            <DialogContentText>Select Project</DialogContentText>
            <Autocomplete
              id='combo-box-demo'
              options={allProjects}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              onChange={handleProjectChange}
              renderInput={(params) => (
                <TextField {...params} label='Select Projects' variant='outlined' />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={updateProject} color='primary'>
              ADD
            </Button>
            <Button onClick={handleClose} color='secondary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
