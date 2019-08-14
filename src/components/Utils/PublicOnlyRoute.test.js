import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PublicOnlyRoute from './PublicOnlyRoute';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

describe('PublicOnlyRoute component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDom.render(
          <BrowserRouter>
            <PublicOnlyRoute
            exact path ={'/'}
            component={LandingPage} 
            />
          </BrowserRouter>,
          div
        )
        ReactDom.unmountComponentAtNode(div)
      })
    it('renderes PublicOnlyRoute by default', () => {
        expect(toJson(shallow(<PublicOnlyRoute
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