import React from 'react';
import { Button, Input } from '../Utils/Utils';
import BookApiService from '../../services/book-api-service';

export default class ReadListItem extends React.Component {
    state = {
        error: null,
        rating: undefined,
        ratedAlready: false,
        ratingId: undefined
    }

    componentDidMount(){
        //if this has been rated by the person already, allow them to delete their rating
        BookApiService.getRating()
        .then(res => res.find(rating => rating.book_id === this.props.book.id))
        .then(res => {
            if(!!res)
                this.setState({ ratedAlready: !!res, ratingId: res.id })
        })
    }


    updateBookRating = rating => this.setState({ rating })

    renderDeleteRating(){
        const { removeRating } = this.props;
        const { ratingId } = this.state;
        return<>
            <Button onClick={async () => {
                await removeRating(ratingId)
                this.setState({ ratedAlready: false, ratingId: undefined })
                }}>
                Delete Rating
            </Button>
            </>
    }

    renderAddRating(){
        const {book, addRating } = this.props;
        return<>
        <Input type='number' value={this.state.rating} onChange={e => this.updateBookRating(e.target.value)} />
            <Button onClick={async () => {
                await addRating(this.state.rating, book.id)
                await BookApiService.getRating()
                    .then(res => res.find(rat => rat.book_id === this.props.book.id))
                    .then(res => {
                        if(!!res)
                            this.setState({ ratedAlready: !!res, ratingId: res.id })
        })
                this.setState({ ratedAlready: true })
            }}>
                Grade!
            </Button>
            </>
    }

    render () {
        const {book, addToYourShelf} = this.props;
        const newBook = {
            title: book.title,
            author: book.author,
            book_source: book.book_source,
            image: book.image,
            list: 'wishlist',
            genre: book.genre
        }

        return (
            <li>
            <div className='ReadListItem_image' style={{backgroundImage: `url(${book.image})`}} />

            <div className='ReadListItem_details'>
                <div className='ReadListItem_text'>
                    <h2 className='ReadListItem_title'>{book.title}</h2>
                    <p className='ReadListItem_author'>{book.author}</p>
                </div>
            </div>
            <Button onClick={() => addToYourShelf(newBook)}>
                Add to Your Shelf
            </Button>
            {' '}
            {this.state.ratedAlready 
              ? this.renderDeleteRating()
              : this.renderAddRating()}
        </li>
        )
    }
}