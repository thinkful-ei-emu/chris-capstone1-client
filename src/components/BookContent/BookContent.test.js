import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BookContent from './BookContent';
import ReactDom from 'react-dom';

describe('BookContent component', () => {
  let book = {
    id: 1,
    title: 'Disappearing Earth',
    author: 'Julia Phillips',
    list: 'wishlist',
    book_source: 'Print',
    genre: 'Fantasy',
    book_report: 'Nothing to see here',
    image: 'http://placehold.it/500x500',
    rating: 13, 
    recommended: false, 
    poster_rating: null, 
    poster_report: null, 
    poster_id: null,
    user_id: 1,
    date_created: '2029-01-22T16:28:32.615Z'
  }
    it('renders without crashing', () => {
        
        const div = document.createElement('div')
        ReactDom.render(
            <BookContent key={book.id} book={book} />,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes BookContent by default', () => {
        expect(toJson(shallow(<BookContent key={book.id} book={book} />))).toMatchSnapshot() 
    })
})