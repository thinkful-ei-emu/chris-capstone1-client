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
        let sharedShelf = <><Link to='/sharedshelf'>
        Shared Shelf
    </Link></>;
        let yourShelf = <><Link to='/yourshelf'>
        Your BookShelf
    </Link></>;
        return (
            <>
                <div className='center-nav'>
                    {this.props.location === '/yourshelf'
                        ? yourShelf
                        : sharedShelf}
                </div>
                <div className='Header__logged-in'>
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
                <div className='Header__not-logged-in'>
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
              <h2>
                <Link to='/'>
                  MBIIL
                </Link>
              </h2>
              {this.props.loggedIn
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </nav>
      
          </>
    }
}