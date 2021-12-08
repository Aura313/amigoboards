import React from 'react';
import AppTable from '../../components/UserStories/AppTable.js';
import AppBox from '../../components/UserStories/AppBox.js';
import Typography from '@material-ui/core/Typography';
import './UserStories.scss';
import axios from "../../middleware/axios";
import { AddBox } from '@material-ui/icons/';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box, Chip, Container, Divider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Config from '../../Configuration/Config.json'
import { Link as RouterLink } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AuthService from '../../Services/AuthenticationService';


export class UserStories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userStories: [],
            reporter: "",
            description: "",
            title: "",
            assignee: {},
            createdDate: "",
            updatedAt: "",
            status: "To do",
            labels: "",
            project: {},
            searchBars: false,
            users: [],
            projects: []
        }
    }



    createUserStory() {
        this.props.createHandler();
    }

    createReporter(x) {
        this.setState({ reporter: x.target.value });
    }

    createDescription(y) {
        this.setState({ description: y.target.value });
    }

    createTitle(y) {
        this.setState({ title: y.target.value });
    }

    createAssignee(evt, value) {
        console.log(value, "djwjdow");
        this.setState({ assignee: value });
    }

    createProject(evt, value) {
        this.setState({ project: value })
    }

    createStatus(z) {
        this.setState({ status: z });
    }

    createLabels(e, z) {
        //     //console.log(z.title,"hggv")
        this.setState({ labels: z.title });
        // this.setState({ labels: z.target.value });
    }



    createNewForm() {

        this.setState({ searchBars: this.state.searchBars ? false : true });
    }


    createNewUserStory() {
        const newItem = {
            "reporter": this.state.reporter, "description": this.state.description, "title": this.state.title,
            "assignee": this.state.assignee, "status": this.state.status, "labels": this.state.labels, "projectName": this.state.project.title, "projectID": this.state.project.id
        };

        console.log(newItem, "fwehfoheowehf")
        this.props.createitem(newItem);
    }

    deleteHandler(x) {
        axios.delete(`${Config.userStories_url}/${x._id}`)
            .then((res) => this.fetchWorkItems())
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    fetchWorkItems() {
        axios.get(Config.userStories_url)
            .then(response => {
                this.setState({
                    userStories: response.data
                })
            })

            .catch(error => {
                console.log(error)
            })
    }

    fetchUsers() {
        axios.get(Config.users_url).then((res) => {
            this.setState({ users: res.data });
        });
    };

    fetchProjects() {
        axios.get(Config.projects_url).then((res) => {
            this.setState({ projects: res.data });
        });
    };

    fetchMyWorkItems() {
        axios
          .post(`${Config.userStories_url}/username`, {
            username: AuthService.getCurrentUser().userName,
          })
          .then((res) => {
              console.log(res.data, "sksk")
            this.setState({
              userStories: res.data,
            });
          });
      }
    
    componentDidMount() {
        this.fetchUsers();
        this.fetchWorkItems();
        this.fetchProjects();
    }

    render() {
        const { userStories, users, projects } = this.state
        return (

            <body className="backgroundColor">
                <Typography className='proj-heading' variant='subtitle1'>
                    Below is a collection of all the Work Items for your reference -
                </Typography>
                <Divider />
                <div className="heading"><b>Work Items</b></div>

                <span onClick={this.fetchMyWorkItems.bind(this)}>
                    {/* <Typography variant='p' component={RouterLink} to='/workItems/new-workItem'><Button startIcon={<AddBox />} variant="outlined" color="primary">
                        New Work Item
                    </Button></Typography> */}

                    <Typography variant='p'><Button startIcon={<AddBox />} variant="outlined" color="primary">
                       My Work Items
                    </Button></Typography>
                </span>

                <span onClick={this.fetchWorkItems.bind(this)}>
                    {/* <Typography variant='p' component={RouterLink} to='/workItems/new-workItem'><Button startIcon={<AddBox />} variant="outlined" color="primary">
                        New Work Item
                    </Button></Typography> */}

                    <Typography variant='p'><Button startIcon={<AddBox />} variant="outlined" color="primary">
                       All Work Items
                    </Button></Typography>
                </span>
                <span className="create" onClick={this.createNewForm.bind(this)}>
                    
                    <Typography variant='p'><Button startIcon={<AddBox />} variant="outlined" color="primary">
                        New Work Item
                    </Button></Typography>
                </span>
                {this.state.searchBars ? (<div className="container">
                    <fieldset className="inputField">
                        <form className="formBackground">
                            <h4>Add New User Story</h4>
                            <input placeholder="Reporter" className="textBox" type="text" name="reporter" value={this.state.reporter} onChange={this.createReporter.bind(this)}></input><br />
                            <input placeholder="Description" className="textBox" type="text" name="description" value={this.state.description} onChange={this.createDescription.bind(this)}></input><br />
                            <input placeholder="Title" className="textBox" type="text" name="title" value={this.state.title} onChange={this.createTitle.bind(this)}></input><br />
                            <label>
                                <AppBox createStatus={this.createStatus.bind(this)} /></label>
                            <Autocomplete
                                multiple
                                id="combo-box-demo"
                                options={users}
                                getOptionLabel={(option) => option.userName}
                                style={{ width: 300 }}
                                onChange={this.createAssignee.bind(this)}
                                renderInput={(params) => <TextField {...params} label="Member" variant="outlined" />}
                            />
                            <Autocomplete
                                id="combo-box-demo"
                                options={projects}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 300 }}
                                onChange={this.createProject.bind(this)}
                                renderInput={(params) => <TextField {...params} label="Project" variant="outlined" />}
                            />
                            <Autocomplete
                                id="combo-box-demo"
                                options={labels}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 300 }}
                                onChange={this.createLabels.bind(this)}
                                renderInput={(params) => <TextField {...params} label="Label" variant="outlined" />}
                            />
                            <Button

                                variant='outlined'
                                color='primary'
                                onClick={this.createNewUserStory.bind(this)}
                            >
                                Invite
                            </Button>
                            {/* <button className="submit" type="submit" onClick={this.createNewUserStory.bind(this)}> Submit </button> */}
                        </form></fieldset>
                </div>) : <div></div>}
                <Container><AppTable userStories={userStories} deleteHandler={this.deleteHandler.bind(this)} /></Container>
                <Typography className='proj-heading' variant='subtitle1'>
                    To find list of your Work Items, please click here -
                 </Typography>
                 <Divider />
            </body>
        )
    }

}

const labels = [
    { title: 'Issue' },
    { title: 'Task' },
    { title: 'Epic' },
];

const status = [
    { title: 'To do'},
    { title: 'In Progress'},
    { title: 'Completed'},
];