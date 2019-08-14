import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserHomePage from './UserHomePage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ListProvider } from '../../context/ListContext';

describe('UserHomePage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <ListProvider>
              <UserHomePage />
            </ListProvider>
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes UserHomePage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
          <ListProvider>
            <UserHomePage />
          </ListProvider>
        </BrowserRouter>))).toMatchSnapshot() 
    })
})