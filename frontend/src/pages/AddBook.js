import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import BookForm from '../components/BookForm';

import { useAuth } from '../components/auth-context';

import { fetchAddBookData } from '../utils';


function AddBook(props) {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  const [auth,] = useAuth();

  function bookAdded() {
    props.history.push('/');
  }

  useEffect(() => {
    if (!auth.isLoggedIn) {
      props.history.push('/login');
    }
  });


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