import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TodoPaper from "./TodoPaper";
import DoingPaper from "./DoingPaper";
import DonePaper from "./DonePaper";
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(3),
            width: theme.spacing(45),
            height: theme.spacing(100)
        }
    }
}));

export default function SimplePaper() {
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [statusItems, setStatusItems] = useState([]);

    const fetchStatusDetails = async (e, val) => {
        await axios
          .get(`${Config.userStories_url}/${val._id}`)
          .then((res) => setStatusItems(res.data));
    };

    useEffect(() => {
        const fetchProjects = async () => {
            await axios.get(Config.projects_url).then(response => setProjects(response.data))
        };
        fetchProjects();
    }, []);

    return (
        <div className={classes.root}>
            <Autocomplete
                id="combo-box-demo"
                options={projects}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                onChange={fetchStatusDetails}
                renderInput={(params) => <TextField {...params} label="Choose Project" variant="outlined" />}
            />
            <Paper elevation={3}>
                <TodoPaper items={statusItems.todo ? statusItems.todo : []}/>
            </Paper>
            <Paper elevation={3} >
                <DoingPaper items={statusItems.inProgress ? statusItems.inProgress : []}/>
            </Paper>
            <Paper elevation={3} >
                <DonePaper  items={statusItems.completed ? statusItems.completed : []}/>
            </Paper>
        </div>
    );
}