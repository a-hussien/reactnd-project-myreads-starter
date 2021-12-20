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
          <Route  path="/search" element={<SearchBooks bookList={this.state.books} fetchBooks={this.fetchBooks} shelfs={shelfs} />} >

          </Route>
          <Route exact path="/" element={<BookList books={this.state.books} fetchBooks={this.fetchBooks} shelfs={shelfs} />}>
          </Route>
        </Routes>
        
        
        
      </div>
    );
  }
}

export default BooksApp;
