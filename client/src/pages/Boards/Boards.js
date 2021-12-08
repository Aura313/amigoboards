import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TodoPaper from "./TodoPaper";
import DoingPaper from "./InProgressPaper";
import DonePaper from "./CompletedPaper";
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(1),
            width: theme.spacing(50),
            height: theme.spacing(100),
            backgroundColor: "#f4f4f4"
        }
    },
    iconStyle: {
        display:'flex'
    }

}));

    /**
     * 
     * Material UI Implementation of Paper
     */

export default function SimplePaper() {
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [statusItems, setStatusItems] = useState([]);
    const [currentProject, setCurrentProject] = useState({});

    /**
     * 
     * Project Change Handler
     */

    const handleProjectChange = async (e, val) => {
        setCurrentProject(val);
        fetchStatusDetails(val._id);

    };

    /**
     * 
     * Function to fetch the Status Details
     */

    const fetchStatusDetails = async (id) => {
        let bodyData = {
            projectID: id
        }
        await axios
            .post(`${Config.userStories_url}/status`, bodyData)
            .then((res) => {
                setStatusItems(res.data)
            });
    }

    /**
     * 
     * Function to fetch the Projects
     */
    useEffect(() => {
        const fetchProjects = async () => {
            await axios.get(Config.projects_url).then(response => setProjects(response.data))
        };
        fetchProjects();
    }, []);


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-evenly", paddingTop:30,paddingBottom:30 }}>

    {/* 
     * 
     * Autocomplete textBoxes
     */}
                <Autocomplete
                    id="combo-box-demo"
                    options={projects}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    disableClearable={true}
                    onChange={handleProjectChange}
                    renderInput={(params) => <TextField {...params} label="Choose Project" variant="outlined" />}
                />
                <div className={classes.iconStyle}>
                    <DeveloperBoardIcon></DeveloperBoardIcon>
                    <Typography style={{display:"flex"}} color="textPrimary">
                        PROJECT : {currentProject.title}
                    </Typography>
                </div>
            </div>
            <div className={classes.root}>
                <Paper elevation={3} >
                    <Typography color="textPrimary" align="center">
                        Todo
                    </Typography>
                    {statusItems && statusItems.todo && statusItems.todo.map((item, index) => <TodoPaper item={item ? item : {}} key={index} fetchStatusDetails={fetchStatusDetails} />)}
                </Paper>
                <Paper elevation={3} >
                    <Typography color="textPrimary" align="center">
                        In Progress
                    </Typography>
                    {statusItems.inProgress && statusItems.inProgress && statusItems.inProgress.map((item, index) => <DoingPaper item={item ? item : {}} key={index} fetchStatusDetails={fetchStatusDetails} />)}
                </Paper>
                <Paper elevation={3} >
                    <Typography color="textPrimary" align="center">
                        Completed
                    </Typography>
                    {statusItems && statusItems.completed && statusItems.completed.map((item, index) => <DonePaper item={item ? item : {}} key={index} fetchStatusDetails={fetchStatusDetails} />)}
                </Paper>
            </div>
        </div>
    );
}