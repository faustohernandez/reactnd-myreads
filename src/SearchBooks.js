import React from 'react'
import { Link } from 'react-router-dom' 
import Book from './Book'

const SearchBooks = ({onShelfChange, onSearchBook, searchResults}) => {        

        return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                            to="/"
                            className="close-search"
                            >Close</Link>
                    
                    <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={onSearchBook}/>
                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults && searchResults.map(book => (
                                <li key={book.id}>
                                    <Book book={book} onShelfChange={onShelfChange}/>
                                </li>
                        ))}
                    </ol>
                    </div>
                </div>
                    )
}

export default SearchBooks