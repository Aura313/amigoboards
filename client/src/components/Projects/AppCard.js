import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '45%',
    marginBottom: 20
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
    fontWeight: 'bold'
  },
  oddBg: {
    backgroundColor: '#89B0AE',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  container: {
    minHeight: 200
  }
});

export default function AppCard(props) {
  const classes = useStyles();
  const { projects} = props;


  const getInitials = function (string) {
    let str = string.split(' '),
        initials = str[0].substring(0, 1).toUpperCase();
    
    if (str.length > 1) {
        initials += str[str.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

  return projects && (
    projects.map((i, idx) =>  <Paper className={classes.container} elevation={3} key={`card-${idx}`} className={classes.root}>
      <Card className={classes.container} >
        <CardContent>
          <CardHeader
            avatar={
              <Avatar className={idx % 2 ? classes.evenBg : classes.oddBg} aria-label='WP'>
                {getInitials(i.title)}
              </Avatar>
            }
            title={i.title}
            subheader={i.createdAt}
          />

          <Typography className={classes.pos} color='textSecondary'>
            Owner: {i.owner ? i.owner : 'N/A'}
          </Typography>
          <Typography variant='body2' component='p'>
            {i.description ? i.description : 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Paper>)
  );
}
