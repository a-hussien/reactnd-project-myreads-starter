import React, { Component } from "react";
import propTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";

/*
- SelectShelf class component 
- will return select options to move books from shelf to another.
- have a state "shelf" with default value from book props
- handleChangeShelf will update book shelf with selected value and re-call fetchBooks() function from props
*/

class SelectShelf extends Component {
  static propTypes = {
    shelf: propTypes.string,
    handleChangeShelf: propTypes.func,
  };

  state = {
    shelf: "",
  };

  componentDidMount() {
    this.setState({shelf:this.props.book.shelf})
  }  
  
  handleChangeShelf = async (event) => {
    await BooksAPI.update(this.props.book, event.target.value).then(() => {
      this.props.fetchBooks();
    });
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          onChange={this.handleChangeShelf}
          value={this.state.shelf || "none"}
        >
          <option value="move" disabled>
            Move to...
          </option>
          {this.props.shelfs.map((shelf) => (
            <option key={shelf.key} value={shelf.key}>
              {shelf.name}
            </option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default SelectShelf;
