import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './Header';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('Header component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <Header loggedIn={true} logoutSuccess={() => {}} />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes Header by default', () => {
        expect(toJson(shallow(<Header loggedIn={true} logoutSuccess={() => {}} />))).toMatchSnapshot() 
    })
})