import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFoundPage from './NotFoundPage';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('NotFoundPage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
              <NotFoundPage />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes NotFoundPage by default', () => {
        expect(toJson(shallow(<BrowserRouter>
            <NotFoundPage />
        </BrowserRouter>))).toMatchSnapshot() 
    })
})