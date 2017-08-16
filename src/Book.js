import React, { Component } from 'react'

class Book extends Component {

  onBookShelfChange = (e) => {
      const shelf = e.target.options[e.target.selectedIndex].value;
      this.props.onShelfChange(this.props.book, shelf);
  }
  
  render () {
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128, height: 193,
                backgroundImage: `url(${this.props.book.imageLinks !== undefined? this.props.book.imageLinks.smallThumbnail:''})`
            }}>
            </div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf !== undefined? this.props.book.shelf: "none"} onChange={this.onBookShelfChange }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.author}</div>
        </div>
      </div>
    )
  }
}

export default Book