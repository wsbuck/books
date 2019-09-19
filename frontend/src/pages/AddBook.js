import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import BookForm from '../components/BookForm';

import { fetchAddBookData } from '../utils';

function AddBook(props) {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  function bookAdded() {
    props.history.push('/');
  }


  useEffect(() => {
    async function initialGet() {
      const data = await fetchAddBookData()
      setAuthors(data.authors);
      setGenres(data.genres);
      setLanguages(data.languages);
    }
    initialGet();

  }, [])

  return (
    <BookForm 
      authors={authors} genres={genres} languages={languages}
      bookAdded={() => bookAdded()}
    />
  );
}

export default withRouter(AddBook)