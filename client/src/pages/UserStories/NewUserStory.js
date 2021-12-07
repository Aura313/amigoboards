import React from 'react';
import AppBox from '../../components/UserStories/AppBox.js';
import Typography from '@material-ui/core/Typography';
import './UserStories.scss';
import axios from "../../middleware/axios";
import { AddBox, DeleteForeverIcon } from '@material-ui/icons/';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box, Chip, Container, Divider } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Config from '../../Configuration/Config.json';
import Autocomplete from '@material-ui/lab/Autocomplete';


export class NewUserSory extends React.Component {
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

    createLabels(z) {
        this.setState({ labels: z.target.value });
    }


    createNewUserStory() {
        const newItem = {
            "reporter": this.state.reporter, "description": this.state.description, "title": this.state.title,
            "assignee": this.state.assignee, "status": this.state.status, "labels": this.state.labels
        };

        console.log(newItem, "wdijwijd")
        // this.props.createitem(newItem);
    }


    xyz() {
        console.log("xyx")
    }



    render() {
        const { userStories } = this.state
        console.log(this.state.reporter, "sdfsdf")

        return (
            <body className="backgroundColor">

                <div className="container">
                    <fieldset className="inputField">
                        <form className="formBackground">
                            <h4>Add New User Story</h4>
                            <input placeholder="Reporter" className="textBox" type="text" name="reporter" value={this.state.reporter} onChange={this.createReporter.bind(this)}></input><br />
                            <input placeholder="Description" className="textBox" type="text" name="description" value={this.state.description} onChange={this.createDescription.bind(this)}></input><br />
                            <input placeholder="Title" className="textBox" type="text" name="title" value={this.state.title} onChange={this.createTitle.bind(this)}></input><br />
                            <input placeholder="Assignee" className="textBox" type="text" name="assignee" value={this.state.assignee} onChange={this.createAssignee.bind(this)}></input><br />
                            {/* <input placeholder="Labels" className="textBox" type="text" name="labels" value={this.state.labels} onChange={this.createLabels.bind(this)}></input><br /> */}
                            <label> <AppBox createStatus={this.createStatus.bind(this)} /></label>
                            <Autocomplete
                                id="combo-box-demo"
                                options={labels}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 300 }}
                                onChange={this.createLabels.bind(this)}
                                renderInput={(params) => <TextField {...params} label="Label" variant="outlined" />}
                            />
                            <button className="submit" onClick={this.xyz.bind(this)}> Submit </button>
                        </form>
                    </fieldset>
                </div>
                {/* <Container><AppTable userStories={userStories} /></Container> */}
            </body>
        )
    }
}


const labels = [
    { title: 'Issue' },
    { title: 'Task' },
    { title: 'Epic' },
];

export default NewUserSory;



