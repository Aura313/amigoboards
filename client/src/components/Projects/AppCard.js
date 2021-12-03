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
  orange: {
    backgroundColor: 'orange',
    fontSize: 15,
  },
});

export default function AppCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Paper elevation={3} className={classes.root}>
      <Card>
        <CardContent>
          <CardHeader
            avatar={
              <Avatar className={classes.orange} aria-label='WP'>
                WP
              </Avatar>
            }
            title='WebDesign Project'
            subheader='September 14, 2016'
          />

          <Typography className={classes.pos} color='textSecondary'>
            Owner: Tanya
          </Typography>
          <Typography variant='body2' component='p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            ante tempus, luctus nisi facilisis, congue sapien. Donec id sodales
            felis. Pellentesque a maximus mauris, vel malesuada nunc. Donec
            commodo dui eu pretium ultricies.
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
