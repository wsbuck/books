import React, { useState, useEffect } from 'react';

import BookDetail from '../components/BookDetail';
import ReviewList from '../components/ReviewList';

import { fetchBookDetail } from '../utils';

export default function Book(props) {
  const bookId = props.match.params.id;
  const [bookDetail, setBookDetail] = useState();

  useEffect(() => {
    async function addBook(pk) {
      const data = await fetchBookDetail(pk);
      setBookDetail(data);
    }
    addBook(bookId);
  }, [bookId]);

  return (
    <>
      {
        bookDetail
        ? (
          <>
            <BookDetail book={bookDetail} />
            <ReviewList bookId={bookId} />
          </>
        )
        : ""
      }
    </>
  );
}