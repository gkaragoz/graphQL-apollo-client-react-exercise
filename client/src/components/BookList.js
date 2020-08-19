import React from "react";
import { useQuery } from "@apollo/client";

import { getBooksQuery } from "../queries/queries";

function BookList() {
  const DisplayBooks = () => {
    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(data);

    return data.books.map((book) => {
      return <li key={book.id}>{book.name}</li>;
    });
  };

  return (
    <div>
      <ul id="book-list">{DisplayBooks()}</ul>
    </div>
  );
}

export default BookList;
