import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserHomeItem from './UserHomeItem';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('UserHomeItem component', () => {
  let book = {
    "id": 1,
    "title": "Disappearing Earth",
    "author": "Julia Phillips",
    "list": "wishlist",
    "date_created": "2019-08-09T16:06:49.108Z",
    "book_source": "Print",
    "image": "https://media.vanityfair.com/photos/5d1662c85f741a0008ed05e1/master/w_800%2Cc_limit/best-books-of-2019-Disappearing-Earth.jpg",
    "book_report": "",
    "rating": 13,
    "genre": "Fairytale",
    "recommended": false,
    "user": {
        "id": 4,
        "user_name": "s.smith",
        "full_name": "Sam Smith",
        "email": "Sam@gmail.com",
        "date_created": "2019-08-09T16:06:49.108Z"
    },
    "poster": {
        "poster_report": null
    },
    "number_of_ratings": 5,
    "average_rating": 69.8
}
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <UserHomeItem key={book.id} book={book} />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes UserHomeItem by default', () => {
        expect(toJson(shallow(<UserHomeItem key={book.id} book={book} />))).toMatchSnapshot() 
    })
})