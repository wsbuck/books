import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    // margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  card: {
    // minWidth: 300,
    // maxWidth: 100,
    minHeight: 180,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardDetail: {
    display: 'flex',
  },
  cardMedia: {
    width: 160,
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
}));


export default function BookCard(props) {
  const classes = useStyles();
  const { book } = props;

  return (
    <Grid item xs={12} sm={6} className={classes.root}>
      <Link to={`book/${book.pk}`} className={classes.link}>
        <CardActionArea>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {`${book.author.first_name} ${book.author.last_name}`}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {
                    book.publication_date
                      ? book.publication_date
                      : ""
                  }
                </Typography>
                {/* <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography> */}
              </CardContent>
            </div>
            <CardMedia
              className={classes.cardMedia}
              image={book.cover_image}
              title="Book Cover Image"
            />
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}