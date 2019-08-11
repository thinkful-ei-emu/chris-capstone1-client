import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        this.props.logoutSuccess();
    }

    renderLogoutLink() {
        return (
            <>
                <div className='left-nav'>
                    <Link to='/sharedshelf'>
                        Shared Shelf
                    </Link>
                    <Link to='/yourshelf'>
                        Your BookShelf
                    </Link>
                </div>
                <div className='navLoggedIn'>
                    <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                        Logout
                    </Link>
                </div>
            </>
        )
    }

    renderLoginLink() {
        return (
            <>
                <div className='left-nav'>
                    <Link to='/'>
                        Home
                    </Link>
                </div>
                <div className='navNotLoggedIn'>
                    <Link
                        to='/login'>
                            Log In
                    </Link>
                    <Link
                        to='/register'>
                            Register
                    </Link>
                </div>
            </>
        )
    }

    render() {
        return <>
            <nav className='Header'>
              <h1>
                <Link to='/sharedshelf'>
                  Mobile-Bookshelf
                </Link>
              </h1>
              {this.props.loggedIn
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </nav>
      
          </>
    }
}