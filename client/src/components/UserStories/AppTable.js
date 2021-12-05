import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 80,
    },
});

function createData(id, reporter, description, title, assignee, createdDate, lastModifiedDate, status, labels) {
    return { id, reporter, description, title, assignee, createdDate, lastModifiedDate, status, labels };
}

const rows = [
    createData(1, 'Tanya', 'To finish WebD Project', 'Project Management Application', 'Roopa, Shrawya, Vyshnavi', '11/29/2021', '12/3/2021', 'In Progress', 'abj'),
    createData(2, 'Roopa', 'To implement UserStories', 'UserStories', 'Roopa', '11/29/2021', '12/3/2021', 'In Progress', 'abj'),
];

export default function AppTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table classReporter={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="centre"><b>S.No</b></TableCell>
                        <TableCell align="centre"><b>Reporter</b></TableCell>
                        <TableCell align="centre"><b>Description</b></TableCell>
                        <TableCell align="centre"><b>Title</b></TableCell>
                        <TableCell align="centre"><b>Assignees</b></TableCell>
                        <TableCell align="centre"><b>Created Date</b></TableCell>
                        <TableCell align="centre"><b>Last Modified Date</b></TableCell>
                        <TableCell align="centre"><b>Status</b></TableCell>
                        <TableCell align="centre"><b>Labels</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="centre">{row.id}</TableCell>
                            <TableCell align="centre">{row.reporter}</TableCell>
                            <TableCell align="centre">{row.description}</TableCell>
                            <TableCell align="centre">{row.title}</TableCell>
                            <TableCell align="centre">{row.assignee}</TableCell>
                            <TableCell align="centre">{row.createdDate}</TableCell>
                            <TableCell align="centre">{row.lastModifiedDate}</TableCell>
                            <TableCell align="centre">{row.status}</TableCell>
                            <TableCell align="centre">{row.labels}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}