import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TodoPaper from "./TodoPaper";
import DoingPaper from "./DoingPaper";
import DonePaper from "./DonePaper";
import axios from '../../middleware/axios';
import Config from '../../Configuration/Config.json';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(3),
            width: theme.spacing(50),
            height: theme.spacing(100)
        }
    }
}));



export default function SimplePaper() {
    const classes = useStyles();
    const [projects, setProjects] = useState([])
    const [todos, setTodos] = useState([]);

    // const fetchStatusDetails = async () => {
//     await axios
//       .get(`${Config.userStories_url}/${params.id}`)
//       .then((res) => console.log(res.data));
//   };

    useEffect(() => {
        // setOpen(true);
        const fetchProjects = async () => {
           await axios.get(Config.projects_url).then(response => setProjects(response.data))
        };
        fetchProjects();
      }, []);
    
      console.log(projects, "projects")

    return (
        <div className={classes.root}>
            
            <Paper elevation={3}>
                <TodoPaper />
            </Paper>
            <Paper elevation={3} >
                <DoingPaper />
            </Paper>
            <Paper elevation={3} >
                <DonePaper />
            </Paper>
        </div>
    );
}
