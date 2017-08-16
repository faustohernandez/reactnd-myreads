import React from 'react'
import BookShelf from './BookShelf'

const ListBooks =({currentlyReading, wantToRead, read, onShelfChange}) => {
    
    return (
      <div>
        <BookShelf title="Currently Reading" books={currentlyReading} onShelfChange={onShelfChange}/>
        <BookShelf title="Want To Read" books={wantToRead} onShelfChange={onShelfChange}/>
        <BookShelf title="Read" books={read} onShelfChange={onShelfChange}/>
      </div>
    )  
}

export default ListBooks