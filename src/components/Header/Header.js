import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';
import ListContext from '../../context/ListContext';

export default class Header extends Component {
    static contextType = ListContext;

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
                    {this.context.location === '/yourshelf'
                        ? sharedShelf
                        : yourShelf}
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
                <Link to='/'>
                    <img className='Header_image' src={require('../../MB_Logo.jpg')} alt='the mobile bookshelf logo' />
                </Link>
              {this.props.loggedIn
                ? this.renderLogoutLink()
                : this.renderLoginLink()}
            </nav>
      
          </>
    }
}