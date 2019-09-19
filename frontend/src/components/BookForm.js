import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { makeStyles } from '@material-ui/core/styles';

import AuthorForm from './AuthorForm';
import GenreForm from './GenreForm';

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
  formControl: {
    margin: theme.spacing(1),
    textAlign: 'left',
    width: '95%',
    // minWidth: 400,
    // minWidth: 200,
  },
}));

export default function BookForm(props) {
  const classes = useStyles();

  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState(1);
  const [genre, setGenre] = useState(1);
  const [description, setDescription] = useState('');

  const [authors, setAuthors] = useState([{
    first_name: '', last_name: '', pk: 1
  }]);
  const [genres, setGenres] = useState([{
    name: '', pk: 1
  }]);

  const authorLabel = React.useRef(null);
  const genreLabel = React.useRef(null);
  const [authorLabelWidth, setAuthorLabelWidth] = useState(0);
  const [genreLabelWidth, setGenreLabelWidth] = useState(0);

  // const {authors} = props;

  useEffect(() => {
    setAuthorLabelWidth(authorLabel.current.offsetWidth);
    setGenreLabelWidth(genreLabel.current.offsetWidth);
    setAuthors(props.authors);
    setGenres(props.genres);
  }, [props])


  function handleSubmit(event) {
    // console.log(event);
  }

  function addAuthor(author) {
    const updatedAuthors = [...authors, author];
    setAuthors(updatedAuthors);
  }

  function addGenre(genre) {
    const updatedGenres = [...genres, genre];
    setGenres(updatedGenres);
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h5">
          Add Book
        </Typography>
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  name="bookTitle"
                  variant="outlined"
                  required
                  fullWidth
                  id="bookTitle"
                  label="Book Title"
                  autoFocus
                  value={bookTitle}
                  onChange={e => setBookTitle(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel htmlFor="author" ref={authorLabel}>
                  Author
                </InputLabel>
                <Select
                  name="author"
                  required
                  id="author"
                  label="Author"
                  labelWidth={authorLabelWidth}
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                >
                  {
                    authors.map(a => (
                      <MenuItem value={a.pk} key={a.pk}>
                        {`${a.first_name} ${a.last_name}`}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <AuthorForm addAuthor={addAuthor} />
            </Grid>
            <Grid item xs={9}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel htmlFor="genre" ref={genreLabel}>
                  Genre
                </InputLabel>
                <Select
                  name="genre"
                  required
                  id="genre"
                  label="Genre"
                  labelWidth={genreLabelWidth}
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                >
                  {
                    genres.map(g => (
                      <MenuItem value={g.pk} key={g.pk}>
                        {g.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <GenreForm addGenre={addGenre} />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>

        </form>
      </Paper>
    </div>
  );
}