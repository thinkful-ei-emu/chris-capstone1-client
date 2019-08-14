import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BookPage from './BookPage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../../context/BookContext';

describe('BookPage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <BookProvider>
              <BookPage />
            </BookProvider>
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes BookPage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
          <BookProvider>
            <BookPage />
          </BookProvider>
        </BrowserRouter>))).toMatchSnapshot() 
    })
})