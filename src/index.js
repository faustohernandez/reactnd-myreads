import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'
import BooksApp from './App'

ReactDOM.render(<BrowserRouter><BooksApp /></BrowserRouter>, document.getElementById('root'))
