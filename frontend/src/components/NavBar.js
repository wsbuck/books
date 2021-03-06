import React from 'react';

import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useAuth } from './auth-context';

import Drawer from './Drawer';

import { logoutUser } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    // backgroundColor: 'blue',
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    textAlign: 'left',
  },
}));


function NavBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = useAuth();

  async function handleLogout() {
    await logoutUser();
    setAuth({ type: 'logout' });
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static' color='primary'>
        <Toolbar>
          <Drawer />
          <Typography variant='h6' color='inherit' className={classes.title}>
            William's Books
          </Typography>
          {
            !auth.isLoggedIn
              ? (
                <Button
                  color="inherit"
                  onClick={() => props.history.push('/login')}
                >
                  <i className="material-icons">face</i>
                </Button>
              )
              : (
                <Button color="inherit" onClick={() => handleLogout()}>
                  Log Out
                </Button>
              )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar);