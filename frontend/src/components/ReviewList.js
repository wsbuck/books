import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

import { fetchReviews } from '../utils';

const useStyles = makeStyles(theme => ({
  reviewGrid: {
    maxWidth: 600,
    padding: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonContainer: {
    textAlign: 'start',
  },
}));


export default function ReviewList(props) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const { bookId } = props;

  useEffect(() => {
    async function callFetchReviews(pk) {
      const data = await fetchReviews(pk);
      setReviews(data);
    }
    callFetchReviews(bookId);
  }, [bookId])

  function addReview(review) {
    const updatedGenres = [...reviews, review];
    setReviews(updatedGenres);
  }

  return (
    <Grid className={classes.reviewGrid} container spacing={2}>
      <Grid item xs={12} className={classes.buttonContainer}>
        <ReviewForm bookId={bookId} addReview={addReview} />
      </Grid>
    {
      reviews.map(review => (
        <ReviewItem key={review.pk} review={review} />
      ))
    }
    </Grid>

  );
}