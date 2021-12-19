import React, { Component } from 'react'
import * as BooksAPI from "../BooksAPI";

class SelectShelf extends Component {
    state = {
        shelf: this.props.book.shelf,
      };

    handleChangeShelf = async (event) => {
        await BooksAPI.update(this.props.book, event.target.value).then(() => {
            this.props.fetchBooks();
        });
    };

    render() {
        
        return (
            <div className="book-shelf-changer">
                <select onChange={this.handleChangeShelf} value={this.state.shelf || "none"}>
                <option value="move" disabled>Move to...</option>
                { this.props.shelfs.map((shelf) => (
                    <option key={shelf.key} value={shelf.key}>{shelf.name}</option>
                ))}
                <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default SelectShelf
