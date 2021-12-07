import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json'
import AppBox from '../../components/UserStories/AppBox.js';
import Button from '@material-ui/core/Button';



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

  const [userStory, setUserStory] = useState({

    // reporter: '',
    // description: '',
    // title: '',
    // assignee: '',
    createdDate: '',
    lastModifiedDate: '',
    status: "Not Yet Started",
    labels: '',

  });

  const [repoterVal, setReporterVal] = useState('');
  const [descriptionVal, setDescriptionVal] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [assigneeVal, setAssigneeVal] = useState('')
  // const [title, setReporterVal] = useState('');
  // const [assignee, setReporterVal] = useState('');
  // const [status, setReporterVal] = useState('');
  // const [labels, setReporterVal] = useState('');



  const fetchWorkItems = async () => {
    axios.get(`${Config.userStories_url}/${params.id}`)
      .then((response) => {
        setReporterVal(response.data.reporter)
        setDescriptionVal(response.data.description)
        setTitleVal(response.data.title)
        setAssigneeVal(response.data.assignee)
      }

      );
  }

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

  useEffect(() => {
    fetchWorkItems()
  }, [])

  const editUserStory = async () => {
    let formData = {
      reporter: repoterVal,
      description: descriptionVal,
      title: titleVal,
      assignee: assigneeVal
    };

    await axios
      .put(`${Config.userStories_url}/${params.id}`, formData)
      .then((res) => {
        // props.handleClose();
      });
  };




  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="filled-basic" label="Reporter" variant="filled" onChange={handleReporteChange} value={repoterVal} />
      <TextField id="filled-basic" label="Description" variant="filled" onChange={handleDescriptionChange} value={descriptionVal} />
      <TextField id="filled-basic" label="Title" variant="filled" onChange={handleTitleChange} value={titleVal} />
      <TextField id="filled-basic" label="Assignee" variant="filled" onChange={handleAssigneeChange} value={assigneeVal} />
      {/* <TextField id="filled-basic" label="Labels" variant="filled" value={userStory.labels} /> */}
      <AppBox label="Status" value={userStory.status} />
      <Button size="small" onClick={editUserStory} variant="contained" color="primary">
        UPDATE
      </Button>
    </form>
  );
}

