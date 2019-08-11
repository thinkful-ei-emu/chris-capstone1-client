import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ListProvider } from './context/ListContext';
import { BookProvider } from './context/BookContext';
import App from './App';
import './index.css';

ReactDOM.render(
<BrowserRouter>
    <ListProvider>
        <BookProvider>
            <App />
        </BookProvider>
    </ListProvider>
</BrowserRouter>, 
document.getElementById('root'));