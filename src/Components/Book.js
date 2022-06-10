import React from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

const Book = (props) => {
  const { book, onAddOrRemoveBook } = props;
  let backgroundImage = "";
  if (book.imageLinks) {
    if (book.imageLinks.thumbnail) {
      backgroundImage = `url(${book.imageLinks.thumbnail})`;
    } else if (book.imageLinks.smallThumbnail) {
      backgroundImage = `url(${book.imageLinks.smallThumbnail})`;
    } else {
      // No background image
      backgroundImage = `url()`;
    }
  }
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: backgroundImage,
          }}
        ></div>
        <BookShelfChanger
          book={book}
          onAddOrRemoveBook={(book) => {
            onAddOrRemoveBook(book);
          }}
        />
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors ? (
        book.authors.map((author, index) => {
          return (
            <div key={index} className="book-authors">
              {author}
            </div>
          );
        })
      ) : (
        <div className="book-authors"></div>
      )}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onAddOrRemoveBook: PropTypes.func.isRequired,
};

export default Book;
