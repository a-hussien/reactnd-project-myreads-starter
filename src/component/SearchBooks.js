import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    query: "",
    books: [],
  };

  updateShelf = (targetBook) => {
    targetBook.shelf = "none";

    const { bookList } = this.props;

    if (bookList) {
      const currentBook = bookList.filter((book) => book.id === targetBook.id);

      if (currentBook.length > 0) {
        targetBook.shelf = currentBook.shelf;
      }

      this.setState({ books: targetBook });

      return targetBook;
    }
  };

  handleChangeQuery = async (event) => {
    this.setState({ query: event.target.value });

    if (event.target.value.length) {
      await BooksAPI.search(event.target.value, 20)
        .then((books) => {
          books.length ? this.updateShelf(books) : this.setState({ books: [] });
        })
        .catch((e) => console.error(`Something went wrong  - ${e}`));
    } else {
      this.setState({ books: [] });
    }
  };

  render() {
    const { fetchBooks, shelfs } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChangeQuery}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
          {this.state.books.map((book) => (
            <div key={book.id}>
              <Book book={book} fetchBooks={fetchBooks} shelfs={shelfs} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
