import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../components/auth-context';

import { loginUser } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  links: {
    maxWidth: 500,
    paddingTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2)
  },
}));


export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const status = await loginUser({ email: email, password: password });
    if (status) {
      setAuth({ type: 'login' });
    } else {
      alertWrongPassword();
    }
  }

  function alertWrongPassword() {
    setError(true);
    setTimeout(() => {
      setError(false)
    }, 5000);
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      props.history.push('/');
    }
  }, [auth, props.history]);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={e => handleLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="email"
            // autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <Tooltip 
            title="Wrong Username and Password combination"
            disableFocusListener
            disableHoverListener
            disableTouchListener
            open={error}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
          </Button>
          </Tooltip>
        </form>
        <Grid container className={classes.links}>
          <Grid item xs>
            <Link to="#" variant="body2">
              Forgot password?
              </Link>
          </Grid>
          <Grid item xs>
            <Link to='/signup' variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}