import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selected, setSelected] = useState(null);

  const DisplayBooks = () => {
    const { loading, error, data } = useQuery(getBooksQuery);

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>Error: {error}</div>;

    return data.books.map((book) => {
      return (
        <li key={book.id} onClick={(e) => setSelected(book.id)}>
          {book.name}
        </li>
      );
    });
  };

  return (
    <div>
      <ul id="book-list">{DisplayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
