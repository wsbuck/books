import React, { useState } from 'react';

import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Drawer(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  return (
    <>
      <SwipeableDrawer 
        open={open} 
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div 
          className={classes.list} role="presentation"
          onClick={() => setOpen(false)}
        >
          <List>
            <ListItem button onClick={() => props.history.push('/')}>
              <ListItemIcon>
                <i className="material-icons">home</i>
              </ListItemIcon>
              <ListItemText primary="Books" />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/add/book')}>
              <ListItemIcon>
                <i className="material-icons">add</i>
              </ListItemIcon>
              <ListItemText primary="Add Book" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <i className="material-icons">search</i>
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
      <IconButton
        edge="start" className="classes.menuButton"
        color="inherit" aria-label="menu"
        onClick={() => setOpen(true)}
      >
        <i className="material-icons">menu</i>
      </IconButton>
    </>
  );
}

export default withRouter(Drawer);