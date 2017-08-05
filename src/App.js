import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksRead: [],
    booksReading: [],
    booksWant: [],
    books:[]
  }

  handleShelfChange = (book, shelf) => {
    if (this.isNewBook(book)) {
      this.addBook(book, shelf);
    } else {
      this.updateBook(book, shelf);
    }

    BooksAPI.update(book, shelf);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
        <ListBooks/>
        )}/>
        <Route path="/search" render={({ history })=> (
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
