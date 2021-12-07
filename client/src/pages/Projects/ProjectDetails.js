import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
import axios from '../../middleware/axios';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Config from '../../Configuration/Config.json';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import ProjectForm from '../../components/Projects/Form';
import { useNavigate } from 'react-router-dom';
import './Projects.scss';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../Services/AuthenticationService';
import { getUser } from '../../store/Actions/user.actions';
import Members from '../../components/Projects/Members/Members';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  evenBg: {
    backgroundColor: '#f08080',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 20,
  },
  oddBg: {
    backgroundColor: '#89B0AE',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 20,
  },
  parentCont: {
    margin: '2% 5%',
  },
  container: {
    padding: '40px 20px',

    margin: '0 auto',
  },
  titleWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headWrapper: {
    display: 'flex',
  },
  iconWrapper: {
    display: 'flex',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    marginTop: 20,
  },
  descContainer: {
    padding: '40px 20px',
    width: '55%',
  },
  statsContainer: {
    padding: '40px 20px',
    width: '35%',
  },
  mWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  memberContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    padding: '40px 20px',
    width: '35%',
  },
  statsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export const ProjectDetails = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    members: [],
    owner: '',
  });

  const classes = useStyles();

  const [editable, setEditable] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const appState = useSelector((state) => state);
  const dispatch = useDispatch();
  const setUserDetails = () => {
    dispatch(getUser(AuthService.getCurrentUser() || []));
  };

  useEffect(() => {
    setUserDetails();
  }, []);

  const {
    user: { user },
  } = appState;

  const handleEditProject = () => {
    setEditable(true);
  };

  const fetchProjectDetails = async () => {
    await axios
      .get(`${Config.projects_url}/${params.slug}/${params.id}`)
      .then((res) => setProject(res.data));
  };
  const handleClose = () => {
    setEditable(false);
    fetchProjectDetails();
  };

  const handleDeleteProject = async () => {
    await axios
      .delete(`${Config.projects_url}/${params.slug}/${params.id}`)
      .then((res) => navigate('/projects'));
  };

  const getInitials = (string) => {
    let str = string.split(' '),
      initials = str[0].substring(0, 1).toUpperCase();

    if (str.length > 1) {
      initials += str[str.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    fetchProjectDetails();
  }, []);
  return (
    <div className={classes.parentCont}>
      <Paper className={classes.container} elevation={0}>
        <div className={classes.headWrapper}>
          <div className={classes.titleWrapper}>
            <Avatar
              className={project._id % 2 ? classes.evenBg : classes.oddBg}
              aria-label={getInitials(project.title)}
              variant='rounded'
            >
              {getInitials(project.title)}
            </Avatar>
            <Typography align='left' variant='h4'>
              <b>{project.title}</b>
            </Typography>
          </div>
          {!editable && (
            <div className={classes.iconWrapper}>
              <Button align='right' onClick={handleEditProject}>
                <EditIcon />
              </Button>

              <Button onClick={handleDeleteProject}>
                <DeleteIcon />
              </Button>
            </div>
          )}
        </div>
      </Paper>
      <div className={classes.contentWrapper}>
        <Paper className={classes.descContainer} elevation={0}>
          <Typography align='left' variant='h6'>
            <b>
              {project.description
                ? `About this Project`
                : `This project has no description yet`}
            </b>
          </Typography>
          <br />
          <Typography align='left' variant='body'>
            {project.description
              ? project.description
              : 'Describing the project makes it easier for other people to understand it.'}
          </Typography>
        </Paper>
        <Paper className={classes.statsContainer} elevation={0}>
          <Typography align='left' variant='h6'>
            <b>Project Stats</b>
          </Typography>
          <br />
          <div className={classes.statsWrapper}>
            <div className={classes.iconWrapper}>
              <AssignmentIndOutlinedIcon />
              &nbsp;
              <div className={classes.statItem}>
                <Typography align='left' variant='body1' color='textSecondary'>
                  <b> 5</b>
                </Typography>

                <Typography align='left' variant='body2' color='textSecondary'>
                  Work Items Created
                </Typography>
              </div>
            </div>
            <br />
            <div className={classes.iconWrapper}>
              <AssignmentTurnedInOutlinedIcon />
              &nbsp;
              <div className={classes.statItem}>
                <Typography align='left' variant='body1' color='textSecondary'>
                  <b> 2</b>
                </Typography>

                <Typography align='left' variant='body2' color='textSecondary'>
                  Work Items Completed
                </Typography>
              </div>
            </div>
            <br />
            <div className={classes.iconWrapper}>
              <AssignmentTurnedInOutlinedIcon />
              &nbsp;
              <div className={classes.statItem}>
                <Typography align='left' variant='body1' color='textSecondary'>
                  <b> 2</b>
                </Typography>

                <Typography align='left' variant='body2' color='textSecondary'>
                  Work Items Completed
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div className={classes.mWrapper}>
        <Paper className={classes.memberContainer} elevation={0}>
          <Typography className='mem-wrapper' align='left' variant='h6'>
            <b>MEMBERS </b>{' '}
            <span className='mem-len'>{project.members.length}</span>
          </Typography>
          <br />
          <Members members={project.members} leftAlign={true} />
        </Paper>
      </div>
      {editable && (
        <div>
          {/* <Button onClick={handleClose}>
            <CloseIcon />
          </Button> */}

          <Dialog
            open={editable}
            fullWidth
            maxWidth='xl'
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle className={classes.statsWrapper} >
              Project Details: 
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </DialogTitle>
            <DialogContent>
            {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText> */}
              <ProjectForm
                title={project.title}
                description={project.description}
                selectedMembers={project.members}
                owner={project.owner}
                ownerName={project.ownerName}
                updateMode={true}
                handleClose={handleClose}
                editable={editable}
              />
            </DialogContent>
          </Dialog>
          {/* <Dialog  editable={editable}  handleClose={handleClose}/> */}
        </div>
      )}
      {/* <Paper className={classes.container} elevation={0}>
        qwfhqw
      </Paper>
      <Paper className={classes.container} elevation={0}>
        qwfhqw
      </Paper> */}
    </div>
  );
};
