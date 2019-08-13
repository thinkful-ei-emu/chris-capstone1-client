import React from 'react';
import ListContext from '../../context/ListContext';
import BookApiService from '../../services/book-api-service';
import { Section } from '../../components/Utils/Utils';
import UserHomeItem from '../../components/UserHomeItem/UserHomeItem';
import { Link } from 'react-router-dom';
import './UserHomePage.css';

export default class UserHomePage extends React.Component {
    static contextType = ListContext;

    componentDidMount() {
        this.context.clearError();
        BookApiService.getUserBooks()
            .then(res => this.context.setBookList(res, this.props.match.path))
            .catch(this.context.setError)
    }

    bookDelete = id => {
        console.log(id)
        BookApiService.deleteBook(id)
        .then(data => {
            this.context.removeBook(data)
            window.open('/yourshelf','_self');
        })
        .catch(error => {
            this.setState({ error })
        })
    }
    
    renderBooks() {
        const { bookList = [] } = this.context;
        let wishBook = bookList.filter(book => book.list === 'wishlist')
        let curentBook = bookList.filter(book => book.list === 'reading')
        let readBook = bookList.filter(book => book.list === 'read')
        let wishList = wishBook.map(book => <UserHomeItem key={book.id} book={book} bookDelete={id => this.bookDelete(id)}/>)
        let currentList = curentBook.map(book => <UserHomeItem key={book.id} book={book} bookDelete={id => this.bookDelete(id)}/>)
        let readList = readBook.map(book => <UserHomeItem key={book.id} book={book} bookDelete={id => this.bookDelete(id)}/>)

        return (
        <>
            <Link to='/addbook' className='AddBook'>
                Add a Book
            </Link>
            <div className='UserHomeList'>
            <div className='wishList List'>
                <h2>Wish List</h2>
                {wishList}
            </div>
            <div className='currentList List'>
                <h2>Current Reads</h2>
                {currentList}
            </div>
            <div className='readList List'>
                <h2>Finished Reads</h2>
                {readList}
            </div>
            </div>
        </>
        )
    }

    render() {
        const { error } = this.context;
        return (
            <Section list className='UserHomePage'>
                {error
                  ? <p className='red'>There was an eror, try again.</p>
                  : this.renderBooks()}
            </Section>
        )
    }
}