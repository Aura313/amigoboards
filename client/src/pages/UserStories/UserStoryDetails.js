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



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      padding: '40px'
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
          <TextField
            id="filled-basic"
            placeholder='Enter Reporter'
            variant='outlined'
            onChange={handleReporteChange}
            label='Reporter'
            value={repoterVal} />
          {/* {initialAssignee.length > 0 && <Dropdown align='center'
            handleMembers={handleUserNameChange}
            value={repoterVal}
            selectedMembers={initialAssignee} />} */}
          <TextField
            placeholder='Enter Description'
            id="filled-basic"
            label="Description"
            variant='outlined'
            onChange={handleDescriptionChange}
            value={descriptionVal} />
          <TextField
            placeholder='Enter Title'
            id="filled-basic"
            label="Title"
            variant='outlined'
            onChange={handleTitleChange}
            value={titleVal} />
          {/* <AppBox label="Status" onChange={handleStatusChange} value={statusVal} /> */}

          Current project : {projectName}
          <br />
          To change the project , select from below list
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
          <Button
            className="buttonAlign"
            variant='contained'
            color='primary'
            onClick={editUserStory} >
            Submit
          </Button>
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

