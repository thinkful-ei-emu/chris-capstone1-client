import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HomePage from './HomePage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ListProvider } from '../../context/ListContext';

describe('HomePage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <ListProvider>
              <HomePage />
            </ListProvider>
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes HomePage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
          <ListProvider>
            <HomePage />
          </ListProvider>
        </BrowserRouter>))).toMatchSnapshot() 
    })
})