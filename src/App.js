import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books:[],
    searchResults: []
  }

  onShelfChange = (book, shelf) => {
      if (book.shelf !== shelf) {   // check if the book returned is on the shelf
        BooksAPI.update(book, shelf).then(() => {
            // Set book's shelf to the selected shelf from the drop down menu
            book.shelf = shelf
          //  Filter out updated book, the concat to current state (array) to trigger a DOM rerender 
          const otherBooks = this.state.books.filter((b) => b.id !== book.id)
          //put the book with the new shelf back in
          this.setState({books: otherBooks.concat(book)})

          //update search results too          
       }).then( () => { //look for this book to see if it exist in the search page
         if(this.state.searchResults.find(bo => bo.id === book.id)) {
           //update the state of the search result if the bookshelf state is updated
            this.setState( {searchResults: this.state.searchResults.map(b => {
                  if (b.id === book.id){
                    b.shelf = shelf;
                    return b
                  } else {
                    return b
                  }
                })})}
       }
       )
    }
}

  componentDidMount() {
    BooksAPI.getAll().then((books) => { //get initial state
      this.setState({ books: books, searchResults: []})
    })
  }

  search = (e) => {    
      const query = e.target.value
      if (!query) {
          this.setState({searchResults: []});
          return;
      }
          BooksAPI.search(query, 20).then(searchResults => {
          if (searchResults.error) {
              searchResults = [];
          }
          searchResults = searchResults.map(book => { //go through the search results to find books already in the bookshelf
              const bookInShelf = this.state.books.find(b => b.id === book.id);
                if (bookInShelf) { //insert the shelf state to the search result books that are already in the bookshelf
                    book.shelf = bookInShelf.shelf;
                }
              return book
          })
          this.setState({searchResults})
      }
    )
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

          <Route exact path="/search" render={()=> (
           <SearchBooks 
              onShelfChange={this.onShelfChange}
              onSearchBook={this.search}
              searchResults={this.state.searchResults}
           />
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
