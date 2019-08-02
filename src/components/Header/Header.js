import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends React.Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
    }

    renderLogoutLink() {
        return (
            <nav className='Nav'>
                <div className='left-nav'>
                    <Link to='/home'>
                        Home
                    </Link>
                    <Link to='/userhome'>
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
            </nav>
        )
    }

    renderLoginLink() {
        return (
            <nav className='Nav'>
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
            </nav>
        )
    }

    render() {
        return (
        <>
            {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </>
        )
    }
}