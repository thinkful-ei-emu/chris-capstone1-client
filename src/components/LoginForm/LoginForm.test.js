import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoginForm from './LoginForm';
import ReactDom from 'react-dom';

describe('LoginForm component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
            <LoginForm />,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes LoginForm by default', () => {
        expect(toJson(shallow(<LoginForm />))).toMatchSnapshot() 
    })
})