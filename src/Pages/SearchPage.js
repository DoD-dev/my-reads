import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../Components/Book";
import * as BookAPI from "../utils/BookAPI";

class SearchPage extends Component {
  state = {
    searchResult: [],
  };

  render() {
    const handlerSearchInput = async (event) => {
      let searchInputValue = event.target.value.trim();
      if (searchInputValue !== "") {
        let searchResultContent = await BookAPI.search(searchInputValue);
        if (!searchResultContent.error) {
          if (searchResultContent.length > 0) {
            searchResultContent = searchResultContent.map((book) => ({
              ...book,
              shelf: "none",
            }));
            this.props.books?.forEach((book) => {
              let bookInShelf = searchResultContent.find(
                (r) => r.id === book.id
              );
              if (bookInShelf) {
                bookInShelf.shelf = book.shelf;
              }
            });
            this.setState(() => ({ searchResult: searchResultContent }));
          }
        } else {
          this.setState([]);
        }
      } else {
        this.setState([]);
      }
    };

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              type="text"
              id="search-input"
              onChange={handlerSearchInput}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult ? (
              this.state.searchResult.map((book) => {
                return (
                  <li key={book.id}>
                    <Book
                      key={book.id}
                      book={book}
                      onAddOrRemoveBook={this.props.onAddOrRemoveBook}
                    ></Book>
                  </li>
                );
              })
            ) : (
              <div>No result</div>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;
