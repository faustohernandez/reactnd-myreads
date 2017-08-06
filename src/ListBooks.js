import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render () {
    return (
      <div>
        <BookShelf title="Currently Reading" books={this.props.currentlyReading} onShelfChange={this.props.onShelfChange}/>
        <BookShelf title="Want To Read" books={this.props.wantToRead} onShelfChange={this.props.onShelfChange}/>
        <BookShelf title="Read" books={this.props.read} onShelfChange={this.props.onShelfChange}/>
      </div>
    )
  }
}

export default ListBooks