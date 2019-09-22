import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import BookCard from '../components/BookCard';

import { getReadList } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    // margin: theme.spacing(3, 2),
  },
  bookGrid: {
    // marginTop: theme.spacing(3),
    // margin: theme.spacing(1),
  },
  book: {

  }
}));

export default function Read(props) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function addBooks(pageNum) {
      const data = await getReadList(pageNum);
      setBooks(data.results);
    }
    addBooks(page);
  }, [page])

  return (
    <div className={classes.root}>
      <Grid className={classes.bookGrid} container spacing={0}>
        {
          books.map(book => (
              <BookCard book={book} key={book.pk} />
          ))
        }
      </Grid>
    </div>
  );
}