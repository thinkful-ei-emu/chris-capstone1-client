import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginPage from './LoginPage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
              <LoginPage />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes LoginPage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>))).toMatchSnapshot() 
    })
})