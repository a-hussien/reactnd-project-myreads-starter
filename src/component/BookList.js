import React, { Component } from "react"
import { Link } from 'react-router-dom'
import BookShelf from "./BookShelf";

class BookList extends Component {
  render() {
    const { books, fetchBooks, shelfs } = this.props;
    
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
}

export default BookList;
