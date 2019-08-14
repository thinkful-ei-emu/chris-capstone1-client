import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddBook from './AddBook';
import ReactDom from 'react-dom';

describe('AddBook component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
            <AddBook />,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes AddBook by default', () => {
        expect(toJson(shallow(<AddBook />))).toMatchSnapshot() 
    })
})