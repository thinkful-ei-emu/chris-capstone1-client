import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './Header';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe.only('Header component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <Header loggedIn={true} logoutSuccess={() => {}} />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
      it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <Header loggedIn={false} logoutSuccess={() => {}} />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes Header by default', () => {
        expect(toJson(shallow(<Header loggedIn={true} logoutSuccess={() => {}} />))).toMatchSnapshot() 
    })
    it('check render based off loggedIn prop', () => {
      const headerComp = mount(<BrowserRouter><Header loggedIn={false} logoutSuccess={() => {}} /></BrowserRouter>)
      expect(headerComp.find('div').text()).toEqual('Log InRegister');
    })
    it('check render based off loggedIn prop', () => {
      const headerComp = mount(<BrowserRouter><Header loggedIn={true} logoutSuccess={() => {}} /></BrowserRouter>)
      expect(headerComp.find('.Header__logged-in').text()).toEqual('Logout');
    })
    it('check render based off loggedIn prop', () => {
      const headerComp = mount(<BrowserRouter><Header loggedIn={true} logoutSuccess={() => {}} /></BrowserRouter>)
      headerComp.find('.Header__logged-in').simulate('click');
      expect(headerComp.find('.Header__logged-in').text()).toEqual('Logout');
    })
})