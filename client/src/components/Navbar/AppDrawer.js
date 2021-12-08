import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { drawerStyles } from './NavbarStyles';

export default function AppDrawer() {
  const classes = drawerStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem component={RouterLink} to={'/home'} button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <br />

        <Divider />
        <br />
        {[
          { title: 'Projects', path: '/projects' },
          { title: 'Work Items', path: '/workItems' },
          { title: 'Boards', path: '/boards' },
        ].map((i, index) => (
          <ListItem component={RouterLink} to={i.path} button key={i.title}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={i.title} />
            {index === 0 && <Divider />}
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  let anchor = 'left';
// App Drawer on hamburger click
  return (
    <div>
      <React.Fragment key={anchor}>
        <MenuIcon onClick={toggleDrawer(anchor, true)} />
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
