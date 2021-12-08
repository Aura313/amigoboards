import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  root: {
    minWidth: 75,
  },
  bullet: {
    display: 'inline-block',
    margin: '10px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { items } = props

  return items && (
    items.map((i, idx) => <Card className={classes.root} key={idx}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {i.assignee}
        </Typography>
        <Autocomplete
                id="combo-box-demo"
                options={List}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                //onChange={fetchStatusDetails}
                renderInput={(params) => <TextField {...params} label="Completed" variant="outlined" />}
            />
        {/* <Typography className={classes.pos} color="textSecondary">
          State: {i.status}
        </Typography> */}
        <Typography className={classes.pos} color="textSecondary">
          Label: {i.labels}
        </Typography>
      </CardContent>
    </Card>
  ));
}

const List = [
    { title: 'To do' },
    { title: 'In Progress' },
    { title: 'Completed' },
  ];
