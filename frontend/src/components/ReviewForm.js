import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import { createReview } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {

  }
}));

export default function ReviewForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      content: content,
      rating: rating,
      book: props.bookId,
    }
    const review = await createReview(data);
    if (review) {
      setContent('');
      setRating();
      props.addReview(review);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add Review
      </Button>
      <Dialog
        open={open} onClose={() => setOpen(false)}
        className={classes.root}
        maxWidth="sm"
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">
                    Rating
                  </Typography>
                  <Rating
                    name="bookRating"
                    value={rating}
                    onChange={(event, newRating) => setRating(newRating)}
                  />
                </Box>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="reviewContent"
                  label="Review"
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows="4"
                  rowsMax="4"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={e => handleSubmit(e)}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add Review
                </Button>
              </Grid>
            </Grid>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}