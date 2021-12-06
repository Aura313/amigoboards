import React from 'react';
import AppTable from '../../components/UserStories/AppTable.js';
import AppBox from '../../components/UserStories/AppBox.js';
import Typography from '@material-ui/core/Typography';
import './UserStories.scss';
import Paper from '@material-ui/core/Paper';
import axios from "../../middleware/axios";
import { AddBox, DeleteForeverIcon } from '@material-ui/icons/';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box, Chip, Container, Divider } from '@material-ui/core';
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
            assignee: "",
            createdDate: "",
            lastModifiedDate: "",
            status: "Not Yet Started",
            labels: "",
            searchBars: false
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

    createAssignee(y) {
        this.setState({ assignee: y.target.value });
    }

    createStatus(z) {
        this.setState({ status: z });
    }

    createLabels(e, z) {
        //console.log(z.title,"hggv")
        this.setState({ labels: z.title});
    }

    createNewForm() {
        this.setState({ searchBars: this.state.searchBars ? false : true });
    }


    createNewUserStory(event) {
        const newItem = {
            "reporter": this.state.reporter, "description": this.state.description, "title": this.state.title,
            "assignee": this.state.assignee, "status": this.state.status, "labels": this.state.labels
        };
        this.props.createitem(newItem);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/userStories', 
        {headers: {
            'Authorization':AuthService.authHeader()} })
            .then(response => {
                this.setState({
                    userStories: response.data
                })
            })

            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { userStories } = this.state

        return (
            <body className="backgroundColor">
                <div className="heading"><b>Work Items</b></div>
                <span className="create" onClick={this.createNewForm.bind(this)}>
                    <Typography variant='p'><Button startIcon={<AddBox/>} variant="outlined" color="primary">
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
                            <input placeholder="Assignee" className="textBox" type="text" name="assignee" value={this.state.assignee} onChange={this.createAssignee.bind(this)}></input><br />
                            <input placeholder="Labels" className="textBox" type="text" name="labels" value={this.state.labels} onChange={this.createLabels.bind(this)}></input><br />
                            <label> <AppBox createStatus={this.createStatus.bind(this)} /></label>
                            <Autocomplete
                            id="combo-box-demo"
                            options={labels}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300 }}
                            onChange={this.createLabels.bind(this)}
                            renderInput={(params) => <TextField {...params} label="Label" variant="outlined" />}
                        />
                            <button className="submit" onClick={this.createNewUserStory.bind(this)}> Submit </button></form></fieldset>
                </div>) : <div></div>}
                <Container><AppTable userStories={userStories} /></Container>
            </body>
        )
    }

}

const labels = [
    { title: 'Issue' },
    { title: 'Task' },
    { title: 'Epic' },
];
