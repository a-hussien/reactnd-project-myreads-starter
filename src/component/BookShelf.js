import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";

/*
- BookShelf component created with statleless function 
- will return books related to thier shelfs
- if books was empty it will show a message "Nothing to Show" and provide a button to route search component
- if books was not empty it will map throw books to show book details books on <Book/> component
*/

function BookShelf({ books, shelfName, fetchBooks, shelfs }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        {books.length ? (
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} fetchBooks={fetchBooks} shelfs={shelfs} />
              </li>
            ))}
          </ol>
        ) : (
          <div className="add-book">
            Nothing to Show,
            <Link to="/search">
              <button className="custom-button">Add a book</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  books: propTypes.array.isRequired,
  shelfName: propTypes.string.isRequired,
  fetchBooks: propTypes.func,
  shelfs: propTypes.array.isRequired,
};

export default BookShelf;
