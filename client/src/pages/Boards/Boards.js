import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TodoPaper from "./TodoPaper";
import DoingPaper from "./DoingPaper";
import DonePaper from "./DonePaper";

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
