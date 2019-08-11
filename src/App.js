import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './routes/LandingPage/LandingPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import PrivateOnlyRoute from './components/Utils/PrivateRoute';
import UserHomePage from './routes/UserHomePage/UserHomePage';
import BookPage from './routes/BookPage/BookPage';
import EditBookForm from './components/EditBook/EditBook';
import AddBookForm from './components/AddBook/AddBook';
import TokenService from './services/token-service';
import HomePage from './routes/HomePage/HomePage';

class App extends React.Component {
  state = { hasError: false, loggedIn: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    TokenService.getAuthToken()
      ? this.loginSuccess()
      : this.logoutSuccess()
  }

  loginSuccess = () => this.setState({ loggedIn: true })
  logoutSuccess = () => this.setState({ loggedIn: false })
  
  render() {
    return (
      <div className='App'>
        <header className='AppHeader'>
          <Header loggedIn={this.state.loggedIn} logoutSuccess={() => this.logoutSuccess()} />
        </header>
        <main className='AppMain'>
          {this.state.hasError && <p className='red'> There was an error. Please try again later.</p>}
          <Switch>
            <PublicOnlyRoute
              exact path ={'/'}
              component={LandingPage}
              />
            <Route
              path='/login'
              render={(props) => TokenService.hasAuthToken()
                ? <Redirect to={'/yourshelf'} />
                : <LoginPage {...props} loginSuccess={() => this.loginSuccess()} />}
              />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateOnlyRoute
              path={'/sharedshelf'}
              component={HomePage}
            />
            <PrivateOnlyRoute
              path={'/yourshelf'}
              component={UserHomePage}
            />
            <PrivateOnlyRoute
              path={'/books/:bookId'}
              component={BookPage}
            />
            <PrivateOnlyRoute
            path='/edit/:id'
            component={EditBookForm}
            />
            <PrivateOnlyRoute
            path='/addbook'
            component={AddBookForm}
            />
            <Route
              component={NotFoundPage}
              />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;