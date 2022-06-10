import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { title, books, onAddOrRemoveBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books?.map((book) => {
              return (
                <li key={book.id}>
                  <Book
                    book={book}
                    onAddOrRemoveBook={onAddOrRemoveBook}
                  ></Book>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  onAddOrRemoveBook: PropTypes.func.isRequired,
};

export default BookShelf;
