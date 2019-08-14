import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditBook from './EditBook';
import ReactDom from 'react-dom';

describe('EditBook component', () => {
  let match = {
    params: {
      id: 1
    }
  };
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
            <EditBook match={match} />,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes EditBook by default', () => {
        expect(toJson(shallow(<EditBook match={match} />))).toMatchSnapshot() 
    })
})