import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json'
import AppBox from '../../components/UserStories/AppBox.js';
import Button from '@material-ui/core/Button';
import './UserStories.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../../components/Projects/Dropdown'
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(4),
    },
  },
}));


export default function UserStoryDetails() {

  const classes = useStyles();
  const params = useParams();
  const [memberList, setMembers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [repoterVal, setReporterVal] = useState('');
  const [descriptionVal, setDescriptionVal] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [assigneeVal, setAssigneeVal] = useState([])
  // const [statusVal, setStatusVal] = useState('')
  // const [createdDateVal, setCreatedDate] = useState('')
  // const [updatedDateVal, setUpdatedDate] = useState('')
  const [users, setUsers] = React.useState({});
  const [currentProject, setCurrentProject] = React.useState({});
  const [initialAssignee, setInitialAssignee] = React.useState([]);
  const [initialProj, setInitialProj] = React.useState([]);
  const [projectName, setProjectName] = useState('')
  const [currentLabel, setLabels] = React.useState({});
  const [currentStatus, setStatusVal] = React.useState({});


  const fetchWorkItems = async () => {
    axios.get(`${Config.userStories_url}/${params.id}`)
      .then((response) => {
        setReporterVal(response.data.reporter)
        setDescriptionVal(response.data.description)
        setTitleVal(response.data.title)
        setInitialAssignee(response.data.assignee)
        setProjectName(response.data.projectName)
        setInitialProj(allProjects.filter(i => i._id === response.data.projectID))
        setLabels(response.data.labels)
        setStatusVal(response.data.status)
      }

      );
  }


  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await axios
        .get(Config.projects_url)
        .then((res) => setAllProjects(res.data));
    };
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


  const handleReporteChange = (event) => {
    setReporterVal(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescriptionVal(event.target.value)
  };

  const handleTitleChange = (event) => {
    setTitleVal(event.target.value)
  }

  const handleAssigneeChange = (event) => {
    setAssigneeVal(event.target.value)
  }

  const handleStatusChange = (event, value) => {
    setStatusVal(value)
  }

  const handleUserNameChange = (value) => {
    console.log(value, "handleUserNameChange")
    setUsers(value);
  };

  const handleProjectChange = (event, value) => {
    setCurrentProject(value);
  };

  const handleLabelChange = (event, value) => {
    setLabels(value.title);
  };

  useEffect(() => {
    fetchWorkItems()
  }, [])

  const editUserStory = async () => {
    console.log(users, "assigneeVal")
    let formData = {
      reporter: repoterVal,
      description: descriptionVal,
      title: titleVal,
      assignee: users,
      labels: currentLabel,
      projectName: currentProject.title,
      projectID: currentProject._id,
      statusses: currentStatus
    };

    await axios
      .put(`${Config.userStories_url}/${params.id}`, formData)
      .then((res) => {
      });
  };

  return (
    <div className='centerAlign'>
      <div className='inputContainer'>
        <form className={classes.root} noValidate autoComplete="off">
          <div style={{}}>
            <TextField
              id="filled-basic"
              placeholder='Enter Reporter'
              variant='outlined'
              style={{ width: '90%' }}
              onChange={handleReporteChange}
              label='Reporter'
              disabled={true}
              value={repoterVal} /><br /><br /><br />
            {/* {initialAssignee.length > 0 && <Dropdown align='center'
            handleMembers={handleUserNameChange}
            value={repoterVal}
            disabled=  { true }/>} <br/><br/><br/> */}
            <TextField
              placeholder='Enter Description'
              id="filled-basic"
              label="Description"
              variant='outlined'
              style={{ width: '90%' }}
              onChange={handleDescriptionChange}
              value={descriptionVal} /><br /><br /><br />
            <TextField
              placeholder='Enter Title'
              id="filled-basic"
              label="Title"
              variant='outlined'
              style={{ width: '90%' }}
              onChange={handleTitleChange}
              value={titleVal} /><br /><br /><br />
          </div>
          {/* <AppBox label="Status" onChange={handleStatusChange} value={statusVal} /> */}
          <div style={{ paddingLeft: '10px' }}>
            Current project : <b>{projectName}</b>
            <br />
            To change the project,Select from below list
          </div>
          {currentStatus ? <Autocomplete
            id="combo-box-demo"
            options={statusses}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            onChange={handleStatusChange}
            defaultValue={{ title: currentStatus != '' ? currentStatus : 'N/A' }}
            renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
          /> : null}
          <Autocomplete
            id="combo-box-demo"
            options={labels}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            onChange={handleLabelChange}

            renderInput={(params) => <TextField {...params} label="Label" variant="outlined" />}
          />

          <Autocomplete
            id='combo-box-demo'
            options={allProjects}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            onChange={handleProjectChange}
            renderInput={(params) => (
              <TextField {...params} label='Project' variant='outlined' />
            )}
          />

          {initialAssignee.length > 0 && <Dropdown align='center'
            handleMembers={handleUserNameChange}
            members={memberList}
            selectedMembers={initialAssignee} />}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className="buttonAlign"
              variant='contained'
              color='primary'
              component= {RouterLink} to= {`/workItems`}
              onClick={editUserStory} >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labels = [
  { title: 'Issue' },
  { title: 'Task' },
  { title: 'Epic' },
];

const statusses = [
  { title: 'To do' },
  { title: 'In Progress' },
  { title: 'Completed' },
];

