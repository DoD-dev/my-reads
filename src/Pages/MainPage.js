import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelf from "../Components/BookShelf";
import { Link } from "react-router-dom";

class MainPage extends Component {
  render() {
    const { books, onAddOrRemoveBook } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={books
                ?.filter((book) => book.shelf === "currentlyReading")
                .sort()}
              onAddOrRemoveBook={onAddOrRemoveBook}
            />
            <BookShelf
              title="Want to Read"
              books={books
                ?.filter((book) => book.shelf === "wantToRead")
                .sort()}
              onAddOrRemoveBook={onAddOrRemoveBook}
            />
            <BookShelf
              title="Read"
              books={books?.filter((book) => book.shelf === "read").sort()}
              onAddOrRemoveBook={onAddOrRemoveBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  books: PropTypes.array,
  onAddOrRemoveBook: PropTypes.func.isRequired,
};

export default MainPage;
