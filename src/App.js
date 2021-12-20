import React from "react";
import propTypes from "prop-types";
import { Routes, Route } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./component/BookList";
import SearchBooks from "./component/SearchBooks";

/*
- BooksApp class component is the main component
- have a state of books and the default value is empty array
- fetchBooks method will call getAll from BooksAPI and update state of books 
- componentDidMount hook will rerender the component upon state updates
- shelfs variable hold the required data to share between components as a props
- this component have two routes (main - search)
*/

class BooksApp extends React.Component {
  static propTypes = {
    books: propTypes.array,
    fetchBooks: propTypes.func,
    shelfs: propTypes.array,
  };

  state = {
    books: [],
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    await BooksAPI.getAll().then((data) => {
      this.setState({ books: data });
    });
  };

  render() {
    const shelfs = [
      {
        key: "currentlyReading",
        name: "Currently Reading",
      },
      {
        key: "wantToRead",
        name: "Want to Read",
      },
      {
        key: "read",
        name: "Read",
      }
    ];
    return (
      <div className="app">
        <Routes>
          <Route  path="/search" element={<SearchBooks books={this.state.books} fetchBooks={this.fetchBooks} shelfs={shelfs} />} >
          </Route>
          <Route exact path="/" element={<BookList books={this.state.books} fetchBooks={this.fetchBooks} shelfs={shelfs} />}>
          </Route>
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
