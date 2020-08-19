import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { getAuthorsQuery, addBookMutation } from "../queries/queries";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthodId] = useState("");
  const [addBook] = useMutation(addBookMutation);

  const DisplayAuthors = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);

    if (loading) return <option disabled>Loading books...</option>;
    if (error) return <div>Error: {error}</div>;

    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  const SubmitForm = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
    });
  };

  return (
    <form id="add-book" onSubmit={SubmitForm}>
      <div className="field">
        <label htmlFor="book-name">Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="book-genre">Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="book-author">Author:</label>
        <select onChange={(e) => setAuthodId(e.target.value)}>
          <option>Select author</option>
          {DisplayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
