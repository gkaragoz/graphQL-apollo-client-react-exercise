import React from "react";
import { useQuery } from "@apollo/client";

import { getBooksQuery } from "../queries/queries";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(data);

  const displayBooks = () => {
    return data.books.map((book) => {
      return <li key={book.id}>{book.name}</li>;
    });
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
}

export default BookList;
