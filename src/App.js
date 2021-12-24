import React from "react";
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

  state = {
    books: [],
  };

  async componentDidMount() {
    await this.fetchBooks();
  }

  fetchBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books });
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
