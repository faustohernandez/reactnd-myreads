import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {        
    state = {
        searchResults: []
    }

    search = (e) => {
        const query = e.target.value
        BooksAPI.search(query, 20).then(searchResults => {
            searchResults = searchResults.map((book) => {
                const bookInShelf = this.props.books.find(b => b.id === book.id)
                if (bookInShelf) {
                    book.shelf = bookInShelf.shelf
                }
                return book
            })
            this.setState({searchResults})
        })
    }

    render() {

    return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search"
                        >Close</Link>
                
                <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.search}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                     {this.state.searchResults && this.state.searchResults.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChange={this.props.onShelfChange}/>
                            </li>
                    ))}
                </ol>
                </div>
            </div>
            )
  }
}

export default SearchBooks