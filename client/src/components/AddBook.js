import React from "react";
import { useQuery, gql } from "@apollo/client";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading books...</option>;
    if (error) return <div>Error: {error}</div>;

    console.log(data);

    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="book-name">Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="book-genre">Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label htmlFor="book-author">Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
