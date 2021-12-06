import React from 'react';
import AppTable from '../../components/UserStories/AppTable.js';
import AppBox from '../../components/UserStories/AppBox.js';
import Typography from '@material-ui/core/Typography';
import './UserStories.scss';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



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

    createLabels(z) {
        this.setState({ labels: z.target.value });
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
        axios.get('http://localhost:7000/userStories')
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
            <body>
                <Typography variant='h5' className="heading"><b>Work Items</b></Typography>
                <span className="create" onClick={this.createNewForm.bind(this)}>
                    <Typography variant='p'>+ New Work Item</Typography>
                </span>
                {this.state.searchBars ? (<div className="inputField" className="box">
                    <label>Reporter:</label>
                    <input className="textBox" type="text" name="reporter" value={this.state.reporter} onChange={this.createReporter.bind(this)}></input><br />
                    <label> Description: </label>
                    <input className="textBox" type="text" name="description" value={this.state.description} onChange={this.createDescription.bind(this)}></input><br />
                    <label> Title:</label>
                    <input className="textBox" type="text" name="title" value={this.state.title} onChange={this.createTitle.bind(this)}></input><br />
                    <label>Assignee:</label>
                    <input className="textBox" type="text" name="assignee" value={this.state.assignee} onChange={this.createAssignee.bind(this)}></input><br />
                    <label>Status: <AppBox createStatus={this.createStatus.bind(this)} /></label>
                    <label>Labels:</label>
                    <input className="textBox" type="text" name="labels" value={this.state.labels} onChange={this.createLabels.bind(this)}></input><br />
                    <button className="submit" onClick={this.createNewUserStory.bind(this)}> Submit </button>
                </div>) : <div></div>}
                <AppTable userStories={userStories} />
            </body>
        )
    }
}

