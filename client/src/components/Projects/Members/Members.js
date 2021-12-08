import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  root2: {
    alignItems: 'center',
    display: 'flex',
  },
  spaces: {
    marginRight: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 7px',
    transform: 'scale(0.8)',
  },
  evenBg: {
    backgroundColor: '#aa4465',
  },
  oddBg: {
    backgroundColor: '#b0c6ce',
  },
}));

export default function Members(props) {
  const classes = useStyles();

  const getInitials = (string) => {
    let str = string.split(' '),
      initials = str[0].substring(0, 1).toUpperCase();

    if (str.length > 1) {
      initials += str[str.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const { members } = props;

  return (
    <div>
      {!props.leftAlign ? (
        <AvatarGroup className={classes.root}>
          {members.map((i, idx) => (
            <Avatar
              key={idx}
              alt={i.userName}
              className={idx % 2 ? classes.evenBg : classes.oddBg}
            >
              {getInitials(i.userName)}
            </Avatar>
          ))}
        </AvatarGroup>
      ) : (
        <div className={classes.root2}>
          {members.map((i, idx) => (
            <Avatar
              
              key={idx}
              alt={i.userName}
              className={idx % 2 ? `${classes.evenBg} ${classes.spaces}`  : `${classes.oddBg} ${classes.spaces}`}
            >
              {getInitials(i.userName)}
            </Avatar>
          ))}
        </div>
      )}
    </div>
  );
}
