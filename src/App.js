import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './routes/LandingPage/LandingPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import PrivateOnlyRoute from './components/Utils/PrivateRoute';
import GeneralHomePage from './routes/HomePage/HomePage';

class App extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }
  render() {
    return (
      <div className='App'>
        <header className='AppHeader'>
          <Header />
        </header>
        <main className='AppMain'>
          {this.state.hasError && <p className='red'> There was an error. Please try again later.</p>}
          <Switch>
            <PublicOnlyRoute
              exact path ={'/'}
              component={LandingPage}
              />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
              />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateOnlyRoute
              path={'/home'}
              component={GeneralHomePage}
            />
            <Route
              component={NotFoundPage}
              />
          </Switch>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;