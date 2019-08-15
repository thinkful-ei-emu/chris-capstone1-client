import React from 'react';
import ListContext from '../../context/ListContext';
import BookApiService from '../../services/book-api-service';
import { Section } from '../../components/Utils/Utils';
import HomePageItem from '../../components/HomePageItem/HomePageItem';
import TokenService from '../../services/token-service';
import './HomePage.css';

export default class HomePage extends React.Component {
    state = {
        checked: false,
        writForm: '',
        genre: '',
    }
    static contextType = ListContext;

    componentDidMount() {
        this.context.clearError();
        BookApiService.getBooks()
            .then(res => res.filter(book => 
                book.user.user_name !== TokenService.getUserName()))
            .then(res => this.context.setBookList(res, this.props.match.path))
            .catch(this.context.setError)
    }

    addRating = (newRating, book_id) => {
        BookApiService.postRating(newRating, book_id)
    }
    removeRating = id => {
        BookApiService.deleteRating(id)
    }

    addToYourShelf = book => {
        this.setState({ error: null })
        BookApiService.postBook(book)
    }
    
    renderBooks() {
        const { bookList = [] } = this.context;
        let curentBook = bookList.filter(book => book.list === 'reading')
        let readBook = bookList.filter(book => book.list === 'read')
        let currentList = curentBook.map(book => 
            <HomePageItem key={book.id} book={book} 
            addRating={(newRating, book_id) => this.addRating(newRating, book_id)} 
            removeRating={id => this.removeRating(id)}
            addToYourShelf={book => this.addToYourShelf(book)} />)
        let readList = readBook.map(book => 
            <HomePageItem key={book.id} book={book} 
            addRating={(newRating, book_id) => this.addRating(newRating, book_id)}
            removeRating={id => this.removeRating(id)}
            addToYourShelf={book => this.addToYourShelf(book)} />)

        return (
        <>
            <div className='List'>
                <h2>What Others are Reading</h2>
                {currentList}
            </div>
            <div className='List'>
                <h2>Books Others have Enjoyed</h2>
                {readList}
            </div>
        </>
        )
    }

    render() {
        const { error } = this.context;
        return (
            <Section list className='HomePage'>
                {error
                  ? <p className='red'>There was an error, try again.</p>
                  : this.renderBooks()}
            </Section>
        )
    }
}