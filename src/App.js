import React, { Component } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import MainPage from "./Pages/MainPage";
import * as BookAPI from "./utils/BookAPI";

class App extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BookAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  onAddOrRemoveBook = (book) => {
    if (this.state.books.length > 0) {
      let bookNeedUpdate = this.state.books.find((b) => b.id === book.id);
      if (bookNeedUpdate) {
        if (bookNeedUpdate.shelf === "none") {
          if (BookAPI.update(bookNeedUpdate, "none")) {
            this.setState((currentState) => ({
              books: [...currentState.books.filter((b) => b.id !== book.id)],
            }));
          }
        } else {
          bookNeedUpdate.shelf = book.shelf;
          if (BookAPI.update(bookNeedUpdate, book.shelf)) {
            this.setState((currentState) => ({
              books: [
                ...currentState.books.filter((b) => b.id !== book.id),
                book,
              ],
            }));
          }
        }
      } else {
        if (
          book.shelf === "currentlyReading" ||
          book.shelf === "wantToRead" ||
          book.shelf === "read"
        ) {
          if (BookAPI.update(book, book.shelf)) {
            this.setState((currentState) => ({
              books: [...currentState.books, book],
            }));
          }
        } else {
          if (BookAPI.update(book, "none")) {
            this.setState((currentState) => ({
              books: currentState.books.filter((b) => {
                return b.id !== book.id;
              }),
            }));
          }
        }
      }
    } else {
      if (
        book.shelf === "currentlyReading" ||
        book.shelf === "wantToRead" ||
        book.shelf === "read"
      ) {
        this.setState(() => ({
          books: [book],
        }));
      }
    }
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/search"
              element={
                <SearchPage
                  books={this.state.books}
                  onAddOrRemoveBook={this.onAddOrRemoveBook}
                />
              }
            />
            <Route
              path="/"
              element={
                <MainPage
                  books={this.state.books}
                  onAddOrRemoveBook={this.onAddOrRemoveBook}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
