import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

/*
- BookList component created with statleless function 
- will return books related to shelfs filtered by shelf key : (currently reading, want to read, read) 
- map throw shelfs to show desired books on <BookShelf/> component
- component include search route button
*/

function BookList({ books, fetchBooks, shelfs }) {
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelfs.map((shelf) => (
            <BookShelf
              key={shelf.key}
              books={books.filter((book) => book.shelf === shelf.key)}
              shelfName={shelf.name}
              fetchBooks={fetchBooks}
              shelfs={shelfs}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

BookList.propTypes = {
  books: propTypes.array.isRequired,
  fetchBooks: propTypes.func,
  shelfs: propTypes.array.isRequired,
};

export default BookList;
