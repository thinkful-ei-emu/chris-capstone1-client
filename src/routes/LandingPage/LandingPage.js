import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Utils/Utils';
import './LandingPage.css'

export default class LandingPage extends React.Component {

    render() {
        return (
            <section className='LandingPage'>
                    <div className='hero-image'>
                        <div className='hero-text'>
                            <h1>Mobile Bookshelf</h1>
                            <p>Keep track of all of the books on your shelf across all platforms</p>
                            <p>Mobile Bookshelf's system allows you to list and organize the books you want to read, are reading and have completed</p>
                            <Link to='/register'>
                                <Button>
                                            Register Now!
                                </Button>
                            </Link>
                        </div>
                    </div>
            </section>
        )
    }
}