import React from "react";
import propTypes from "prop-types";
import SelectShelf from "./SelectShelf";

/*
- Book component created with statleless function 
- will return book details destructing to { imageLinks, title, authors }
- style varible have backgroundImage property and hold a url to show imageLinks if it's exist
- authors varible will map throw Object.keys to show all authors names if it's exist
*/

function Book( { book, fetchBooks, shelfs } ) {

  const { imageLinks, title, authors } = book;
  const style = {
    width: 128,
    height: 193,
    backgroundImage: `url("${imageLinks ? imageLinks.smallThumbnail : 'No Image'}")`,
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
      {authors ? Object.keys(authors).map((author, index) => (
        <span key={index}>{authors[author]}</span>
      )) : "N/A"}
    </div>
  </div>
  )
}

Book.propTypes = {
  book: propTypes.object.isRequired,
  fetchBooks: propTypes.func,
  shelfs: propTypes.array.isRequired,
  style: propTypes.object,
  title: propTypes.string,
  authors: propTypes.object
};

export default Book;
