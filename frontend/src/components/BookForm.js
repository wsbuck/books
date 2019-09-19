import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { makeStyles } from '@material-ui/core/styles';


import AuthorForm from './AuthorForm';
import GenreForm from './GenreForm';

import { createBook } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    // marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    textAlign: 'left',
    width: '95%',
    // minWidth: 400,
    // minWidth: 200,
  },
  attachment: {
    marginTop: '5px',
    textAlign: 'left',
    // color: 'primary',
  },
  imgInput: {
    display: 'none',
  },
}));

function BookForm(props) {
  const classes = useStyles();

  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState(1);
  const [genre, setGenre] = useState(1);
  const [language, setLanguage] = useState(1);
  const [description, setDescription] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [bookCoverImg, setBookCoverImg] = useState();
  const [bookCoverImgName, setBookCoverImgName] = useState('');

  const [authors, setAuthors] = useState([{
    first_name: '', last_name: '', pk: 1
  }]);
  const [genres, setGenres] = useState([{
    name: '', pk: 1
  }]);
  const [languages, setLanguages] = useState([{
    name: '', pk: 1
  }]);

  const authorLabel = React.useRef(null);
  const genreLabel = React.useRef(null);
  const languageLabel = React.useRef(null);
  const [authorLabelWidth, setAuthorLabelWidth] = useState(0);
  const [genreLabelWidth, setGenreLabelWidth] = useState(0);
  const [languageLabelWidth, setLanguageLabelWidth] = useState(0);

  // const {authors} = props;

  function handleImage(event) {
    setBookCoverImg(event.target.files[0]);
    setBookCoverImgName(event.target.files[0].name);
  }

  function handleImageUpload() {
    document.querySelector('#bookCoverInput').click();
  }

  useEffect(() => {
    setAuthorLabelWidth(authorLabel.current.offsetWidth);
    setGenreLabelWidth(genreLabel.current.offsetWidth);
    setLanguageLabelWidth(languageLabel.current.offsetWidth);
    setAuthors(props.authors);
    setGenres(props.genres);
    setLanguages(props.languages);
  }, [props])


  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('title', bookTitle);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('author', author);
    if (isbn) {
      formData.append('isbn', isbn);
    }
    if (bookCoverImg) {
      formData.append('cover_image', bookCoverImg);
    }
    if (language) {
      formData.append('language', language);
    }
    if (pubDate) {
      formData.append('publication_date', pubDate);
    }

    const data = await createBook(formData);
    if (data !== undefined) {
      props.bookAdded();
      // props.history.push('/');
    }
  }

  function addAuthor(author) {
    const updatedAuthors = [...authors, author];
    setAuthors(updatedAuthors);
    setAuthor(author.pk);
  }

  function addGenre(genre) {
    const updatedGenres = [...genres, genre];
    setGenres(updatedGenres);
    setGenre(genre.pk);
  }

  // function addLanguage(language) {
  //   const updatedLanguages = [...languages, language];
  //   setLanguages(updatedLanguages);
  // }

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
                <InputLabel htmlFor="language" ref={languageLabel}>
                  Language
                </InputLabel>
                  <Select
                    name="language"
                    required
                    id="language"
                    labelWidth={languageLabelWidth}
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    {
                      languages.map(l => (
                        <MenuItem value={l.pk} key={l.pk}>
                          {l.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={1}>
              <LanguageForm addLanguage={addLanguage} />
            </Grid> */}
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
                  required
                  rowsMax="4"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <TextField
                  id="isbn"
                  label="ISBN"
                  variant="outlined"
                  value={isbn}
                  onChange={e => setIsbn(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <TextField
                  id="pubdate"
                  label="Publication Date"
                  variant="outlined"
                  type="date"
                  value={pubDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={e => setPubDate(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                id="bookCoverInput"
                onChange={e => handleImage(e)}
                className={classes.imgInput}
              />
              <Button
                id="bookCoverButton"
                onClick={handleImageUpload}
                className={classes.button}
                color="secondary"
                variant="contained"
                fullWidth
              >
                Book Cover Image
              </Button>
            </Grid>
            <Grid item xs={6}>
              {
                bookCoverImg
                ? (
                  <div className={classes.attachment}>
                    <i className="material-icons">
                      attach_file
                    </i>
                    {bookCoverImgName}
                  </div>
                )
                : ""
              }
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default BookForm;