import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { books, shelfName, fetchBooks, shelfs} = this.props;
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
            <p>Nothing to Show, Please Add !</p>
          )}
        </div>
      </div>
    );
  }
}

export default BookShelf;
