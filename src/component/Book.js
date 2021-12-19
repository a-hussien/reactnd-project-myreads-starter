import React, { Component } from "react";
import SelectShelf from "./SelectShelf";

class Book extends Component {
  render() {
    const { book, fetchBooks, shelfs } = this.props;
    const { imageLinks, title, authors } = book;
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url("${imageLinks.smallThumbnail}")`,
    };
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style} />
          <SelectShelf
            book={book}
            fetchBooks={fetchBooks}
            shelfs={shelfs}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {Object.keys(authors).map((author, index) => (
            <span key={index}>{authors[author]}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default Book;
