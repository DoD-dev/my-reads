import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";

class Book extends Component {
  render() {
    let backgroundImage = "";
    if (this.props.book.imageLinks) {
      if (this.props.book.imageLinks.thumbnail) {
        backgroundImage = `url(${this.props.book.imageLinks.thumbnail})`;
      } else if (this.props.book.imageLinks.smallThumbnail) {
        backgroundImage = `url(${this.props.book.imageLinks.smallThumbnail})`;
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
            book={this.props.book}
            onAddOrRemoveBook={(book) => {
              this.props.onAddOrRemoveBook(book);
            }}
          />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors ? (
          this.props.book.authors.map((author, index) => {
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
  }
}

export default Book;
