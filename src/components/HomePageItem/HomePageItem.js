import React from 'react';
import { Button, Input } from '../Utils/Utils';
import BookApiService from '../../services/book-api-service';
import './HomePageItem.css';

export default class HomePageItem extends React.Component {
    state = {
        error: null,
        rating: undefined,
        ratedAlready: false,
        ratingId: undefined,
        added: false
    }

    componentDidMount(){
        //if this has been rated by the person already, allow them to delete their rating
        const {book} = this.props;
        BookApiService.getRating()
            .then(res => res.find(rating => rating.book_id === book.id))
            .then(res => {
                if(!!res)
                    this.setState({ ratedAlready: !!res, ratingId: res.id })
            })
            .catch(e => console.error(e))
        BookApiService.getUserBooks()
            .then(res => {
                if(res.find(resbook =>resbook.title === book.title && resbook.author === book.author))
                    this.setState({ added: true })
            })
            .catch(e => console.error(e))
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
                Re-Grade
            </Button>
            </>
    }

    renderAddRating(){
        const {book, addRating } = this.props;
        return<div>
            <p>Read it? What's your grade? (1-100)</p>
        <Input className='addRating' type='number' value={this.state.rating} onChange={e => this.updateBookRating(e.target.value)} />
        <span><strong>% </strong></span>
            <Button onClick={async () => {
                await addRating(this.state.rating, book.id)
                await BookApiService.getRating()
                    .then(res => res.find(rat => rat.book_id === this.props.book.id))
                    .then(res => {
                        if(!!res)
                            this.setState({ ratedAlready: !!res, ratingId: res.id })
                    })
                    .catch(error => console.error(error))
                this.setState({ ratedAlready: true })
            }}>
                Grade!
            </Button>
            </div>
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
            <div className='HomePageItem'>
                {book.image && <img className='HomePageItem_image' src={book.image} alt='the cover of the book' />}
                <div className='HomePageItem_details'>
                    <div className='HomePageItem_text'>
                        <h2 className='HomePageItem_title'>{book.title}</h2>
                        <p className='HomePageItem_author'>{book.author}</p>
                        <p>Being read by: <strong>{book.user.user_name}</strong></p>
                        {book.rating && <p>{book.user.user_name}'s rating: <span>{book.rating}%</span></p>}
                        <p>Average User Rating: <span>{book.average_rating}%</span> {' '}{' '}
                            #ofRatings: <span>{book.number_of_ratings}</span></p>
                    </div>
                </div>
                <div>
                    {!this.state.added && 
                        <Button onClick={() => {
                            addToYourShelf(newBook)
                            this.setState({ added: true })
                            }}>
                            Add to Wishlist
                        </Button>}
                    {' '}
                    {this.state.ratedAlready 
                    ? this.renderDeleteRating()
                    : this.renderAddRating()}
                </div>
            </div>
        )
    }
}