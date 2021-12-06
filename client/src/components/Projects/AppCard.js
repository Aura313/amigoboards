import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    width: '45%',
    marginBottom: 20,
    textDecoration: 'none',
    minHeight: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  evenBg: {
    backgroundColor: '#f08080',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  oddBg: {
    backgroundColor: '#89B0AE',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    minHeight: 200,
  },
});

export default function AppCard(props) {
  const classes = useStyles();
  const [elevationValue, setElevationVale] = useState(0);
  // const history = useHistory();

  const { project, idx } = props;

  const getInitials = (string) => {
    let str = string.split(' '),
      initials = str[0].substring(0, 1).toUpperCase();

    if (str.length > 1) {
      initials += str[str.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const onMouseOver = () => setElevationVale(3);
  const onMouseOut = () => setElevationVale(0);

  return (
    <Paper
      elevation={elevationValue}
      key={`card-${idx}-${project._id}`}
      id={project._id}
      className={classes.root}
      component={RouterLink}
      to={`/projects/${project.slug}/${project._id}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Card className={classes.container}>
        <CardContent>
          <CardHeader
            avatar={
              <Avatar
                className={idx % 2 ? classes.evenBg : classes.oddBg}
                aria-label={getInitials(project.title)}
              >
                {getInitials(project.title)}
              </Avatar>
            }
            titleTypographyProps={{variant:'h5' }}
            title={project.title}
            subheader={project.createdAt}
          />

          <Typography className={classes.pos} color='textSecondary'>
            Owner: {project.ownerName ? project.ownerName : 'N/A'}
          </Typography>
          <Typography variant='body2' component='p'>
            {project.description ? project.description : 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
