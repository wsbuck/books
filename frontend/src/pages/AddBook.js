import React, { useState, useEffect } from 'react';

import BookForm from '../components/BookForm';

import { fetchAddBookData } from '../utils';

export default function AddBook() {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);


  useEffect(() => {
    async function initialGet() {
      const data = await fetchAddBookData()
      console.log(data);
      setAuthors(data.authors);
      setGenres(data.genres);
      setLanguages(data.languages);
    }
    initialGet();

  }, [])

  return (
    <BookForm authors={authors} genres={genres}/>
  );
}