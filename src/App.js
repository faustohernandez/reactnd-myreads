import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  onShelfChange = (book,shelf) => {
    BooksAPI.update(book,shelf)
      .then(
        this.setState((state) => (
          {books: state.books.map(b => {
            if (b.title === book.title){
              b.shelf = shelf;
              return b
            } else {
              return b
            }
          })
         }))
      )
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const state = this.state.books
    const wantToRead = state.filter((book) => book.shelf === 'wantToRead')
    const read = state.filter((book) => book.shelf === 'read')
    const currentlyReading = state.filter((book) => book.shelf === 'currentlyReading')

    return (
      <div className="app">
        <Route exact path="/" render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <ListBooks
                        currentlyReading={currentlyReading}
                        wantToRead={wantToRead}
                        read={read}
                        onShelfChange={this.onShelfChange}
                        />
                    </div>
                    <div className="open-search">
                            <Link to="/search">
                            </Link>
                    </div>
                </div>
        )}/>

        <Route exact path="/search" render={({ history })=> (
           <SearchBooks books={currentlyReading.concat(wantToRead,read)}           
          onShelfChange={(book,shelf) => {
              this.onShelfChange(book,shelf)
              }}
           />
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
