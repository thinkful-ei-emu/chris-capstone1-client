import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Utils/Utils';
import './UserHomeItem.css';

export default class UserHomeItem extends React.Component {
    render () {
        const {book, bookDelete, list} = this.props;
        return (
            <div className='UserHomeItem'>
                <Link to={`/books/${book.id}`} className='UserHomeItem_info'>
                {list !== undefined && book.image && <img className='UserHomeItem_image' src={book.image} alt='the cover of the book' />}
                <div className='UserHomeItem_details'>
                    <div className='UserHomeItem_text'>
                        <h3 className='UserHomeItem_title'>{book.title}</h3>
                        <p className='UserHomeItem_author'>by: {book.author}</p>
                        {list !== undefined && <p>Average User Rating: <span>{book.average_rating}%</span> {' '}{' '}
                            #ofRatings: <span>{book.number_of_ratings}</span></p>}
                    </div>
                </div>
                </Link>
                <div className='buttons'>
                <Link to={`/edit/${book.id}`}>
                    <Button>
                        Edit
                    </Button>
                </Link>
                {' '}
                <Button onClick={() => bookDelete(book.id)}>
                    delete
                </Button>
                </div>
        </div>
        )
    }
}