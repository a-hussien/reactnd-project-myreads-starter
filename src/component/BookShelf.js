import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { books, shelfName, fetchBooks, shelfs } = this.props;
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
}

export default BookShelf;
