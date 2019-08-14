import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ListProvider } from './context/ListContext';
import { BookProvider } from './context/BookContext';
import App from './App';

describe('App Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
            <BrowserRouter>
            <ListProvider>
                <BookProvider>
                    <App />
                </BookProvider>
            </ListProvider>
        </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
})