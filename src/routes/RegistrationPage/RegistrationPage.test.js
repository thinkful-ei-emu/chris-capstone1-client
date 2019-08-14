import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationPage from './RegistrationPage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('RegistrationPage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
              <RegistrationPage />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes RegistrationPage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
            <RegistrationPage />
        </BrowserRouter>))).toMatchSnapshot() 
    })
})