import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RegistrationForm from './RegistrationForm';
import ReactDom from 'react-dom';

describe('RegistrationForm component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
            <RegistrationForm />,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes RegistrationForm by default', () => {
        expect(toJson(shallow(<RegistrationForm />))).toMatchSnapshot() 
    })
})