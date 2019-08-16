import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddBook from './AddBook';
import ReactDom from 'react-dom';

describe('AddBook component', () => {
  // jest.mock('./AddBook');
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
    it('updates state for text inputs', () => {
      const component = mount(<AddBook />);
      const input = component.find('input').at(0);
      input.instance().value = 'hello';
      input.simulate('change');
      expect(component.state().title).toEqual('hello');
  })
})