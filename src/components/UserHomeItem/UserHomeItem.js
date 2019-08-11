import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Utils/Utils';

export default class UserHomeItem extends React.Component {
    render () {
        const {book, bookDelete} = this.props;
        return (
            <>
                <div className='UserHomeItem_image' style={{backgroundImage: `url(${book.image})`}} />
                <div className='UserHomeItem_details'>
                    <div className='UserHomeItem_text'>
                    <Link to={`/books/${book.id}`} className='UserHomeItem'>
                        <h2 className='UserHomeItem_title'>{book.title}</h2>
                    </Link>
                        <p className='UserHomeItem_author'>{book.author}</p>
                        <p>Average User Rating: <span>{book.average_rating}</span> {' '}{' '}
                            #ofRatings: <span>{book.number_of_ratings}</span></p>
                    </div>
                </div>
                <Link to={`/edit/${book.id}`}>
                    <Button>
                        Edit
                    </Button>
                </Link>
                {' '}
                <Button onClick={() => bookDelete(book.id)}>
                    delete
                </Button>
        </>
        )
    }
}