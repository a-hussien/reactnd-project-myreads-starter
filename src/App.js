import React from "react";
import { Routes, Route } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./component/BookList";
import SearchBooks from "./component/SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({ books: data });
    });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route  path="/search" element={<SearchBooks />} >

          </Route>
          <Route exact path="/" element={<BookList books={this.state.books} fetchBooks={this.fetchBooks} />}>
          </Route>
        </Routes>
        
        
        
      </div>
    );
  }
}

export default BooksApp;
