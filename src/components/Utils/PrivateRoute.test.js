import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PrivateRoute from './PrivateRoute';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('PrivateRoute component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <PrivateRoute
            exact path ={'/'}
            component={LandingPage} 
             />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes PrivateRoute by default', () => {
        expect(toJson(shallow(<PrivateRoute
          exact path ={'/'}
          component={LandingPage} 
           />))).toMatchSnapshot() 
    })
})

export default class LandingPage extends React.Component {

  render() {
      return (
          <section></section>
      )
  }
}