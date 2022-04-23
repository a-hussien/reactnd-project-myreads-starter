import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

/*
- SearchBooks class component 
- will return list of books related to input search (query)
- showResult is true by default and will show list of books query
- showResult will be false if handleChangeQuery return empty array of books
  and showing search terms instead of books
*/

class SearchBooks extends Component {
  static propTypes = {
    query: propTypes.string,
    books: propTypes.array,
    showResult: propTypes.bool,
    handleChangeQuery: propTypes.func,
  };

  state = {
    query: "",
    books: [],
    showResult: true,
  };

  // filter search query with shelf name
  updateShelf = (searchBook) => {
    searchBook.shelf = "none";

    const { books } = this.props;

    if (books) {
      const currentBook = books.filter((book) => book.id === searchBook.id);
      // console.log(currentBook);
      if (currentBook.length > 0) {
        searchBook.shelf = currentBook[0].shelf;
      }

      return searchBook;
    }
  };

  handleChangeQuery = async (event) => {
    this.setState({ query: event.target.value });

    if (event.target.value.length > 3) {
      await BooksAPI.search(event.target.value, 20)
        .then((books) => {
          if (books.length) {
            const newBooks = books.map((book) => this.updateShelf(book));
            // console.table(newBooks);
            this.setState({
              books: newBooks,
              showResult: true,
            });
          } else {
            this.setState({
              books: [],
              showResult: false,
            });
          }
        })
        .catch((e) => console.error(`Something went wrong  - ${e}`));
    } else {
      this.setState({ books: [] });
    }
  };

  render() {
    const { fetchBooks, shelfs } = this.props;
    const { books, showResult } = this.state;
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
          {showResult ? (
            books.map((book) => (
              <div key={book.id}>
                <Book book={book} fetchBooks={fetchBooks} shelfs={shelfs} />
              </div>
            ))
          ) : (
            <div className="book-authors">
              <h3>Search is limited to (search terms below)</h3>
              <p>
                'Android', 'Art', 'Artificial Intelligence', 'Astronomy',
                'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography',
                'Brief', 'Business', 'Camus', 'Cervantes', 'Christie',
                'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai',
                'Design', 'Development', 'Digital Marketing', 'Drama',
                'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy',
                'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future',
                'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen',
                'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
                'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money',
                'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography',
                'Poetry', 'Production', 'Programming', 'React', 'Redux',
                'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction',
                'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web
                Development', 'iOS'
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
