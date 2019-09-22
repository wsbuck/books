import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Rating from '@material-ui/lab/Rating';


var moment = require('moment');

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    padding: theme.spacing(1),
  },
}));

export default function ReviewItem(props) {
  const classes = useStyles();
  const { review } = props;

  return (
    <Grid item xs={12} className={classes.root}>
      <CardActionArea>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {`${review.user.first_name} ${review.user.last_name}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {moment(`${review.date_published}`).format('MMM Do YYYY')}
              </Typography>
              <Rating readOnly value={Number(review.star_rating)} />
              <Typography variant="subtitle1" paragraph>
                {`${review.content}`}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}