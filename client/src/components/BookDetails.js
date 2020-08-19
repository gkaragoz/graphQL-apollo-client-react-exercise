import React from "react";
import { useQuery } from "@apollo/client";

import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const DisplayBookDetails = () => {
    const { loading, error, data } = useQuery(getBookQuery, {
      variables: {
        id: bookId,
      },
    });

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>Error: {error}</div>;

    const { book } = data;

    return (
      <div>
        <h3>{book.name}</h3>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div id="book-detials">
      <p>Book details go here</p>
      {bookId && DisplayBookDetails()}
    </div>
  );
}

export default BookDetails;
