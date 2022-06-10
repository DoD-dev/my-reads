import React, { Component } from "react";

class BookShelfChanger extends Component {
  render() {
    const { book, onAddOrRemoveBook } = this.props;
    const bookStatusOptions = [
      { value: "currentlyReading", text: "Currently Reading" },
      { value: "wantToRead", text: "Want to Read" },
      { value: "read", text: "Read" },
      { value: "none", text: "None" },
    ];
    const handlerBookshelfChange = (e) => {
      let updatedStatusBook = book;
      updatedStatusBook.shelf = e.target.value;
      onAddOrRemoveBook(updatedStatusBook);
    };
    return (
      <div className="book-shelf-changer">
        <select onChange={handlerBookshelfChange} value={book.shelf}>
          <option value="move" disabled>
            Move to...
          </option>
          {bookStatusOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {book.shelf === option.value ? `✔ ${option.text}` : option.text}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
