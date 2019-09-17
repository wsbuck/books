import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

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
  button: {
    marginTop: theme.spacing(2),
  },
  links: {
    maxWidth: 500,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

export default function Signup(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [passwordError, setPasswordError] = useState(false);

  function handleSignup(e) {
    e.preventDefault();
    const url = 'http://localhost:8000/api/v1/users/create/';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        clearInputs();
        localStorage.setItem('authtoken', data.token);
        props.history.push('/');
      })
      .catch((e) => console.error(e));

  }

  useEffect(() => {
    setPasswordError(!checkPasswords());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password2])

  function checkPasswords() {
    return password === password2;
  }

  function clearInputs() {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPassword2('');
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={e => handleSignup(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={passwordError}
                required
                fullWidth
                name="password2"
                label={
                  passwordError
                    ? "Passwords Do Not Match"
                    : "Repeat Password"
                }
                type="password"
                id="password2"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" className={classes.links}>
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}