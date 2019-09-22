import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAuth } from './auth-context';

import { updateRead, fetchReadStatus } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'start',
    padding: theme.spacing(3, 2),
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  bookCover: {
    width: '100%',
    maxHeight: 250,
    objectFit: 'cover',
  },
  bookInfo: {
    padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
}));

function BookDetail(props) {
  const classes = useStyles();
  const [auth,] = useAuth();
  const [readStatus, setReadStatus] = useState(false);
  const { book } = props;
  

  async function handleMarkRead() {
    const status = await updateRead(book.pk);
    setReadStatus(status.read);
  }

  useEffect(() => {
    async function checkReadStatus() {
      const status = await fetchReadStatus(book.pk);
      setReadStatus(status.read);
    }
    checkReadStatus();
  }, [book])

  return (
    <>
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Grid item xs={12}>
              <Typography variant="h2" align="left" gutterBottom>
                {book.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="left">
                {`${book.author.first_name} ${book.author.last_name}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {book.publication_date ? `${book.publication_date}` : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {book.language ? `${book.language.name}` : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="left">
                {`${book.genre.name} - ${book.genre.category}`}
              </Typography>
            </Grid>
            {
              auth.isLoggedIn
                ? (
                  <Grid item xs={12} align="left">
                    <Button 
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleMarkRead()}
                    >
                      {readStatus ? 'Mark Unread' : 'Mark Read'}
                    </Button>
                  </Grid>
                )
                : ""
            }
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid item xs={12}>
              <img
                src={book.cover_image}
                alt="book cover"
                className={classes.bookCover}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="left">
              {book.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default withRouter(BookDetail);