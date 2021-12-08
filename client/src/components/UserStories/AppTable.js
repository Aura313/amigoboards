import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles({
    root: {
        minWidth: 80,
        maxWidth: 1350,
        width: '100%'
    },
});


export default function AppTable(props) {
    const classes = useStyles();
    const rows = props.userStories.userStories || props.userStories || [];

    const deleteUserStory = (item) => {
        props.deleteHandler(item);
    }

    const getFormattedDate = (dateTime) => {
        const formattedDate = new Date(dateTime);
        return `${formattedDate.toLocaleDateString()} | ${formattedDate.toLocaleTimeString()} `;
      };

    return (
        <TableContainer component={Paper}>
            <Table classReporter={classes.root} aria-label="simple table">
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
                        <TableCell align="centre"><b>Project Name</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell align="centre">{index + 1}</TableCell>
                            <TableCell align="centre">{row.reporter}</TableCell>
                            <TableCell align="centre">{row.description}</TableCell>
                            <TableCell align="centre">{row.title}</TableCell>
                            <TableCell align="centre">{row.assignee.map((i, idx) => {
                                return `${i.userName} ,`
                            })}</TableCell>
                            <TableCell align="centre">{getFormattedDate(row.createdAt)}</TableCell>
                            <TableCell align="centre">{getFormattedDate(row.updatedAt)}</TableCell>
                            <TableCell align="centre">{row.status}</TableCell>
                            <TableCell align="centre">{row.labels}</TableCell>
                            <TableCell align="centre">{row.projectName}</TableCell>
                            <TableCell align="centre" padding='none'>
                            <Button component={RouterLink} to={`/workItems/${row._id}`} >
                                <EditIcon align="right"></EditIcon>
                            </Button>
                            <Button onClick={() => deleteUserStory(row)} >

                                <DeleteForeverIcon align="right" ></DeleteForeverIcon>
                            </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}