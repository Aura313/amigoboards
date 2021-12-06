import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ComboBox from './ComboBox';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { deepOrange } from '@material-ui/core/colors';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    alignItems: 'center',
    justifyContent: 'flex-end'
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
      <AvatarGroup className={classes.root}>
        {members.map((i, idx) => (
          <Avatar
            key={idx}
            alt={i.userName}
            className={classes.orange}
          >
            {getInitials(i.userName)}
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
