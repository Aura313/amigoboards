/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { deepOrange } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 7px',
        transform: 'scale(0.8)',
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
}));

export default function ComboBox(props) {
    const classes = useStyles();
    const memberList = props.members || [];

    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState({});
    const [project, setProjects] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateProject = () => {
        let update = {
            project: project.project
        }
        axios.put(`http://localhost:7000/members/${users._id}`,  update )
            .then(response => {
                this.setState({ project: response.data.project })
            })
            .catch(error => {
                console.log(error)
            })
    };

    const handleUserNameChange = (event, value) => {
        setUsers(value)
    }

    const handleProjectChange = (event, value) => {
        setProjects(value)
    }

    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<GroupAddIcon />}
                    onClick={handleClickOpen}
                >
                    Invite
                </Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
                    <DialogTitle id="dialog-title">INVITE</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Invite members to projects</DialogContentText>
                        <DialogContentText>Users</DialogContentText>
                        <Autocomplete
                            id="combo-box-demo"
                            options={memberList}
                            getOptionLabel={(option) => option.userName}
                            style={{ width: 300 }}
                            onChange={handleUserNameChange}
                            renderInput={(params) => <TextField {...params} label="Search Members" variant="outlined" />}
                        />
                        <DialogContentText>Add to Team(s)</DialogContentText>
                        <Autocomplete
                            id="combo-box-demo"
                            options={memberList}
                            getOptionLabel={(option) => option.project}
                            style={{ width: 300 }}
                            onChange={handleProjectChange}
                            renderInput={(params) => <TextField {...params} label="Add Project" variant="outlined" />}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={updateProject} color="primary">ADD</Button>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Members
                    </Typography>
                    <AvatarGroup max={4}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.orange} />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" className={classes.orange} />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                </CardContent>
            </Card>
        </div>
    );
}


