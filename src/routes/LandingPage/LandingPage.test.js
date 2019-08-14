import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LandingPage from './LandingPage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
              <LandingPage />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes LandingPage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
            <LandingPage />
        </BrowserRouter>))).toMatchSnapshot() 
    })
})