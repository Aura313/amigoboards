import React from 'react';
import AppCard from '../../components/Projects/AppCard';
import Typography from '@material-ui/core/Typography';
import './Projects.scss';
import Paper from '@material-ui/core/Paper';
export class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Paper className='paper' elevation={3}>
          <Typography color='textSecondary'>Owner: Tanya</Typography>
        </Paper>
        <div className='container'>
          <AppCard />
          <AppCard />
          <AppCard />
          <AppCard />
        </div>
      </div>
    );
  }
}
